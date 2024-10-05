from functools import cache

from server.settings import settings
from telegram import TelegramService

from aiogram import Bot


@cache
def get_telegram_bot() -> Bot:
    return Bot(token=settings.tg_token)


def get_telegram_service() -> TelegramService:
    return TelegramService(bot=get_telegram_bot(), chat_id=settings.tg_chat_id)
