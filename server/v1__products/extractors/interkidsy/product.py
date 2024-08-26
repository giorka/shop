from parsel import Selector

from ...utils import convert_to_float


def extract_title(selector: Selector) -> str:
    return selector.css('#product-title::text').get()


def extract_item_price(selector: Selector) -> float:
    item_price: str = selector.css('.mr-1 > .product-current-price > span::text').get()

    return convert_to_float(item_price)


def extract_full_price(selector: Selector) -> float:
    full_price: str = selector.css('.price-wrapper')[-1].css('.product-current-price > span::text').get()

    return convert_to_float(full_price)


def extract_colors(selector: Selector) -> dict[str, str]:
    sizes = {}

    for image_item in selector.css('.sub-image-item:not(#other-color)'):
        color_name = image_item.css('::attr(data-type)').get().strip()
        color_image_url = image_item.css('.border-round::attr(src)').get()

        sizes[color_name] = color_image_url

    return sizes
