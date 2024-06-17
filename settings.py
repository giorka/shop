DEBUG = True

I_DOMAIN = 'www.interkidsy.com'
Z_DOMAIN = 'www.zeydankids.com'

I_CATEGORY = I_DOMAIN + '/ru/'
Z_CATEGORY = Z_DOMAIN + '/urunler/kategori/'

CATEGORIES = {
    # GIRLS
    'GIRL_DRESS': {
        'I': I_CATEGORY + 'platye-dlya-devochki',
        'Z': Z_CATEGORY + '357',
    },
    'GIRL_TOP': {
        'I': I_CATEGORY + 'topy-dlya-devochek',
        'Z': None,
    },
    'GIRL_SHOES': {
        'I': I_CATEGORY + 'obuv-dlya-devochek',
        'Z': None,
    },
    'GIRL_SET': {
        'I': I_CATEGORY + 'komplekty-dlya-devochek',
        'Z': None,
    },
    'GIRL_TROUSERS': {
        'I': I_CATEGORY + 'bryuki-dlya-devochek',
        'Z': Z_CATEGORY + '414',
    },
    'GIRL_UNDERWEAR': {
        'I': I_CATEGORY + 'nizhneye-belye-i-noski-dlya-devochek',
        'Z': Z_CATEGORY + '430',
    },
    'GIRL_OVERALLS': {
        'I': I_CATEGORY + 'kombinezony-dlya-devochek',
        'Z': Z_CATEGORY + '432',
    },
    'GIRL_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-dlya-devochek',
        'Z': Z_CATEGORY + '386',
    },
    'GIRL_SHIRT': {
        'I': I_CATEGORY + 'rubashki-dlya-devochek',
        'Z': Z_CATEGORY + '397',
    },
    'GIRL_OUTERWEAR': {
        'I': I_CATEGORY + 'verkhnyaya-odezhd-dlya-devochek',
        'Z': Z_CATEGORY + '309',
    },
    # BOYS
    'BOY_SET': {
        'I': I_CATEGORY + 'komplekty-dlya-mal-chikov',
        'Z': Z_CATEGORY + '369',
    },
    'BOY_TROUSERS': {
        'I': I_CATEGORY + 'bryuki-dlya-malchikov',
        'Z': Z_CATEGORY + '362',
    },
    'BOY_UNDERWEAR_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-nizhneye-belye-noski',
        'Z': Z_CATEGORY + '385',
    },
    'BOY_TOP': {
        'I': I_CATEGORY + 'topy-dlya-malchikov',
        'Z': None,
    },
    'BOY_SHOES': {
        'I': I_CATEGORY + 'obuv-dlya-malchikov',
        'Z': None,
    },
    'BOY_PAJAMAS': {
        'I': I_CATEGORY + 'pizhamy-dlya-malchikov',
        'Z': Z_CATEGORY + '385',
    },
    'BOY_SHIRT': {
        'I': I_CATEGORY + 'rubashka-dlya-malchika',
        'Z': Z_CATEGORY + '402',
    },
    'BOY_COSTUME': {
        'I': I_CATEGORY + 'kostyum-dlya-malchika',
        'Z': None,
    },
    'BOY_OUTERWEAR': {
        'I': I_CATEGORY + 'verkhnyaya-odezhda-dlya-malchikov',
        'Z': Z_CATEGORY + '425',
    },
}
