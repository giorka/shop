from datetime import date

from pycbrf import ExchangeRates

exchange_rates = ExchangeRates(str(date.today()), locale_en=True)
