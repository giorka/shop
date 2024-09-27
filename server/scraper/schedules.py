# @bodge: Bash only
import os
import time

while True:
    os.popen('python3 manage.py interkidsy').read()
    time.sleep(60 * 60 * 12)  # 12h.
