from dataclasses import dataclass
from typing import Dict

from aiohttp import ClientSession
from bs4 import BeautifulSoup

from constants import exchange_rates


@dataclass
class Converter:
    value: int | float
    currency: str

    class Meta:
        rates: Dict[str, float] = {}

    @property
    def rubles(self) -> float:
        if self.currency not in self.Meta.rates:
            rate = self.Meta.rates[self.currency] = float(exchange_rates[self.currency].rate)
        else:
            rate = self.Meta.rates[self.currency]

        return round(self.value * rate, 1)

    # class Singleton:
    #     _instance: Optional['Singleton'] = None
    #
    #     def __new__(cls, *args, **kwargs) -> 'Singleton':
    #         if not cls._instance:
    #             cls._instance: 'Singleton' = super().__new__(cls, *args, **kwargs)
    #
    #         return cls._instance
    #
    #
    # class Converter(ABC, Singleton):
    #     currency: str = None
    #
    #     def __init__(self) -> NoReturn:
    #         self._rate: float = float(exchange_rates[self.currency].rate)
    #
    #     def convert(self, value: float):
    #         return round(value * self._rate, 1)
    #
    #
    # class TRYConverter(Converter):
    #     currency: str = 'TRY'
    #
    #     class Meta:
    #         PATTERN = r'value: (\d*\.\d*),'
    #
    #
    # class USDConverter(Converter):
    #     currency: str = 'USD'


async def get_spider(url: str) -> BeautifulSoup:
    async with ClientSession() as session:
        async with session.get(url=url) as request:
            markup: str = await request.text()

    spider = BeautifulSoup(
        markup=markup,
        features='lxml'
    )

    return spider
