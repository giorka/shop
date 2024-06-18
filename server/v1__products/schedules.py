"""
celery -A v1 worker --pool=solo -l info
celery -A v1 beat -l info
"""

import os

from celery import Celery
from celery.schedules import crontab

from server.settings import DEBUG

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

application: Celery = Celery('celery')
application.config_from_object('django.conf:settings', namespace='CELERY')
application.autodiscover_tasks()

application.conf.beat_schedule = {
    'populate_the_database': {
        'task': 'populate_the_database',
        'schedule': (crontab(minute='*/30') if DEBUG else crontab(minute=0, hour=0)),
    },
}

if __name__ == '__main__':
    application.start()
