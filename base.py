from abc import ABC, abstractmethod
from asyncio import gather
from dataclasses import dataclass
from typing import Coroutine, NoReturn, Type

from bs4 import BeautifulSoup

from utils import get_spider


@dataclass
class BaseView(ABC):
    """
    TODO: настроить абстрактные атрибуты
    """

    spider: BeautifulSoup

    @property
    @abstractmethod
    def dict(self) -> dict:
        # TODO: написать пример

        return dict(

        )


class BaseService(ABC):
    """
    TODO: Singletone
    """

    view = None
    _domain: str = None

    def __init__(self, category: dict) -> NoReturn:
        self.category: dict = category

    @staticmethod
    @abstractmethod
    def get_page_links(spider: BeautifulSoup):
        return

    @abstractmethod
    async def get_dict(self, url: str) -> dict:
        ...

    @property
    @abstractmethod
    async def links(self) -> iter:
        yield 'http://example.com/'

    async def get_dict(self, url: str) -> dict:
        return self.view(spider=await get_spider(url=url)).dict

    async def all(self) -> iter:
        links: iter = self.links

        tasks: list = []

        async for link in links:
            task: Coroutine = self.get_dict(url=link)
            tasks.append(task)

        for information in await gather(*tasks):
            yield information
