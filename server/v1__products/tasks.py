import asyncio
from contextlib import suppress
from threading import Thread

import requests
from celery import shared_task
from django.core.files.base import ContentFile
from django.db import IntegrityError
from tqdm import tqdm

from v1__products import models
from v1__products.utils import scrapper


def populate(record: dict) -> None:
    with suppress(IntegrityError):
        product = models.Product(
            identifier=record['id'],
            title=record['title'],
            item_price=record['item_price'],
            full_price=record['price']
        )
        product.save()
        # product_id = product.identifier

    for color in record['colors']:
        image_data = requests.get(color['image']).content

        preview = models.Preview(title=record['id'])
        preview.image.save(record['id'] + '.jpg', ContentFile(image_data))
        preview.save()


async def parse() -> None:
    category = scrapper.constants.CATEGORIES['GIRL_SET']

    service_classes = (
        scrapper.services.ZService,
        scrapper.services.IService,
    )

    for service_class in tqdm(iterable=service_classes):
        service = service_class(category=category)

        records = service.all()

        async for record in records:
            if not record:
                continue

            Thread(target=populate, args=(record,)).start()


@shared_task(name='populate_the_database')
def populate_the_database() -> None:
    asyncio.run(parse())


populate_the_database.apply_async(countdown=0)
