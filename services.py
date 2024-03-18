from abc import ABC, abstractmethod
from asyncio import gather
from typing import Iterable, List, NoReturn, Optional
from urllib.parse import parse_qs, urlparse

from aiohttp import ClientSession
from bs4 import BeautifulSoup

import views
from domains import *


class Service(ABC):
    _domain: str = None

    def __init__(self, category: dict) -> NoReturn:
        self.category: dict = category

    @abstractmethod
    def get_links(self) -> tuple:
        ...

    @staticmethod
    async def get_spider(url: str) -> BeautifulSoup:
        async with ClientSession() as session:
            async with session.get(url=url) as request:
                markup: str = await request.text()

        spider = BeautifulSoup(
            markup=markup,
            features='lxml'
        )
        # spider.url = url

        return spider


class InterkidsyService(Service):
    _domain: str = INTERKIDSY_DOMAIN

    async def get_page_count(self, category: dict) -> int:
        url: str = 'http://' + category[self._domain]
        spider: BeautifulSoup = await self.get_spider(url=url)
        last_url: str = spider.find(attrs=dict(title='Последние')).get('href')
        parsed_url: dict = parse_qs(urlparse(url=last_url).query)
        pgs: List[int] = parsed_url.get('pg')

        if not pgs:
            raise KeyError(
                'Нет параметра pg в ссылке' + last_url
            )

        page_number: int = int(pgs[0])

        return page_number

    @staticmethod
    def get_page_links(spider: BeautifulSoup) -> Iterable[str]:
        cards = spider.find_all(class_='w-100 product-title')

        for card in cards:
            link: Optional[str] = card.get('href')

            if not link:
                raise KeyError(
                    'Нет атрибута href в ссылке ' + link
                )

            yield link

    async def get_dict(self, url: str):
        view: views.InterkidsyView = views.InterkidsyView(
            spider=await self.get_spider(url=url)
        )

        return view.dict

    async def get_all_links(self) -> iter:
        # spider = await self.get_spider(
        #     url='https://www.interkidsy.com/wholesale-baby-girls-2-piece-shirt-and-shorts-set-7-10y-busra-bebe-1016-24131'
        # )
        #
        # view = views.InterkidsyView(
        #     spider=spider
        # )
        #
        # print(view.dict)

        max_page: int = await self.get_page_count(category=self.category)

        tasks = []

        for page_number in range(1, max_page + 1):
            url: str = 'http://' + self.category[self._domain] + f'?p={page_number}'

            task = self.get_spider(url=url)
            tasks.append(task)

        for spider in await gather(*tasks):
            # tasks = []

            for page_link in self.get_page_links(spider=spider):
                url: str = 'http://' + self._domain + page_link.lstrip('/')
                yield url

            #     task = self.get_dict(url=url)
            #     tasks.append(task)
            #
            # for information in await gather(*tasks):
            #     print(information)

    async def all(self) -> iter:
        links = self.get_all_links()

        tasks = []

        async for link in links:
            task = self.get_dict(url=link)
            tasks.append(task)

        for information in await gather(*tasks):
            yield information


class ZeydankidsService(Service):
    _domain: str = ZEYDANKIDS_DOMAIN

    def get_links(self):
        ...

    ...
