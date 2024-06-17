from abc import ABC, abstractmethod
from dataclasses import dataclass
from re import compile, findall

from bs4 import BeautifulSoup, ResultSet
from googletrans import Translator

import utils
from settings import DEBUG


@dataclass
class View(ABC):
    spider: BeautifulSoup

    @property
    @abstractmethod
    def title(self) -> str:
        ...

    @property
    @abstractmethod
    def price(self) -> float:
        ...

    @property
    @abstractmethod
    def colors(self) -> iter:
        ...

    @property
    @abstractmethod
    def _count(self) -> iter:
        ...

    @property
    def dict(self):
        if not self.spider:
            return {}

        return dict(
            id=findall(string=self.spider.url, pattern=r'\/([^\/]+)$')[0],
            title=self.title,
            price=(price := self.price),
            item_price=round(price / self._count, 1),
            colors=[*self.colors],

        )


class IView(View):
    currency: str = 'USD'

    @property
    def title(self):
        return self.spider.find(id='product-title').text

    @property
    def price(self):
        value: float = float(self.spider.find(class_='product-price').text.replace(',', '.'))
        converter: utils.Converter = utils.Converter(value=value, currency=self.currency)

        return converter.rubles

    @property
    def colors(self):
        colors: ResultSet = self.spider.find_all(
            class_='sub-image-item',
            attrs=dict(href="javascript:void(0);"),

        )

        yield from (
            dict(
                image=color.select_one('figure > span > img').get('src'),
                color=color.get('data-type').replace('-', '').replace(' ', '').upper(),
                # stock=int(color.get('data-stock')),

            )
            for color in colors
        )

    @property
    def _count(self) -> int:
        return int(self.spider.find(class_='form-control no-arrows text-center').get('value'))


class ZView(View):
    translator: Translator = Translator()
    currency: str = 'TRY'
    pattern: str = r'value: (\d*\.\d*),'

    @classmethod
    def extract_value(cls, text: str) -> float:
        return round(float(findall(pattern=cls.pattern, string=text)[0]), 1)

    @property
    def title(self) -> str:
        return (
            self.spider.find(
                name='div',
                class_=compile(pattern='^col-12 col-lg-9 name fw8 fs24 lh24 mt7 colored op8 col-sm-fs16.*')
            ).get_text().strip()[27:]
        )

    @property
    def price(self) -> float:
        price: float = self.extract_value(
            text=str(
                self.spider.find_all(
                    name='script',
                )[13]
            )
        )
        converter = utils.Converter(
            value=price,
            currency=self.currency
        )

        return converter.rubles

    @property
    def _count(self) -> int:
        return int(
            self.spider.find(
                class_='col-6 col-lg'
            ).find(
                class_='colored op8 fw7 fs16 lh16 col-sm-fs14 col-sm-lh14'
            ).get_text(strip=True)
        )

    @property
    def colors(self) -> iter:
        container = self.spider.find(class_='carousel-elem pos-a ll0 lt0 w100 h100')
        colors = container.find_all(class_='img-fluid')

        for color in colors:
            if DEBUG:
                print(color)

            text = color.get('alt')

            if not bool(text):
                continue

            # try:
            #     translated_color: str = self.translator.translate(
            #         text=text,
            #         dest='ru',
            #         src='tr',
            #     ).text
            # except TypeError:
            #     continue

            yield dict(
                image=color.get('src'),
                color=text.upper(),
            )
