from asyncio import run
from typing import NoReturn

from tqdm import tqdm

import settings
import services


async def main() -> NoReturn:
    category: dict = settings.CATEGORIES['GIRL_SET']

    service_classes = (
        services.ZService,
        services.IService,
    )

    for service_class in tqdm(iterable=service_classes):
        service = service_class(category=category)

        records = service.all()

        async for record in records:
            print(record)


if __name__ == '__main__':
    run(main=main())
