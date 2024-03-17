from abc import ABC
from dataclasses import dataclass

from bs4 import BeautifulSoup, ResultSet, Tag

from constants import exchange_rates


@dataclass
class View(ABC):
    spider: BeautifulSoup


class InterkidsyView(View):
    @property
    def title(self):
        return self.spider.find(id='product-title').text

    @property
    def price(self):
        dollars = float(self.spider.find(class_='product-price').text.replace(',', '.'))
        exchange = float(exchange_rates['USD'].value)

        return round(exchange * dollars, 1)
    
    @property
    def colors(self):
        colors: ResultSet = self.spider.find_all(
            class_='sub-image-item',
            attrs=dict(href="javascript:void(0);"),

        )
        # print(self.spider.url)

        yield from (
            dict(
                image=color.select_one('figure > span > img').get('src'),
                color=color.get('data-type').strip(),
                stock=int(color.get('data-stock')),

            )
            for color in colors
        )

    @property
    def dict(self):
        return [*self.colors]
        # return dict(
        #     title=self.title,
        #     price=self.price,
        #     colors=[*self.colors],
        # )
