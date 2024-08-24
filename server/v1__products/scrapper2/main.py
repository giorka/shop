import grequests
from parsel import Selector

from .converter import Value
from .extractors.interkidsy.product import extract_colors, extract_full_price, extract_item_price, extract_title
from .extractors.interkidsy.products import extract_last_page, extract_products_slugs

I_DOMAIN = 'www.interkidsy.com'  # noqa
Z_DOMAIN = 'www.zeydankids.com'  # noqa

I_CATEGORY = 'https://' + I_DOMAIN + '/ru/'  # noqa
Z_CATEGORY = 'https://' + Z_DOMAIN + '/urunler/kategori/'  # noqa

CATEGORIES = {
    # GIRLS
    'GIRL_DRESS': {
        'I': I_CATEGORY + 'platye-dlya-devochki',  # noqa
        'Z': Z_CATEGORY + '357',
    },
    'GIRL_TOP': {
        'I': I_CATEGORY + 'topy-dlya-devochek',  # noqa
        'Z': None,
    },
    'GIRL_SHOES': {
        'I': I_CATEGORY + 'obuv-dlya-devochek',  # noqa
        'Z': None,
    },
    'GIRL_SET': {
        'I': I_CATEGORY + 'komplekty-dlya-devochek',  # noqa
        'Z': None,
    },
    'GIRL_TROUSERS': {
        'I': I_CATEGORY + 'bryuki-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '414',
    },
    'GIRL_UNDERWEAR': {
        'I': I_CATEGORY + 'nizhneye-belye-i-noski-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '430',
    },
    'GIRL_OVERALLS': {
        'I': I_CATEGORY + 'kombinezony-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '432',
    },
    'GIRL_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '386',
    },
    'GIRL_SHIRT': {
        'I': I_CATEGORY + 'rubashki-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '397',
    },
    'GIRL_OUTERWEAR': {
        'I': I_CATEGORY + 'verkhnyaya-odezhd-dlya-devochek',  # noqa
        'Z': Z_CATEGORY + '309',
    },
    # BOYS
    'BOY_SET': {
        'I': I_CATEGORY + 'komplekty-dlya-mal-chikov',  # noqa
        'Z': Z_CATEGORY + '369',
    },
    'BOY_TROUSERS': {
        'I': I_CATEGORY + 'bryuki-dlya-malchikov',  # noqa
        'Z': Z_CATEGORY + '362',
    },
    'BOY_UNDERWEAR_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-nizhneye-belye-noski',  # noqa
        'Z': Z_CATEGORY + '385',
    },
    'BOY_TOP': {
        'I': I_CATEGORY + 'topy-dlya-malchikov',  # noqa
        'Z': None,
    },
    'BOY_SHOES': {
        'I': I_CATEGORY + 'obuv-dlya-malchikov',  # noqa
        'Z': None,
    },
    'BOY_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-dlya-malchikov',  # noqa
        'Z': Z_CATEGORY + '385',
    },
    'BOY_SHIRT': {
        'I': I_CATEGORY + 'rubashka-dlya-malchika',  # noqa
        'Z': Z_CATEGORY + '402',
    },
    'BOY_COSTUME': {
        'I': I_CATEGORY + 'kostyum-dlya-malchika',  # noqa
        'Z': None,
    },
    'BOY_OUTERWEAR': {
        'I': I_CATEGORY + 'verkhnyaya-odezhda-dlya-malchikov',  # noqa
        'Z': Z_CATEGORY + '425',
    },
}


def main() -> list[dict]:
    for category in CATEGORIES.values():
        url = category['I']

        response = grequests.map([grequests.get(url)])[0]
        print(response)

        pages_urls = []

        last_page: int = extract_last_page(Selector(response.text))

        for page_number in range(1, last_page + 1):
            page_url = url + '?pg=' + str(page_number)
            pages_urls.append(page_url)

        responses = grequests.map([grequests.get(page_url) for page_url in pages_urls])

        products = []

        for response in responses:
            slugs = extract_products_slugs(Selector(response.text))
            products_links = ['https://www.interkidsy.com/' + slug for slug in slugs]

            responses = grequests.map([grequests.get(product_url) for product_url in products_links])

            for response in responses:
                if response.url == 'https://www.interkidsy.com/':
                    print(404)
                    continue

                sizes = None

                for tr in Selector(response.text).css('tr').getall():
                    title, value = Selector(tr).css('td::text').getall()

                    if title.lower().strip() == 'assortment':
                        sizes = value
                        break

                item_price_usd = extract_item_price(Selector(response.text))
                full_price_usd = extract_full_price(Selector(response.text))

                product = {
                    'title': extract_title(Selector(response.text)),
                    'prices': {
                        'item_price': {
                            'USD': item_price_usd,
                            'RUB': Value(item_price_usd, currency='USD')['RUB'],
                            'TRY': Value(item_price_usd, currency='USD')['TRY'],
                        },
                        'full_price': {
                            'USD': full_price_usd,
                            'RUB': Value(full_price_usd, currency='USD')['RUB'],
                            'TRY': Value(full_price_usd, currency='USD')['TRY'],
                        },
                    },
                    'colors': extract_colors(Selector(response.text)),
                    'sizes': sizes,
                }

                products.append(product)

        print(products)
        return products


if __name__ == '__main__':
    main()
