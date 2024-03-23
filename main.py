from asyncio import run
from typing import NoReturn

import categories
import services


async def main() -> NoReturn:
    category: dict = categories.GIRL_SET

    service_classes = (
        services.ZeydankidsService,
        services.InterkidsyService
    )

    for service_class in service_classes:
        service = service_class(category=category)

        records = service.all()

        async for record in records:
            print(record)


if __name__ == '__main__':
    run(main=main())
