from enum import Enum

import requests

rates = requests.get('https://api.exchangerate-api.com/v4/latest/USD').json()['rates']


class ValuesEnum(Enum):
    USD = 'USD'
    RUB = 'RUB'
    TRY = 'TRY'


class Value:
    def __init__(self, number: int | float, currency: str) -> None:
        self.number = number
        self.currency = currency.upper()

    def __getitem__(self, transfer_to: str) -> float:
        if self.currency == transfer_to:
            return self.number
        elif transfer_to == 'USD':
            result: float = 1 / rates[self.currency] * self.number
        elif transfer_to == 'RUB':
            result: float = rates['RUB'] * 1 / rates[self.currency] * self.number
        else:
            result: float = rates[transfer_to] * self['USD']

        return round(result, 3)
