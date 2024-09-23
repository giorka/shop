import logging

from categories import CATEGORIES

from .. import items

import scrapy
from scrapy import exceptions as ex
from scrapy.http.response.html import HtmlResponse as Response


class InterkidsySpider(scrapy.Spider):
    name = 'interkidsy'
    allowed_domains = ['interkidsy.com']

    def start_requests(self):
        for category_name, links in CATEGORIES.items():
            urls = filter(lambda link: self.name in link, links)

            for url in urls:
                yield scrapy.Request(
                    url=url,
                    callback=self.parse_pages,
                    meta={'category_name': category_name},
                )

    def parse_pages(self, response: Response):
        last_page = response.css('div.pagination > a.last')

        if not last_page:
            self.log('Failed to parse last page button', level=logging.ERROR)

            last_page_number = 1
        else:
            last_page_link = last_page.attrib['href']  # ...?pg=(page number)
            last_page_number = int(last_page_link.split('pg=')[-1])

        for page_number in range(1, last_page_number + 1):
            yield response.follow(
                url=response.url + '?pg=' + str(page_number),
                callback=self.parse_products,
                meta=response.meta,
            )

    def parse_products(self, response: Response):
        urls = response.css('a.image-wrapper::attr(href)').getall()

        for url in urls:
            yield response.follow(url=url, callback=self.parse_product, meta=response.meta)

    def parse_product(self, response: Response):
        title = response.css('#product-title::text').get()

        if not title:
            raise ex.CloseSpider(f'Cannot extract title from {response.url}')

        count = response.css('input[type="number"]::attr(value)').get()

        if not count:
            raise ex.CloseSpider(f'Cannot extract count')

        try:
            count = int(count)
        except TypeError as err:
            raise ex.CloseSpider(f'Cannot cast {count} to float') from err

        item_price = response.css('span.product-price::text').get()

        if not item_price:
            raise ex.CloseSpider(f'Cannot extract price')

        try:
            item_price = float(item_price.replace(',', '.'))
        except TypeError as err:
            raise ex.CloseSpider(f'Cannot cast {item_price} to float') from err

        full_price = item_price * count

        yield items.ProductItem(
            url=response.url,
            identifier=response.url,
            title=title,
            item_price=item_price,
            full_price=full_price,
            package_count=count,
            currency='USD',
            category=response.meta['category_name'],
            sizes='1-2',
        )

        elements = response.css('a.sub-image-item')

        colors = []

        for element in elements:
            color_name = element.attrib['data-type']
            color_image_url = element.css('figure > span > img::attr(src)').get()
            color_stock = element.attrib['data-stock']

            colors.append({'name': color_name, 'url': color_image_url, 'stock': color_stock})

        for color in colors:
            try:
                yield items.PreviewItem(
                    identifier=response.url.split('/')[-1] + color['name'],
                    title=color['name'],
                    image_url=color['url'],
                    product=response.url,
                )
            except:
                input()
