import React from 'react'
import cl from './Contacts.module.css'
import TelegramIcon from '../../componets/icons/TelegramIcon'
import WhatsAppIcon from '../../componets/icons/WhatsAppIcon'
import { useTranslation } from 'react-i18next';

function Contacts() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={cl.title}>
        <h2>{t("contacts.header")}</h2>
      </div>
      <div>
        <iframe title="map" className={cl.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d906.0908470156633!2d29.095216971308687!3d40.193173829130274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3f57f8127257%3A0x7d92a64306d66d37!2sKidsland%20store!5e0!3m2!1sru!2sru!4v1716925668625!5m2!1sru!2sru"  allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className={cl.info}>
          <p>Duaçınarı, 1. Kurtul Sk. No:46 Kat 1, 16270 Yıldırım/Bursa</p>
          <p className={cl.email}>E-mail: <span>kidslandstore1@gmail.com</span></p>
          <div className={cl.icons}>
            <TelegramIcon/>
            <WhatsAppIcon/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
