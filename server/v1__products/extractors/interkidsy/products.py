import re

from parsel import Selector


def extract_last_page(selector: Selector) -> int:
    last_url_link = selector.css('.last::attr("href")').get()

    if last_url_link is None:
        return 1

    matches = re.search(r'pg=(\d*)', last_url_link)

    if matches:
        return int(matches.group(1))
    else:
        print('Failed To Fetch Page Number From', last_url_link)


def extract_products_slugs(selector: Selector) -> list[str]:
    return [route.split('/')[-1] for route in selector.css('.image-wrapper::attr("href")').getall()]
