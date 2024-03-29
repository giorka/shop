from celery import shared_task


@shared_task(name='parse')
def parse():
    print('Идет парсинг...')
