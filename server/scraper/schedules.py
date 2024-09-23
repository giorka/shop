import os
import time

import schedule

schedule.every().day.at('00:00').do(lambda: os.popen('py manage.py interkidsy').read())

while True:
    schedule.run_pending()
    time.sleep(1.0)
