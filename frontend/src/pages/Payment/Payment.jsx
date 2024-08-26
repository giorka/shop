import React from 'react'
import payment from './payment.png'
import cl from './Payment.module.css'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { useTranslation } from 'react-i18next'

function Payment() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={payment} color="#2076E4" width="54%">
          <h1>{t("payment.banner.header")}</h1>
        </InfoBanner>
        <div className={cl.info}>
          <h2>{t("payment.info_text")}</h2>
          <div className={cl.info_items}>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>{t("payment.list.item1.text")}</p>
              </div>
            </div>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>{t("payment.list.item2.text")}</p>
              </div>
            </div>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>{t("payment.list.item3.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <MyFooter/>
    </div>
  )
}

export default Payment
