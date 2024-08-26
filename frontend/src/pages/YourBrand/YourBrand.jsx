import React from 'react'
import brand from './brand.png'
import cl from './YourBrand.module.css'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { useTranslation } from 'react-i18next'

function YourBrand() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={brand} color="#2076E4" width="60%">
          <h1>{t("privateLabel.banner.header")}</h1>
          <p>
              {t("privateLabel.banner.description.part1")}<br/>  
              {t("privateLabel.banner.description.part2")}<br/> 
              {t("privateLabel.banner.description.part3")}<br/> 
              {t("privateLabel.banner.description.part4")}
          </p>
        </InfoBanner>
        <div className={cl.info}>
          <div className={cl.info_text}>{t("privateLabel.info_text")}</div>
          <div className={cl.list}>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>{t("privateLabel.list.item1.header")}</h2>
              <p>{t("privateLabel.list.item1.text")}</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>{t("privateLabel.list.item2.header")}</h2>
              <p>{t("privateLabel.list.item2.text")}</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>{t("privateLabel.list.item3.header")}</h2>
              <p>{t("privateLabel.list.item3.text")}</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>{t("privateLabel.list.item4.header")}</h2>
              <p>{t("privateLabel.list.item4.text")}</p>
            </div>
          </div>
        </div>
      </div>
      <MyFooter/>
    </div>
  )
}

export default YourBrand
