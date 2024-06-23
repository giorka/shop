from os import getenv

from aiogram import Bot
from dotenv import load_dotenv

load_dotenv()


BOT_TOKEN: str = getenv("BOT_TOKEN")
CHAT_ID: int = int(getenv("CHAT_ID"))


bot: Bot = Bot(
    token=BOT_TOKEN,
    parse_mode="HTML"
)
