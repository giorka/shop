import React, { useContext, useEffect, useState } from 'react'
import cl from './Profile.module.css'
import SwitchButtons from '../../componets/UI/SwitchButtons/SwitchButtons'
import CartItem from '../../componets/UI/CartItem/CartItem'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '../../componets/icons/ProfileIcon'
import { useFetching } from '../../hooks/useFetching'
import CartService from '../../API/CartService'
import Loader from '../../componets/UI/Loader/Loader'
import { CurrencyContext } from '../../context/CurrencyContext'
import OrderService from '../../API/OrderService'
import { useTranslation } from 'react-i18next'

function Profile() {
    const { t, i18n } = useTranslation();
    const [mainCount, setMainCount] = useState("0")
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {currency, setCurrency} = useContext(CurrencyContext)
    // const [changePasswordButtons, setChangePasswordButtons] = useState(false)
    // const [password, setPassword] = useState("")
    const [profileMode, setProfileMode] = useState("")
    const ordersClasses = [cl.profile_orders]
    const cardClasses = [cl.profile_card]
    const selectModeClasses = [cl.selectMode]
    if(profileMode === "orders") ordersClasses.push(cl.active)
    if(profileMode === "card") cardClasses.push(cl.active)
    if(profileMode !== "card" && profileMode !== "orders") selectModeClasses.push(cl.active)
    
    const router = useNavigate()
    useEffect(() => {
        if(!isAuth) router('/login')
    })

    
    const [ordersItems, setOrdersItems] = useState([])
    const [orders, setOrders] = useState([])
    const [fetchCart, isLoading, fetchCartError] = useFetching(async () => {
    let response = await CartService.getCart(localStorage.getItem("auth"))
    setOrdersItems(response.data)
})

const [fetchOrders, isOrdersLoading, fetchOrdersError] = useFetching(async () => {
    let response = await OrderService.getOrders(localStorage.getItem("auth"))
    setOrders(response.data)
})

useEffect(() => {
    fetchCart()
    fetchOrders()
}, [])

    const [buttonsValue, setButtonsValue] = useState("one")

    function logOut() {
        localStorage.removeItem('auth')
        setIsAuth(false)
    }

    async function changePassword() {
        return
    }
  return (
    <div className={cl.profile}>
        <div className={cl.container}>
            <h1 className={cl.profile_mainHeader} onClick={() => setProfileMode("")}>Личный кабинет</h1>
            <div className={cl.profile_content}>
                <div className={ordersClasses.join(' ')}>
                    <h1>{t("profile.header")}</h1>
                    <SwitchButtons buttonsValue={buttonsValue} setButtonsValue={setButtonsValue} firstButtonText={t("profile.firstButton")} secondButtonText={t("profile.secondButton")}/>
                    {buttonsValue === "one" &&
                    <div>
                        {isLoading ?
                        <Loader/> :
                        <div className={cl.orders}>
                            {ordersItems.map((item) => 
                                <div className={cl.orderItem}>
                                    <CartItem id={item.id} setMainCount={setMainCount} deleteButton={false} item={item} key={item.id}/>
                                </div>
                            )}
                        </div>
                        }
                    </div>
                    }
                    {buttonsValue === "two" &&
                    <div className={cl.orders_container}>
                        {isLoading ?
                        <Loader/> :
                        <div className={cl.orders}>
                            {orders.map((order) => 
                            <div className={cl.order}>
                                {order.content.map((item) => 
                                    <div className={cl.orderItem}>
                                        <CartItem id={item.id} setMainCount={setMainCount} deleteButton={false} item={item} key={item.id}/>
                                    </div>
                                )}
                            </div>
                            )}
                        </div>
                        }
                    </div>
                    }
                </div>
                <div className={cardClasses.join(' ')}>
                    <div className={cl.profile_header}>
                        <ProfileIcon/> 
                        <h2>{t("profile.profile_card.header")}</h2>
                    </div>
                    <div className={cl.currency}>
                        <h2>{t("profile.profile_card.currency")}</h2>
                        <div>
                            <select className={cl.select} value={currency} onChange={event => setCurrency(event.target.value)}>
                                <option value="USD">USD</option>
                                <option value="RUB">RUB</option>
                                <option value="TRY">TRY</option>
                            </select>    
                        </div>
                    </div>
                    {/* <div className={cl.inputs}>
                        <input disabled placeholder='@mail'/>
                    </div> */}
                    {/* {changePasswordButtons ?
                    <div className={cl.changePasswordBlock}>
                        <input  type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='пароль'/>
                        <div className={cl.passwordButtons}>
                            <button className={cl.sumbit} onClick={() => changePassword}>Применить</button>
                            <button className={cl.cancel} onClick={() => setChangePasswordButtons(false)}>Отмена</button>
                        </div>
                    </div> 
                    :
                    <button className={cl.changePassword} onClick={() => setChangePasswordButtons(true)}>Сменить пароль</button>
                    } */}
                    <button className={cl.logOut} onClick={() => logOut()}>{t("profile.profile_card.logOut")}</button>
                </div>
            </div>
            <div className={selectModeClasses.join(" ")}>
                <h2 onClick={() => setProfileMode("card")}>{t("profile.profile")}</h2>
                <h2 onClick={() => setProfileMode("orders")}>{t("profile.orders")}</h2>
            </div>
        </div>
        <MyFooter/>
    </div>
  )
}

export default Profile
