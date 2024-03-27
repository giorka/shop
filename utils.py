from dataclasses import dataclass
from typing import Dict

from aiohttp import ClientSession
from bs4 import BeautifulSoup
from loguru import logger

from constants import exchange_rates
from settings import DEBUG


@dataclass
class Converter:
    value: int | float
    currency: str

    class Meta:
        rates: Dict[str, float] = {}

    @property
    def rubles(self) -> float:
        if DEBUG:
            print(self.value, self.currency)

        if self.currency not in self.Meta.rates:
            rate = self.Meta.rates[self.currency] = float(exchange_rates[self.currency].rate)
        else:
            rate = self.Meta.rates[self.currency]

        return round(self.value * rate, 1)


@logger.catch
async def get_spider(url: str) -> BeautifulSoup:
    if DEBUG:
        print(url)

    async with ClientSession() as session:
        async with session.get(url=url) as request:
            markup: str = await request.text()

    spider = BeautifulSoup(
        markup=markup,
        features='lxml'
    )

    return spider
