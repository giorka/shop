from scrapy import Spider
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def run_spiders(*spiders: Spider) -> None:
    process = CrawlerProcess(get_project_settings())

    for spider in spiders:
        process.crawl(spider)

    process.start()
