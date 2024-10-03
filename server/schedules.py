import os
import time

from scraper.management import InterkidsyCommand

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

while True:
    InterkidsyCommand().handle()
    time.sleep(60 * 60 * 12)  # 12h.
