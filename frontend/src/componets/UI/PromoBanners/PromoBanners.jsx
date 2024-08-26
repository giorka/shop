import React from 'react'
import cl from './PromoBanners.module.css'
import PromoBanner from '../PromoBanner/PromoBanner'
import below1 from './promoBackground/below1.png'
import below2 from './promoBackground/below2.png'
import premium from './promoBackground/premium.png'
import { useTranslation } from 'react-i18next'

function PromoBanners() {
    const { t, i18n } = useTranslation();
  return (
    <div className={cl.banners}>
      <PromoBanner image={below1} color="white" objectPosition="0" width="100%">
        <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner10.part1")}</h2>
        <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner10.part2")}</h2>
      </PromoBanner>
      <PromoBanner image={below2} color="white" objectPosition="0" width="100%">
        <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner11.part1")}</h2>
        <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner11.part2")}</h2>
      </PromoBanner>
      <PromoBanner image={premium} color="black" objectPosition="0" width="120%">
        <h2 className={cl.premiumHeader}>{t("main.categoryBanners.banner12")}</h2>
      </PromoBanner>
    </div>
  )
}

export default PromoBanners
