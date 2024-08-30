from asgiref.sync import async_to_sync

from . import dependencies


@async_to_sync
async def send_about_order(email: str, id_count: dict[int, int]) -> None:
    service = dependencies.get_telegram_service()

    async with service:
        products_info = '\n'.join(
            f'Product: {id_} - Count: {count}'
            for id_, count in id_count.items()
        )

        await service.send(
            f'Email -> {email}\n\n'
            f'{products_info}'
        )
