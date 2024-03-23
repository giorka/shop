from abc import ABC
from asyncio import gather
from typing import Iterable, List, Optional
from urllib.parse import parse_qs, urlparse

from bs4 import BeautifulSoup, ResultSet

from base import BaseService
from domains import INTERKIDSY_DOMAIN
from settings import DEBUG
from utils import get_spider
from .view import View


class Service(BaseService, ABC):
    view: View = View
    _domain: str = INTERKIDSY_DOMAIN

    @property
    async def _page_count(self) -> int:
        if DEBUG is True:
            return 2

        url: str = 'http://' + self.category[self._domain]
        spider: BeautifulSoup = await get_spider(url=url)
        last_url: str = spider.find(attrs=dict(title='Последние')).get('href')
        parsed_url: dict = parse_qs(urlparse(url=last_url).query)
        pgs: List[int] = parsed_url.get('pg')

        if not pgs:
            raise KeyError(
                'Нет параметра pg в ссылке' + last_url
            )

        return int(pgs[0])

    @staticmethod
    def get_page_links(spider: BeautifulSoup) -> Optional[Iterable[str]]:
        items: ResultSet = spider.find_all(class_='w-100 product-title')

        for item in items:
            link: Optional[str] = item.get('href')

            if not link:
                raise KeyError(
                    'Нет атрибута href в ссылке ' + link
                )

            yield link

    @property
    async def links(self) -> iter:
        max_page: int = await self._page_count

        tasks = []

        for page_number in range(1, max_page + 1):
            url: str = 'http://' + self.category[self._domain] + f'?p={page_number}'

            task = get_spider(url=url)
            tasks.append(task)

        for spider in await gather(*tasks):
            for page_link in self.get_page_links(spider=spider):
                yield 'http://' + self._domain + page_link.lstrip('/')
