from __future__ import annotations

from abc import ABC, abstractmethod
from asyncio import gather
from typing import Generator
from urllib.parse import parse_qs, urlparse

from aiohttp import ClientConnectorError
from bs4 import BeautifulSoup, ResultSet, Tag

import views
import settings
from utils import get_spider


class Service(ABC):
    """
    TODO: Singletone
    """

    view = None
    domain = None

    def __init__(self, category: dict) -> None:
        self.category: dict = category

    @staticmethod
    @abstractmethod
    def get_page_links(spider: BeautifulSoup) -> Generator[str] | None:
        ...

    @property
    @abstractmethod
    async def links(self) -> iter:
        yield 'http://example.com/'

    async def get_dict(self, url: str) -> dict:
        try:
            spider = await get_spider(url=url)
        except ClientConnectorError:
            return await self.get_dict(url=url)

        return self.view(spider=spider).dict

    async def all(self) -> iter:
        links: iter = self.links

        tasks: list = []

        async for link in links:
            task = self.get_dict(url=link)
            tasks.append(task)

        for information in await gather(*tasks):
            if not information:
                continue

            yield information


class IService(Service):
    view = views.IView
    domain = settings.I_DOMAIN

    @property
    async def _page_count(self) -> int:
        if settings.DEBUG is True:
            return 2

        spider = await get_spider(url='http://' + self.category[self.domain])

        last_url = spider.find(attrs=dict(title='Последние')).get('href')
        parsed_url = parse_qs(urlparse(url=last_url).query)

        pgs = parsed_url.get('pg')

        if not pgs:
            raise KeyError(
                'Нет параметра pg в ссылке' + last_url
            )

        return int(pgs[0])

    @staticmethod
    def get_page_links(spider: BeautifulSoup) -> Generator[str] | None:
        items: ResultSet = spider.find_all(class_='w-100 product-title')

        for item in items:
            link: str | None = item.get('href')

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
            url: str = 'http://' + self.category[self.domain] + f'?p={page_number}'

            task = get_spider(url=url)
            tasks.append(task)

        for spider in await gather(*tasks):
            for page_link in self.get_page_links(spider=spider):
                yield 'http://' + self.domain + page_link.lstrip('/')


class ZService(Service):
    view = views.ZView
    domain = settings.Z_DOMAIN

    @staticmethod
    def get_page_links(spider: BeautifulSoup) -> Generator[str] | None:
        items: ResultSet = spider.find_all(
            name='div',
            class_='owl-carousel owl-theme owlControl b-white b-ra20'
        )

        if not items:
            return None

        for item in items:
            link_element: Tag = item.find('a')

            if link_element:
                yield link_element.get('href')
            else:
                break

    @property
    async def links(self) -> iter:
        counter = 1

        while True:
            if settings.DEBUG and counter == 2:  # Collect information from only two pages in testing mode
                break

            url = 'http://' + self.category.get(self.domain) + '?sayfa=' + str(counter)

            spider: BeautifulSoup = await get_spider(url=url)

            links = [*self.get_page_links(spider=spider)]

            if not links:
                if settings.DEBUG is True:
                    print('Конечная страница', counter)
                break
            else:
                for link in links:
                    yield link

            counter += 1
