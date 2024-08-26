import React from 'react'
import cl from './CategoryBanner.module.css'

function CategoryBanner({color, image, children, objectPosition, width}) {
  return (
    <div className={cl.categoryBanner} style={{color: `${color}`}}>
        <div className={cl.image} style={{objectPosition: `${objectPosition}`}}>
            <img src={image} alt="" style={{objectPosition: `${objectPosition}`, width: `${width}`}}/>  
        </div>
        <div className={cl.categoryHeaders}>
            {children}  
        </div>
    </div>
  )
}

export default CategoryBanner
