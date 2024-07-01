import React, { useState } from 'react'
import cl from "./CatalogItem.module.css"
import { useNavigate } from 'react-router-dom'

function CatalogItem({product}) {
    if(product.previews.length === 0){
        product.previews.push({title: "0-1", image: "https://sublimagia.ru/image/cache/catalog/fut2/dmod11-600x600.jpg"})
    }
    
    const [curerentImg, setCurrentImg] = useState(product.previews[0].image)
    const router = useNavigate()
  return (
    <div className={cl.catalogItem}>
        <img className={cl.img} src={curerentImg} alt="" onClick={() => router(`/catalog/${product.identifier}`)}/>
        <div className={cl.subImages}> 
            {/* {product.previews.map(preview =>
                <img className={cl.subImage} src={preview.image} onClick={() => setCurrentImg(preview.image)} alt=""/>
            )} */}
        </div>
        <h1 onClick={() => router(`/catalog/${product.identifier}`)}>{product.title}</h1>
        <h2>Цена товара</h2>
        <h3>за штуку {product.prices.item_price.TRY} TRY</h3>
        <h3>за упаковку {product.prices.full_price.TRY} TRY</h3>
        <button className={cl.button}>в корзину</button>
    </div>
  )
}

export default CatalogItem
