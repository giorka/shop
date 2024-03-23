from asyncio import run
from typing import NoReturn

import categories
import interkidsy
import zeydankids


async def main() -> NoReturn:
    category: dict = categories.GIRL_SET

    service_classes = (
        zeydankids.service.Service,
        interkidsy.service.Service,
    )

    for service_class in service_classes:
        service = service_class(category=category)

        records = service.all()

        async for record in records:
            print(record)


if __name__ == '__main__':
    run(main=main())
