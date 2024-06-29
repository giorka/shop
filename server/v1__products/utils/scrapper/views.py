from abc import ABC, abstractmethod
from dataclasses import dataclass
from re import compile, findall

from bs4 import BeautifulSoup, ResultSet, Tag
from googletrans import Translator


@dataclass
class View(ABC):
    spider: BeautifulSoup

    @property
    @abstractmethod
    def title(self) -> str: ...

    @property
    @abstractmethod
    def price(self) -> tuple[str, float]: ...

    @property
    @abstractmethod
    def colors(self) -> iter: ...

    @property
    @abstractmethod
    def package_count(self) -> iter: ...

    @property
    @abstractmethod
    def sizes(self) -> str: ...

    @property
    def dict(self):
        try:
            self.title
        except AttributeError:
            return {}

        currency, price = self.price

        return dict(
            url=self.spider.url,
            identifier=findall(string=self.spider.url, pattern=r'\/([^\/]+)$')[0],
            title=self.title,
            full_price=price,
            item_price=round(price / self.package_count, 2),
            currency=currency,
            package_count=self.package_count,
            sizes=self.sizes,
            colors=[*self.colors],
        )


class IView(View):
    currency = 'USD'

    @property
    def title(self):
        return self.spider.find(id='product-title').text

    @property
    def price(self) -> tuple[str, float]:
        return self.currency, float(self.spider.find(class_='product-price').text.replace(',', '.'))

    @property
    def package_count(self) -> int:
        return int(self.spider.find(class_='form-control no-arrows text-center').get('value'))

    @property
    def colors(self) -> iter:
        colors: ResultSet = self.spider.find_all(
            class_='sub-image-item',
            attrs=dict(href='javascript:void(0);'),
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
    def _tables_data(self) -> dict[str, str]:
        tables = self.spider.find_all('table')
        tables_data = {}

        for table in tables:
            body: Tag = table.find('tbody')

            for row in body.find_all('tr'):
                columns = row.find_all('td')

                title, value = map(lambda column: column.get_text(strip=True), columns)

                tables_data[title.lower()] = value

        return tables_data

    @property
    def sizes(self) -> str:
        tables_data = self._tables_data
        print(tables_data)

        return tables_data.get('size range') or tables_data.get('Размер/Возрастной промежуток')


class ZView(View):
    translator: Translator = Translator()
    currency = 'TRY'
    pattern = r'value: (\d*\.\d*),'

    @classmethod
    def extract_value(cls, text: str) -> float:
        return round(float(findall(pattern=cls.pattern, string=text)[0]), 1)

    @property
    def title(self) -> str:
        return (
            self.spider.find(
                name='div',
                class_=compile(pattern='^col-12 col-lg-9 name fw8 fs24 lh24 mt7 colored op8 col-sm-fs16.*'),
            )
            .get_text()
            .strip()[27:]
        )

    @property
    def price(self) -> tuple[str, float]:
        return self.currency, self.extract_value(
            text=str(
                self.spider.find_all(
                    name='script',
                )[13],
            ),
        )

    @property
    def package_count(self) -> int:
        return int(
            self.spider.find(class_='col-6 col-lg')
            .find(class_='colored op8 fw7 fs16 lh16 col-sm-fs14 col-sm-lh14')
            .get_text(strip=True),
        )

    @property
    def colors(self) -> iter:
        container = self.spider.find(class_='carousel-elem pos-a ll0 lt0 w100 h100')
        colors = container.find_all(class_='img-fluid')

        for color in colors:
            text = color.get('alt')

            if not bool(text):
                continue

            yield dict(
                image=color.get('src'),
                color=text.upper(),
            )

    @property
    def sizes(self) -> str:
        return self.spider.find(class_='colored op8 fw7 fs16 lh16 col-sm-fs14 col-sm-lh14').get_text(strip=True)
