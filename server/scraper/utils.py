import hashlib


def encode_url(url: str) -> str:
    hasher = hashlib.md5()
    hasher.update(url.encode('utf-8'))

    return hasher.hexdigest()
