import io

from v1__products.models import Preview, Product

from . import items

import qrcode
import requests
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
    def process_item(self, item, spider):
        match type(item):
            case items.ProductItem:
                product = Product(
                    identifier=item['identifier'].split('/')[-1],
                    title=item['title'],
                    full_price=item['full_price'],
                    item_price=item['item_price'],
                    package_count=item['package_count'],
                    sizes=item['sizes'],
                    currency=item['currency'],
                    category=item['category'],
                )
                product.qrcode.save(item['url'].split('/')[-1] + '.jpg', make_qr(item['url']))
                product.save()
            case items.PreviewItem:
                preview = Preview(
                    identifier=item['identifier'].split('/')[-1],
                    title=item['title'],
                    product=Product.objects.get(identifier=item['product'].split('/')[-1]),
                )
                preview.image.save(item['identifier'] + '.jpg', ContentFile(requests.get(item['image_url']).content))
                preview.save()

        return item
