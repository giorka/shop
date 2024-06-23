FROM python:3.12-slim

COPY . tg_bot/

WORKDIR tg_bot/

ENV PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6000"]