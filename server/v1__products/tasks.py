import asyncio
import io
from threading import Thread

import requests
from celery import shared_task
from django.core.files.base import ContentFile
from qrcode import QRCode, constants
from tqdm import tqdm

from v1__products import models
from v1__products.utils import scrapper

qr = QRCode(version=1, box_size=10, border=4, error_correction=constants.ERROR_CORRECT_L)


def populate(record: dict) -> None:
    url, colors = record['url'], record['colors']
    del record['colors'], record['url']

    qr.add_data(url)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color='black', back_color='white')
    image_stream = io.BytesIO()
    qr_image.save(image_stream)
    image_bytes = image_stream.getvalue()
    qr.clear()

    product = models.Product(**record)
    product.qrcode.save(record['identifier'] + '.jpg', ContentFile(image_bytes))
    product.save()

    for color in colors:
        url = color['image']

        if not url.lower().startswith('http'):
            continue

        image_data = requests.get(url).content

        preview = models.Preview(title=color['color'])
        preview.image.save(record['identifier'] + color['color'] + '.jpg', ContentFile(image_data))
        preview.save()

        product.previews.add(preview)


async def parse() -> None:
    service_classes = (
        scrapper.services.ZService,
        scrapper.services.IService,
    )

    for service_class in tqdm(iterable=service_classes):
        for key, category in scrapper.constants.CATEGORIES.items():
            service = service_class(category=category)

            records = service.all()

            async for record in records:
                if not record:
                    continue

                record['category'] = key

                Thread(target=populate, args=(record,)).start()


@shared_task(name='populate_the_database')
def populate_the_database() -> None:
    asyncio.run(parse())


populate_the_database.apply_async(countdown=0)
