from fastapi import FastAPI
from pydantic import BaseModel
from aiogram.types import URLInputFile

from settings import bot, CHAT_ID


app: FastAPI = FastAPI()


class QueryParamsModel(BaseModel):
    content: str
    photos: str


@app.post("/send", status_code=200)
async def send_message(data: QueryParamsModel) -> dict:
    await bot.send_photo(
        chat_id=CHAT_ID,
        caption=data.content,
        photo=URLInputFile(
            url=data.photos,
            filename="photo.jpg"
        )
    )
    return {
        "message": "ok"
    }
