from pyrogram import Client
from pyrogram.types import (ReplyKeyboardMarkup, InlineKeyboardMarkup, InlineKeyboardButton,ReplyKeyboardRemove)
from dotenv import load_dotenv
import os

load_dotenv()

app = Client("dithbond_stream_bot", api_id=os.getenv("API_ID"), api_hash=os.getenv("API_HASH"), bot_token=os.getenv("BOT_TOKEN"))

async def main():
    async with app:
        await app.send_message("@anticidexbt", "hi")


async def get_topic():
    async with app:
        chat = await app.get_chat("https://t.me/+UXMwd8wtXq83N2Rh")
        print(chat)

app.run(get_topic())