from dataclasses import dataclass
from typing import Dict

from .constants import exchange_rates


@dataclass
class Converter:
    value: int | float
    currency: str

    class Meta:
        rates: Dict[str, float] = {}

    @property
    def rubles(self) -> float:
        if self.currency not in self.Meta.rates:
            rate = self.Meta.rates[self.currency] = float(exchange_rates[self.currency].rate)
        else:
            rate = self.Meta.rates[self.currency]

        return round(self.value * rate, 1)


def convert_to_float(price: str) -> float:
    return float(price.replace(',', '.'))
