from categories import CATEGORIES

from .. import items

import scrapy
from scrapy.http.response.html import HtmlResponse as Response


class InterkidsySpider(scrapy.Spider):
    name = 'interkidsy'
    allowed_domains = ['interkidsy.com']

    def start_requests(self):
        for category, links in CATEGORIES.items():
            urls = filter(lambda link: self.name in link, links)

            for url in urls:
                yield scrapy.Request(url, callback=self.parse_pages, meta={'category': category})

    def parse_pages(self, r: Response):
        last_page = r.css('div.pagination > a.last')

        if not last_page:
            last_page_number = 1
        else:
            last_page_link = last_page.attrib.get('href')  # ...?pg=(page number)
            last_page_number = int(last_page_link.split('pg=')[-1])  # type: ignore noqa

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
        title = str(r.css('#product-title::text').get())  # type: ignore noqa
        count = int(r.css('input[type="number"]::attr(value)').get())  # type: ignore noqa
        item_price = float(r.css('span.product-price::text').get().replace(',', '.'))  # type: ignore noqa

        product = items.ProductItem(
            url=r.url,
            title=title,
            item_price=item_price,
            package_count=count,
            currency='USD',
            category=r.meta['category'],
            sizes='1-2',
        )
        yield product

        previews = r.css('a.sub-image-item[data-type]')

        for preview in previews:
            url = preview.css('figure > span > img::attr(src)').get()
            name = preview.attrib.get('data-type').strip()  # type: ignore noqa
            stock = int(preview.attrib.get('data-stock'))  # type: ignore noqa

            yield r.follow(
                url,
                callback=self.parse_preview,
                meta=r.meta | {'name': name, 'product': product.id_, 'stock': stock},
            )

    def parse_preview(self, r: Response):
        yield items.PreviewItem(url=r.url, title=r.meta['name'], image=r.body, product_id=r.meta['product'])
