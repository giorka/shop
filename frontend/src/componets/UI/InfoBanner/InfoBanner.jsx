import React from 'react'
import cl from './InfoBanner.module.css'


function InfoBanner({color, image, children, width}) {
  return (
    <div className={cl.banner}>
        <div className={cl.banner_content} style={{backgroundColor: `${color}`}}>
          <div className={cl.banner_text}>
            {children}
          </div>
        </div>
        <img src={image} style={{width: `${width}`}} className={cl.img} alt="" />
    </div>
  )
}

export default InfoBanner
