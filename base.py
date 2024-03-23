from abc import ABC, abstractmethod
from asyncio import gather
from dataclasses import dataclass
from typing import Coroutine, Iterable, NoReturn, Optional

from bs4 import BeautifulSoup

from utils import get_spider


@dataclass
class BaseView(ABC):
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
        return dict(
            title=self.title,
            price=(price := self.price),
            item_price=round(price / self._count, 1),
            colors=[*self.colors],

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
    def get_page_links(spider: BeautifulSoup) -> Optional[Iterable[str]]:
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
