FROM python:3.12

COPY . backend/

WORKDIR backend/

ENV PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:7000"]