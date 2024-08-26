import React, { useContext, useEffect, useState } from 'react'
import cl from './Cart.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CartItem from '../../componets/UI/CartItem/CartItem'
import { useFetching } from '../../hooks/useFetching'
import { AuthContext } from '../../context/AuthContext'
import CartService from '../../API/CartService'
import Loader from '../../componets/UI/Loader/Loader'
import { CurrencyContext } from '../../context/CurrencyContext'
import OrderService from '../../API/OrderService'
import { useTranslation } from 'react-i18next'


function Cart() {
    const { t, i18n } = useTranslation();
    const {currency, setCurrency} = useContext(CurrencyContext)
    const [cartItems, setCartItems] = useState([{product: {prices: {item_price: {TRY: 1}}}}])

    const [fetchCart, isLoading, fetchCartError] = useFetching(async () => {
        let response = await CartService.getCart(localStorage.getItem("auth"))
        setCartItems(response.data)
    })

    const [checkBoxes, setCheckBoxes] = useState([false, false])
    const [generalPrice, setGeneralPrice] = useState(0)
    const [generalCount, setGeneralCount] = useState(0)
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const router = useNavigate()
    useEffect(() => {
        if(!isAuth) router('/login', {state: {
            from: "/cart"
        }})
    })
    
    useEffect(() => {
        fetchCart()
    }, [])
     
    
    useEffect(() => {
        setGeneralCount(cartItems.reduce((sum, item) => sum + item.product.package_count, 0))
        setGeneralPrice(cartItems.reduce((sum, item) => sum + (item.product.package_count * item.product.prices.item_price[currency]), 0).toFixed(2))
    }, [cartItems])

    async function remove(itemId) {
        const response = await CartService.deleteProductInCart(localStorage.getItem("auth"), itemId)
        setCartItems(cartItems.filter(item => item.identifier !== itemId))
    }
    
    function setCount(id, count) {
        cartItems.map((item) => {
            if(item.identifier === id){
                item.product.count = count
            }
        })
        setCartItems([...cartItems])
    }

    async function addOrder() {
        setCartItems([])
        const response = await OrderService.addOrder(localStorage.getItem("auth"))
    }
    
    
  if (cartItems.length === 0) return (
    <div className={cl.cart}>
        <div className={cl.container}>
            <div>
                <div>
                    <div className={cl.cart_name}>
                        <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2H11.706C11.9988 2 12.2566 2.19297 12.339 2.4739L21.8685 34.9385C21.9509 35.2194 22.2087 35.4124 22.5015 35.4124H47.5074" stroke="black" strokeWidth="2.39062" strokeLinecap="round"/>
                            <path d="M13.7695 6.88965L26.7816 7.00268M50.3818 16.091L52.7521 8.06947C52.8764 7.64906 52.5636 7.22665 52.1252 7.22284L39.7937 7.11572M50.3818 16.091L47.7036 25.1545C47.6199 25.4376 47.3583 25.6307 47.063 25.6272L38.2401 25.5211M50.3818 16.091H16.3703L19.0946 25.5211L28.7237 25.4067M39.7937 7.11572L38.2401 25.5211M39.7937 7.11572L26.7816 7.00268M38.2401 25.5211L28.7237 25.4067M28.7237 25.4067L26.7816 7.00268" stroke="black" strokeWidth="2.39062"/>
                            <path d="M26.6107 39.2736C26.6107 41.0071 25.2435 42.3664 23.613 42.3664C21.9825 42.3664 20.6152 41.0071 20.6152 39.2736C20.6152 37.5401 21.9825 36.1808 23.613 36.1808C25.2435 36.1808 26.6107 37.5401 26.6107 39.2736Z" stroke="black" strokeWidth="2.39062"/>
                            <path d="M50.4765 39.2736C50.4765 40.9243 49.0489 42.3664 47.1562 42.3664C45.2635 42.3664 43.8359 40.9243 43.8359 39.2736C43.8359 37.623 45.2635 36.1808 47.1562 36.1808C49.0489 36.1808 50.4765 37.623 50.4765 39.2736Z" stroke="black" strokeWidth="2.39062"/>
                        </svg>
                        <h1>{t("cart.header")}</h1>
                    </div>
                    <div className={cl.cart_main}>
                        <div className={cl.cart_main_content}>
                            <h2>{t("cart.no_items")}</h2>
                            <Link className={cl.shopNow} to="/catalog">{t("cart.no_items_button")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

  else return (
    <div className={cl.cart}>
        {isLoading ?
                    <Loader/>:
        <div className={cl.container}>
            <div className={cl.cart_content}>
                <div className={cl.cart_zone}>
                    <div className={cl.cart_name}>
                        <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2H11.706C11.9988 2 12.2566 2.19297 12.339 2.4739L21.8685 34.9385C21.9509 35.2194 22.2087 35.4124 22.5015 35.4124H47.5074" stroke="black" strokeWidth="2.39062" strokeLinecap="round"/>
                            <path d="M13.7695 6.88965L26.7816 7.00268M50.3818 16.091L52.7521 8.06947C52.8764 7.64906 52.5636 7.22665 52.1252 7.22284L39.7937 7.11572M50.3818 16.091L47.7036 25.1545C47.6199 25.4376 47.3583 25.6307 47.063 25.6272L38.2401 25.5211M50.3818 16.091H16.3703L19.0946 25.5211L28.7237 25.4067M39.7937 7.11572L38.2401 25.5211M39.7937 7.11572L26.7816 7.00268M38.2401 25.5211L28.7237 25.4067M28.7237 25.4067L26.7816 7.00268" stroke="black" strokeWidth="2.39062"/>
                            <path d="M26.6107 39.2736C26.6107 41.0071 25.2435 42.3664 23.613 42.3664C21.9825 42.3664 20.6152 41.0071 20.6152 39.2736C20.6152 37.5401 21.9825 36.1808 23.613 36.1808C25.2435 36.1808 26.6107 37.5401 26.6107 39.2736Z" stroke="black" strokeWidth="2.39062"/>
                            <path d="M50.4765 39.2736C50.4765 40.9243 49.0489 42.3664 47.1562 42.3664C45.2635 42.3664 43.8359 40.9243 43.8359 39.2736C43.8359 37.623 45.2635 36.1808 47.1562 36.1808C49.0489 36.1808 50.4765 37.623 50.4765 39.2736Z" stroke="black" strokeWidth="2.39062"/>
                        </svg>
                        <h1>{t("cart.header")}</h1>
                    </div>
                    {isLoading ?
                    <Loader/>:
                    <div>
                    {fetchCartError ?
                        <h1 className={cl.error}>{fetchCartError}</h1>
                        :
                        <div className={cl.cart_items}>
                            {cartItems.map((item) => 
                                <CartItem id={item.identifier} deleteButton={true} setMainCount={setCount} item={item} remove={remove} key={item.id}></CartItem>
                            )}
                        </div>
                    }
                    </div>
                }
                </div>
                <div className={cl.cart_buy}>
                    <div className={cl.cart_info}>
                        <div className={cl.cart_info_item}>
                            <div>{t("cart.cart_info.total_cart")}</div>
                            <div>{cartItems.length}</div>
                        </div>
                        <div className={cl.cart_info_item}>
                            <div>{t("cart.cart_info.total_price")}</div>
                            <div>{generalPrice} {currency}</div>
                        </div>
                        <div className={cl.cart_info_item}>
                            <div>{t("cart.cart_info.count")}</div>
                            <div>{generalCount}</div>
                        </div>
                    </div>
                    <div className={cl.cart_inputs}>
                        <div className={cl.cart_input}>
                            <div><input type="checkbox" onChange={() => setCheckBoxes([true, false])} checked={checkBoxes[0]}/></div>
                            <p>{t("cart.cart_info.input1")}</p>
                        </div>
                        <div className={cl.cart_input}>
                            <div><input type="checkbox" onChange={() => setCheckBoxes([false, true])} checked={checkBoxes[1]}/></div>
                            <p>{t("cart.cart_info.input2")}</p>
                        </div>
                    </div>
                    <button onClick={() => addOrder()}>{t("cart.cart_info.buy")}</button>
                </div>
            </div>
        </div>
}
    </div>
  )
}

export default Cart
