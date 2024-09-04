from functools import cache

from aiogram import Bot

from server.settings import settings
from .telegram import TelegramService


@cache
def get_telegram_bot():
    return Bot(settings.tg_token)


@cache
def get_telegram_service():
    bot = get_telegram_bot()

    return TelegramService(bot, settings.tg_chat_id)
