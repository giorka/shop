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
                    url,
                    callback=self.parse_pages,
                    meta={'category_name': category_name},
                )
            break

    def parse_pages(self, r: Response):
        last_page = r.css('div.pagination > a.last')

        if not last_page:
            last_page_number = 1
        else:
            last_page_link = last_page.attrib['href']  # ...?pg=(page number)
            last_page_number = int(last_page_link.split('pg=')[-1])

        self.log('Parsed ' + str(last_page_number) + ' from ' + r.url)

        for page_number in range(1, last_page_number + 1):
            yield r.follow(
                r.url + '?pg=' + str(page_number),
                callback=self.parse_products,
                meta=r.meta,
            )

    def parse_products(self, r: Response):
        urls = r.css('a.image-wrapper::attr(href)').getall()

        for url in urls:
            yield r.follow(url, callback=self.parse_product, meta=r.meta)

    def parse_product(self, r: Response):
        title = r.css('#product-title::text').get()

        if not title:
            raise ex.CloseSpider(f'Cannot extract title from {r.url}')

        count = r.css('input[type="number"]::attr(value)').get()

        if not count:
            raise ex.CloseSpider(f'Cannot extract count')

        try:
            count = int(count)
        except TypeError as err:
            raise ex.CloseSpider(f'Cannot cast {count} to float') from err

        item_price = r.css('span.product-price::text').get()

        if not item_price:
            raise ex.CloseSpider(f'Cannot extract price')

        try:
            item_price = float(item_price.replace(',', '.'))
        except TypeError as err:
            raise ex.CloseSpider(f'Cannot cast {item_price} to float') from err

        product = items.ProductItem(
            url=r.url,
            title=title,
            item_price=item_price,
            package_count=count,
            currency='USD',
            category=r.meta['category_name'],
            sizes='1-2',
        )
        yield product

        elements = r.css('a.sub-image-item[data-type]')

        for element in elements:
            yield r.follow(
                element.css('figure > span > img::attr(src)').get(),
                callback=self.parse_preview,
                meta=r.meta
                | {
                    'name': element.attrib['data-type'].strip(),
                    'product': product.id_,
                    'stock': int(element.attrib['data-stock']),
                },
            )

    def parse_preview(self, r: Response):
        yield items.PreviewItem(url=r.url, title=r.meta['name'], image=r.body, product_id=r.meta['product'])
