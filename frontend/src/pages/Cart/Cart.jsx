import React, { useState } from 'react'
import cl from './Cart.module.css'
import { Link } from 'react-router-dom'
import CartItem from '../../componets/UI/CartItem/CartItem'

function Cart() {
    const [cartItems, setCartItems] = useState([{id:1,
                                                 name: "Gold class",
                                                 description: "Описание",
                                                 price:14.99,
                                                 count: 1
                                                },{id:2,
                                                    name: "2",
                                                    description: "Описание",
                                                    price:14.99,
                                                    count: 1
                                                   }
                                            ])

    function remove(itemId) {
        setCartItems(cartItems.filter(item => item.id !== itemId))
        console.log(cartItems)
    }

    function setCount(id, count) {
        cartItems.map((item) => {
            if(item.id === id){
                item.count = count
            }
        })
        setCartItems([...cartItems])
    }

    let generalCount = cartItems.reduce((sum, item) => sum + item.count, 0)

    let generalPrice = cartItems.reduce((sum, item) => sum + (item.count * item.price), 0).toFixed(2)

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
                        <h1>Корзина</h1>
                    </div>
                    <div className={cl.cart_main}>
                        <div className={cl.cart_main_content}>
                            <h2>Корзина пуста</h2>
                            <Link className={cl.shopNow}>shop now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

  else return (
    <div className={cl.cart}>
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
                        <h1>Корзина</h1>
                    </div>
                    <div className={cl.cart_items}>
                        {cartItems.map((item) => 
                            <CartItem id={item.id} setMainCount={setCount} item={item} remove={remove} key={item.id}></CartItem>
                        )}
                    </div>
                </div>
                <div className={cl.cart_buy}>
                    <div className={cl.cart_info}>
                        <div className={cl.cart_info_item}>
                            <div>Всего в корзине:</div>
                            <div>{cartItems.length}</div>
                        </div>
                        <div className={cl.cart_info_item}>
                            <div>Общая цена:</div>
                            <div>{generalPrice}</div>
                        </div>
                        <div className={cl.cart_info_item}>
                            <div>Количество:</div>
                            <div>{generalCount}</div>
                        </div>
                    </div>
                    <div className={cl.cart_inputs}>
                        <div className={cl.cart_input}>
                            <div><input type="checkbox" /></div>
                            <p>Международные системы денежных переводов, Western Union, Corona Pay, Contact, MoneyGram, Ria и тд</p>
                        </div>
                        <div className={cl.cart_input}>
                            <div><input type="checkbox" /></div>
                            <p>Перевод оплаты на наш банковский счет через в вашей стране.</p>
                        </div>
                    </div>
                    <button>купить</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
