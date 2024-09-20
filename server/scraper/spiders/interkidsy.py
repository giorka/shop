import logging

from categories import CATEGORIES

import scrapy
from scrapy.http import Response


class InterkidsySpider(scrapy.Spider):
    name = 'interkidsy'
    allowed_domains = ['interkidsy.com']

    def start_requests(self):
        for category_name, links in CATEGORIES.items():
            urls = filter(lambda link: self.name in link, links)

            yield from (
                scrapy.Request(
                    url=url,
                    callback=self.parse_pages,
                    meta={'category_name': category_name},
                )
                for url in urls
            )
            break

    def parse_pages(self, response: Response):
        last_page = response.css('div.pagination > a.last')

        if not last_page:
            self.log('Failed to parse last page button', level=logging.ERROR)

            last_page_number = 1
        else:
            last_page_link = last_page.attrib['href']  # ...?pg=(page number)
            last_page_number = int(last_page_link.split('pg=')[-1])

        yield from (
            response.follow(
                url=response.url + '?pg=' + str(page_number),
                callback=self.parse_products,
                meta=response.meta,
            )
            for page_number in range(1, last_page_number + 1)
        )

    def parse_products(self, response: Response):
        self.log(response.status, response.)
        urls = map(response.css('a.image-wrapper').getall())

        yield from (
            response.follow(url=url.attrib['href'], callback=self.parse_product, meta=response.meta) for url in urls
        )

    def parse_product(self, response: Response):
        self.log('PENIS ' + response.url)
