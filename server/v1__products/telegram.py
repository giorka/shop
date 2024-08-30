from typing import Self

from aiogram import Bot


class TelegramService:
    def __init__(self, bot: Bot, chat_id: str) -> None:
        self._bot = bot
        self.chat_id = chat_id

    async def __aenter__(self) -> Self:
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        await self._bot.session.close()

    async def send(self, text: str) -> None:
        await self._bot.send_message(self.chat_id, text)
