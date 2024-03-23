from bs4 import ResultSet

import utils
from base import BaseView
from settings import DEBUG


class View(BaseView):
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

        if DEBUG is True:
            print(self.spider.url)

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
