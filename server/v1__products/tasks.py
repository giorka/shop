import asyncio
import io
from typing import Dict, List

import aiohttp
from celery import shared_task
from django.core.files.base import ContentFile
from parsel import Selector
from qrcode import QRCode, constants

from v1__products import models
from .extractors.interkidsy.product import (
    extract_colors,
    extract_full_price,
    extract_item_price,
    extract_title,
)
from .extractors.interkidsy.products import extract_last_page, extract_products_slugs

qr = QRCode(version=1, box_size=10, border=4, error_correction=constants.ERROR_CORRECT_L)


def populate(record: dict) -> None:
    if any(item is None for item in record.values()):
        return

    url, colors = record['url'], record['colors']
    del record['colors'], record['url']

    qr.add_data(url)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color='black', back_color='white')
    image_stream = io.BytesIO()
    qr_image.save(image_stream)
    image_bytes = image_stream.getvalue()
    qr.clear()

    # try:
    product = models.Product(identifier=url.strip('https://witcdn.interkidsy.com/'), **record)
    product.qrcode.save(url.strip('https://') + '.jpg', ContentFile(image_bytes))
    product.save()

    for color_name, color_image_url in colors.items():
        if not color_name or not color_image_url:
            print('penis1')
            continue
        if not color_image_url.lower().startswith('http'):
            print('penis2')
            continue

        image_data = fetch_content_sync(color_image_url.strip('https://witcdn.interkidsy.com/'))

        preview_identifier = color_image_url + color_name

        preview = models.Preview(identifier=preview_identifier, title=color_name, product=product)
        preview.image.save(preview_identifier.strip('https://') + '.jpg', ContentFile(image_data))
        preview.save()
    # except IntegrityError:
    #     return None


async def fetch_htmls(urls: List[str]) -> Dict[str, str]:
    async def fetch(session: aiohttp.ClientSession, url: str) -> tuple[str, str]:
        try:
            async with session.get(url) as response:
                if response.status == 200:
                    html = await response.text()
                    return url, html
                else:
                    return url, f'Error: HTTP {response.status}'
        except Exception as e:
            return url, f'Error: {str(e)}'

    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

    return dict(results)


def fetch_htmls_sync(urls: List[str]) -> Dict[str, str]:
    return asyncio.run(fetch_htmls(urls))


async def fetch_content(url: str) -> bytes:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.content.read()
            else:
                return b''


def fetch_content_sync(url: str) -> bytes:
    return asyncio.run(fetch_content(url))


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


@shared_task(name='populate_the_database')
def main(*args, **kwargs):
    # product = {
    #     'url': 'https://www.interkidsy.com/wholesale-girls-dress-5-8y-elayza-2023-2236',
    #     'title': 'Wholesale Girls Dress 5-8Y Elayza 2023-2236',
    #     'item_price': 12.44,
    #     'full_price': 49.75,
    #     'colors': {
    #         'Beige': 'https://witcdn.interkidsy.com/wholesale-girls-dress-5-8y-elayza-2023-2236-girls-dress-83659-46-K.jpg',
    #         'Blanced Almond': 'https://witcdn.interkidsy.com/wholesale-girls-dress-5-8y-elayza-2023-2236-girls-dress-84038-46-K.jpg',
    #         'Mustard': 'https://witcdn.interkidsy.com/wholesale-girls-dress-5-8y-elayza-2023-2236-girls-dress-83658-46-K.jpg',
    #         'Salmon Color': 'https://witcdn.interkidsy.com/wholesale-girls-dress-5-8y-elayza-2023-2236-girls-dress-83660-46-K.jpg'
    #     }, 'sizes': '5-8Y',
    #     'currency': 'USD',
    #     'package_count': 4
    # }
    # Thread(target=populate, args=[product]).start()
    for category_name, category_urls, in CATEGORIES.items():
        url = category_urls['I']
        print(fetch_htmls_sync([url]).values())
        html = [*fetch_htmls_sync([url]).values()][0]

        pages_urls = []

        last_page: int = extract_last_page(Selector(html))

        for page_number in range(1, last_page + 1):
            page_url = url + '?pg=' + str(page_number)
            pages_urls.append(page_url)

        htmls = fetch_htmls_sync(pages_urls).values()

        for html in htmls:
            slugs = extract_products_slugs(Selector(html))
            products_links = ['https://www.interkidsy.com/' + slug for slug in slugs]

            responses = fetch_htmls_sync(products_links).items()

            for url, html in responses:
                if url == 'https://www.interkidsy.com/':
                    print(404)
                    continue

                sizes = None

                for tr in Selector(html).css('tr').getall():
                    title, value = Selector(tr).css('td::text').getall()

                    if title.lower().strip() == 'assortment':
                        sizes = value
                        break
                try:
                    item_price_usd = extract_item_price(Selector(html))
                    full_price_usd = extract_full_price(Selector(html))

                    product = {
                        'url': url,
                        'title': extract_title(Selector(html)),
                        'item_price': item_price_usd,
                        'full_price': full_price_usd,
                        'colors': extract_colors(Selector(html)),
                        'sizes': sizes,
                        'currency': 'USD',
                        'package_count': int(Selector(html).css('input[type="number"]::attr("value")').get()),
                        'category': category_name
                    }
                    print(product)
                    # Thread(target=populate, args=[product]).start()
                except:
                    continue


main.apply_async()

if __name__ == '__main__':
    main()
