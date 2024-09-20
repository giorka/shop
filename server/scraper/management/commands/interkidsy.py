from django.core.management.base import BaseCommand

from ... import shortcuts, spiders


class Command(BaseCommand):
    help = 'Runs the Interkidsy Scrapy spider'

    def handle(self, *args, **options):
        shortcuts.run_spiders(
            spiders.InterkidsySpider,
        )
