from scraper import shortcuts, spiders

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Runs the Interkidsy Scrapy spider'

    def handle(self, *args, **options):
        shortcuts.run_spiders(spiders.InterkidsySpider)
