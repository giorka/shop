import React from 'react'
import cl from './MyFooter.module.css'
import { Link } from 'react-router-dom'
import korona from './img/koronapay.png'
import western from './img/westernunion.png'
import moneygram from './img/moneygram.png'
import moneytransfer from './img/moneytransfer.png'
import wise from './img/wise.png'
import visa from './img/visa.png'
import mastercard from './img/mastercard.png'
import TelegramIcon from '../../icons/TelegramIcon'
import WhatsAppIcon from '../../icons/WhatsAppIcon'
import { useTranslation } from 'react-i18next'

function MyFooter() {
  const { t, i18n } = useTranslation();
  return (
    <div className={cl.footer}>
      <div className={cl.footer_conteiner}>
        <div className={cl.links}>
            <div className={cl.links_column}>
                <Link className={cl.links_item} to='/brand'>{t("footer.privateLabel")}</Link>
                <Link className={cl.links_item} to='/delivery'>{t("footer.delivery")}</Link>
                <Link className={cl.links_item} to='/payment'>{t("footer.payment")}</Link>
            </div>
            <div>
                <Link className={cl.links_item} to='/catalog'>{t("footer.catalog")}</Link>
                <Link className={cl.links_item} to='/about'>{t("footer.aboutUs")}</Link>
            </div>
            <div>
                <div className={cl.links_item}>Duaçınarı, 1. Kurtul Sk. No:46 Kat 1, 16270 Yıldırım/Bursa</div>
                <div className={cl.links_item}>E-mail: <span>kidslandstore1@gmail.com</span></div>
                <div className={cl.links_contact}>
                    <TelegramIcon/>
                    <WhatsAppIcon/>
                  </div>
            </div>
        </div>
        <div className={cl.cards}>
            <div className={cl.cards_item}><img className={cl.korona} src={korona} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.western} src={western} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.moneygram} src={moneygram} alt=''/></div>
            <div className={cl.cards_item} ><img className={cl.moneytransfer} src={moneytransfer} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.wise} src={wise} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.visa} src={visa} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.mastercard} src={mastercard} alt=''/></div>
        </div>
      </div>
    </div>
  )
}

export default MyFooter
