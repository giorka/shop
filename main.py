from asyncio import run
from typing import NoReturn

import categories
import services


async def main() -> NoReturn:
    service = services.InterkidsyService(category=categories.GIRL_SET)

    records = service.all()

    async for record in records:
        print(record)


if __name__ == '__main__':
    run(main=main())
