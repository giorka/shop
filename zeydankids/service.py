from abc import ABC
from typing import Iterable, Optional

from bs4 import BeautifulSoup, ResultSet

from base import BaseService
from domains import ZEYDANKIDS_DOMAIN
from settings import DEBUG
from utils import get_spider
from .view import View


class Service(BaseService, ABC):
    view: View = View
    _domain: str = ZEYDANKIDS_DOMAIN

    @staticmethod
    def get_page_links(spider: BeautifulSoup) -> Optional[Iterable[str]]:
        items: ResultSet = spider.find_all(
            name='div',
            class_='owl-carousel owl-theme owlControl b-white b-ra20'
        )

        if not items:
            return None

        yield from (item.find('a').get('href') for item in items)

    @property
    async def links(self) -> iter:
        counter: int = 1

        while True:
            # Collect information from only two pages, if in testing mode
            if DEBUG and counter == 2:
                break

            url: str = 'http://' + self.category.get(self._domain) + '?sayfa=' + str(counter)

            spider: BeautifulSoup = await get_spider(url=url)

            links = [*self.get_page_links(spider=spider)]

            if not links:
                if DEBUG is True:
                    print('Конечная страница', counter)

                break
            else:
                for link in links:
                    yield link

            counter += 1
