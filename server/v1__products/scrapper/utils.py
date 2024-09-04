from aiohttp import ClientSession
from bs4 import BeautifulSoup
from loguru import logger

from server import settings


@logger.catch
async def get_spider(url: str) -> BeautifulSoup:
    if settings.DEBUG:
        print(url)

    async with ClientSession() as session:
        async with session.get(url=url) as request:
            markup: str = await request.text()

    spider = BeautifulSoup(markup=markup, features='lxml')

    spider.url = url

    return spider


def convert_to_float(price: str) -> float:
    return float(price.replace(',', '.'))
