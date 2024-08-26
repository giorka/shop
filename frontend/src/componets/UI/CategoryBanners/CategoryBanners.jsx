import React from 'react'
import cl from './CategoryBanners.module.css'
import CategoryBanner from '../CategoryBanner/CategoryBanner'
import allSeason from './categoryBanner/allSeason.png'
import basic from './categoryBanner/basic.png'
import dresses from './categoryBanner/dresses.png'
import newborn from './categoryBanner/newborn.png'
import newSeason from './categoryBanner/newSeason.png'
import party from './categoryBanner/party.png'
import { useTranslation } from 'react-i18next'

function CategoryBanners() {
    const { t, i18n } = useTranslation();
  return (
    <div className={cl.banners}>
        <h2 className={cl.banners_header}>{t("main.categoryBanners.header")}</h2>
        <div className={cl.banners_list}>
            <div className={cl.banners_row}>       
                <CategoryBanner image={newSeason} color="black" objectPosition="0 -70px" width="100%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner1.part1")}</h2>
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner1.part2")}</h2>
                </CategoryBanner>
                <CategoryBanner image={newborn} color="white" objectPosition="0" width="100%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner2")}</h2>
                </CategoryBanner>
                <CategoryBanner image={basic} color="black" objectPosition="-30px 0px" width="135%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner3.part1")}</h2>
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner3.part2")}</h2>
                </CategoryBanner>
            </div>
            <div className={cl.banners_row}>
                <CategoryBanner image={allSeason} color="white" objectPosition="0 -90px" width="130%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner4.part1")}</h2>
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner4.part2")}</h2>
                </CategoryBanner>
                <CategoryBanner image={dresses} color="black" objectPosition="10px 0" width="120%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner5.part1")}</h2>
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner5.part2")}</h2>
                </CategoryBanner>
                <CategoryBanner image={party} color="white" objectPosition="0" width="120%">
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner6.part1")}</h2>
                                <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner6.part2")}</h2>
                </CategoryBanner>
            </div>
            <div className={cl.banners_row}>
                <div className={cl.bottomBanner} style={{backgroundColor: "#F6A1A8"}}>
                    <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner7")}</h2>
                </div>
                <div className={cl.bottomBanner} style={{backgroundColor: "#A682DA"}}>
                    <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner8")}</h2>
                </div>
                <div className={cl.bottomBanner} style={{backgroundColor: "#509AF8"}}>
                    <h2 className={cl.categoryHeader}>{t("main.categoryBanners.banner9")}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryBanners
