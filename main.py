from asyncio import run
from typing import NoReturn

import categories
import services


async def main() -> NoReturn:
    service = services.InterkidsyService(category=categories.GIRL_SET)
    await service.get_links()


if __name__ == '__main__':
    run(main=main())
