import React, { useEffect, useState } from 'react'
import cl from './CartItem.module.css'

function CartItem({id, setMainCount, item, remove}) {
    const [count, setCount] = useState(item.count)

    useEffect(() => {
        item.count = count
        setMainCount(id, count)
    },[count])

    if(count === 0) {
        remove(id)
    }

    item.finalPrice = item.price * count
  return (
        <div className={cl.cartItem}>
            <div className={cl.item_main}>
                <div className={cl.img}></div>
                <div className={cl.item_info}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className={cl.item_params}>
                <div className={cl.item_param}>
                    <h2>Количество</h2>
                    <div className={cl.count}>
                        <button onClick={() => setCount(count - 1)}>-</button>
                        <div>{count}</div>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                </div>
                <div className={cl.item_param}>
                    <h2>Цена</h2>
                    <div>{item.price}</div>
                </div>
                <div className={cl.item_param}>
                    <h2>Общая</h2>
                    <div>{(item.price * count).toFixed(2)}</div>
                </div>
                <div className={cl.item_param}>
                    <h2>Удалить</h2>
                    <button onClick={() => remove(id)}>
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6H4M21.5 6H18.5M4 6V22.5H18.5V6M4 6H7M18.5 6H15M15 6V1H7V6M15 6H7M8 10V19.5M11.5 10V19.5M15 10V19.5" stroke="black" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default CartItem
