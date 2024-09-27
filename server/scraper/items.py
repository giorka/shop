from dataclasses import dataclass

from . import utils


@dataclass
class ProductItem:
    url: str
    title: str
    item_price: int | float
    package_count: int
    currency: str
    category: str
    sizes: str

    @property
    def id_(self) -> str:
        return utils.encode_url(self.url)

    @property
    def full_price(self) -> int | float:
        return self.item_price * self.package_count


@dataclass
class PreviewItem:
    url: str
    title: str
    image: bytes
    product_id: str

    @property
    def id_(self) -> str:
        return utils.encode_url(self.url)
