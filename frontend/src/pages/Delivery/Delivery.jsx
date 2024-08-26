import React from 'react'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import cl from './Delivery.module.css'
import delivery from './delivery.png'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { useTranslation } from 'react-i18next'

function Delivery() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={delivery} color="#A682DA" width="54%">
          <h1>{t("delivery.banner.header")}</h1>
        </InfoBanner>
        <div className={cl.info}>
          <div className={cl.redLine}/>
          <div className={cl.info_items}>
            <div className={cl.info_item}>
                <div>
                  <div className={cl.redCircle}/>
                  <div className={cl.number}>1</div>
                </div>
                <div className={cl.info_text}>
                  <h2>{t("delivery.list.item1.header")}</h2>
                  <ul>
                    <li>{t("delivery.list.item1.ul.li1")}</li>
                    <li>{t("delivery.list.item1.ul.li2")}</li>
                    <li>{t("delivery.list.item1.ul.li3")}</li>
                    <li>{t("delivery.list.item1.ul.li4")}</li>
                  </ul>
                </div>
            </div>

            <div className={cl.info_item}>
               <div>
                  <div className={cl.redCircle}/>
                  <div className={cl.number}>2</div>
                </div>
                <div className={cl.info_text}>
                  <h2>{t("delivery.list.item2.header")}</h2>
                  <ul>
                    <li>{t("delivery.list.item2.ul.li1")}</li>
                    <li>{t("delivery.list.item2.ul.li2")}</li>
                    <li>{t("delivery.list.item2.ul.li3")}</li>
                  </ul>
                </div>
            </div>

            <div className={cl.info_item}>
                <div>
                <div className={cl.redCircle}/>
                <div className={cl.number}>3</div>
                </div>
                <div className={cl.info_text}>
                <h2>{t("delivery.list.item3.header")}</h2>
                <ul>
                  <li>{t("delivery.list.item3.ul.li1")}</li>
                  <li>{t("delivery.list.item3.ul.li2")}</li>
                </ul>
                </div>
            </div>
          </div>

        </div>
      </div>
        <div className={cl.sendBack}>
          <div className={cl.sendBack_content}>
            <div className={cl.sendBack_main}>
                <h2>{t("delivery.sendBack.main.header")}</h2>
                <p>{t("delivery.sendBack.main.text")}</p>
            </div>
            <div className={cl.subs}>
              <div className={cl.sub}>
                <div className={cl.whiteCircle}></div>
                <p>{t("delivery.sendBack.sub1")}</p>
              </div>
              <div className={cl.sub}>
                <div className={cl.whiteCircle}></div>
                <p>{t("delivery.sendBack.sub2")}</p>
              </div>
            </div>
          </div>
        </div>
        <MyFooter/>
    </div>
  )
}

export default Delivery
