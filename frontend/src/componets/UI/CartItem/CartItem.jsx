import React, { useContext, useEffect, useState } from 'react'
import cl from './CartItem.module.css'
import DeleteIcon from '../../icons/DeleteIcon'
import { useNavigate } from 'react-router-dom'
import { CurrencyContext } from '../../../context/CurrencyContext'
import { useTranslation } from 'react-i18next'

function CartItem({id, deleteButton, setMainCount, item, remove}) {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(item.product.package_count)
    const router = useNavigate()
    const {currency, setCurrency} = useContext(CurrencyContext)

    function changeCount(button) {
        if(!setMainCount || !remove) return
        if(button === "-"){
            setCount(count - 1)
        }
        if(button === "+"){
            setCount(count + 1)
        }
    }

    useEffect(() => {
        item.product.package_count = count
        setMainCount(id, count)
    },[count])

    if(count === 0) {
        remove(id)
    }

    item.finalPrice = item.product.prices.item_price[currency] * count
  return (
        <div className={cl.cartItem}>
            <div className={cl.item_main}>
                <img onClick={() => router(`/catalog/${item.product.identifier}`)} src={item.image} alt=""className={cl.img}/>
                <div className={cl.item_info}>
                    <h2 onClick={() => router(`/catalog/${item.product.identifier}`)}>{item.product.identifier}</h2>
                </div>
            </div>
            <div className={cl.item_params}>
                <div className={cl.item_param}>
                    <h2>{t("cart.cart_item.count")}</h2>
                    <div className={cl.count}>
                        <button>-</button>
                        <div>{count}</div>
                        <button>+</button>
                    </div>
                </div>
                <div className={cl.item_param}>
                    <h2>{t("cart.cart_item.price")}</h2>
                    <div>{item.product.prices.item_price[currency]}</div>
                </div>
                <div className={cl.item_param}>
                    <h2>{t("cart.cart_item.total")}</h2>
                    <div>{(item.product.prices.item_price[currency] * count).toFixed(2)}</div>
                </div>
                {deleteButton &&
                <div className={cl.item_param}>
                    <h2>{t("cart.cart_item.delete")}</h2>
                    <button onClick={() => remove(id)}>
                        <DeleteIcon/>
                    </button>
                </div>
                }
            </div>
        </div>
  )
}

export default CartItem
