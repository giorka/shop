import React from 'react'
import cl from './PromoBannner.module.css'
import { useTranslation } from 'react-i18next';

function PromoBanner({color, image, children, objectPosition, width}) {
    const { t, i18n } = useTranslation();
  return (
    <div className={cl.promoBanner} style={{color: `${color}`}}>
        <div className={cl.image} style={{objectPosition: `${objectPosition}`}}>
            <img src={image} alt="" style={{objectPosition: `${objectPosition}`, width: `${width}`}}/>  
        </div>
        <div className={cl.promoHeaders}>
            <div>
                {children}  
            </div>
            <div className={cl.promoButton_container}> 
                <div className={cl.promoButton}>{t("main.categoryBanners.button")}</div>
            </div>
        </div>
    </div>
  )
}

export default PromoBanner
