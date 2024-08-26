import React, { useContext, useState } from 'react'
import cl from "./CatalogItem.module.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import CartService from '../../../API/CartService'
import { CurrencyContext } from '../../../context/CurrencyContext'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

function CatalogItem({product}) {
    const { t, i18n } = useTranslation();
    if(product.previews.length === 0){
        product.previews.push({title: "0-1", image: "https://sublimagia.ru/image/cache/catalog/fut2/dmod11-600x600.jpg"})
    }
    
    const [curerentImg] = useState(product.previews[0].image)
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {currency, setCurrency} = useContext(CurrencyContext)
    const router = useNavigate()

    async function addProduct() {
        toast("Продукт добавлен",
            {
                duration: 3000,
                style: {
                    padding: '26px',
                    fontSize: "26px",
                    width: "500px"
                  },
              }
        )
        if(!isAuth) return router('/login', {state: {
            from: "/catalog"
        }})
        const response = await CartService.addProductInCart(localStorage.getItem("auth"), product.previews[0].identifier)
    }

  return (
    <div className={cl.catalogItem}>
        <img className={cl.img} src={curerentImg} alt="" onClick={() => router(`/catalog/${product.identifier}`)}/>
        <div className={cl.info_text}>
            <h1 onClick={() => router(`/catalog/${product.identifier}`)}>{product.title}</h1>
            <div>
                <div className={cl.prices}>
                        <h2>{t("catalog.price_header")}</h2>
                        <h3>{t("catalog.price1")} {product.prices.item_price[currency]} {currency}</h3>
                        <h3>{t("catalog.price2")} {product.prices.full_price[currency]} {currency}</h3>
                </div>
                <button className={cl.button} onClick={() => addProduct()}>{t("catalog.cart")}</button>
            </div>
        </div>
    </div>
  )
}

export default CatalogItem
