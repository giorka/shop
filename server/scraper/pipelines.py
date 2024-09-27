import io

from v1__products.models import Preview, Product

from . import items

import qrcode
import scrapy
from asgiref.sync import sync_to_async
from django.core.files.base import ContentFile


def make_qr(url):
    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=4,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color='black', back_color='white')
    image_stream = io.BytesIO()
    qr_image.save(image_stream)
    image_bytes = image_stream.getvalue()
    qr.clear()

    return ContentFile(image_bytes)


class DjangoPipeline:
    @sync_to_async
    def process_item(self, item, spider: scrapy.Spider):
        if type(item) == items.ProductItem:
            product = Product(
                identifier=item.id_,
                title=item.title,
                item_price=item.item_price,
                full_price=item.full_price,
                package_count=item.package_count,
                sizes=item.sizes,
                currency=item.currency,
                category=item.category,
            )
            product.qrcode.save(item.id_ + '.jpg', make_qr(item.url))
            product.save()
        elif type(item) == items.PreviewItem:
            product = Product.objects.get(identifier=item.product_id)
            preview = Preview(identifier=item.id_, title=item.title, product=product)
            preview.image.save(item.id_ + '.jpg', ContentFile(item.image))
            preview.save()
        else:
            raise TypeError('No pipeline for ' + item.__class__.__name__)

        return item
