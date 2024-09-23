import scrapy


class ProductItem(scrapy.Item):
    url = scrapy.Field()
    identifier = scrapy.Field()
    title = scrapy.Field()
    item_price = scrapy.Field()
    full_price = scrapy.Field()
    package_count = scrapy.Field()
    currency = scrapy.Field()
    category = scrapy.Field()
    sizes = scrapy.Field()


class PreviewItem(scrapy.Item):
    identifier = scrapy.Field()
    title = scrapy.Field()
    image_url = scrapy.Field()
    product = scrapy.Field()
