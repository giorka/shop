import React, { useContext, useState } from 'react'
import cl from './Navbar.module.css'
import { Link } from 'react-router-dom'
import LangIcon from '../../icons/LangIcon.jsx'
import SearchIcon from '../../icons/SearchIcon.jsx'
import CartIcon from '../../icons/CartIcon.jsx'
import ProfileIcon from '../../icons/ProfileIcon.jsx'
import CloseIcon from '../../icons/CloseIcon.jsx'
import MenuIcon from '../../icons/MenuIcon.jsx'
import { useTranslation } from 'react-i18next'
import { CurrencyContext } from '../../../context/CurrencyContext.js'

function Navbar() {
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState({value: ""})
    const {currency, setCurrency} = useContext(CurrencyContext)
    const rootClasses = [cl.mobileMenu]

    if (visible) {
        rootClasses.push(cl.active);
    }

    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
  return (
    <div className={cl.navbar}>
        <div className={cl.navbar_content}>
            <Link to='/' className={cl.logo}>
                <div/>
            </Link>
            <nav className={cl.navbar_items}>
                <Link className={cl.navbar_item} to='/brand'>{t("navbar.privateLabel")}</Link>
                <Link className={cl.navbar_item} to='/delivery'>{t("navbar.delivery")}</Link>
                <Link className={cl.navbar_item} to='/payment'>{t("navbar.payment")}</Link>
                <Link className={cl.navbar_item} to='/contacts'>{t("navbar.contacts")}</Link>
            </nav>
            <div className={cl.search}>
                <input  value={search.value}
                        onChange={e => setSearch({value: e.target.value})}
                        className={cl.input}/>
                <Link onClick={() => setSearch({value: ""})} className={cl.links_item} to='/catalog' state={{ search: search.value }}><SearchIcon/></Link>
            </div>
            <div className={cl.lang}>
                    <LangIcon/>
                    <select name="lang" id="lang" className={cl.langSelect} onChange={event => changeLanguage(event.target.value)} value={i18n.language}>
                        <option value="ru">RU</option>
                        <option value="en">EN</option>
                        <option value="ar">AR</option>
                    </select>
                    <select name="currency" id="" value={currency} className={cl.currencySelect} onChange={event => setCurrency(event.target.value)}>
                        <option value="USD" >$ USD</option>
                        <option value="RUB" >₽ RUB</option>
                        <option value="TRY" >₺ TYR</option>
                    </select>
            </div>
            <Link to='/login'className={cl.profile}>
                <ProfileIcon/>
            </Link>
            <Link to='/cart' className={cl.cart}>
                <CartIcon/>
            </Link>
        </div>

        <div className={cl.mobileNavbar_content}>
            <div className={cl.mainNavbar_conteiner}>
                <div className={cl.mainNavbar}>
                    {visible ?
                    <button className={cl.menu} onClick={() => setVisible(false)}>
                        <CloseIcon/>
                    </button> :
                    <button className={cl.menu} onClick={() => setVisible(true)}>
                        <MenuIcon/>
                    </button>
                }
                    <div className={cl.mobileLang}>
                        <LangIcon/>
                        <select name="lang" id="lang" className={cl.langSelect} onChange={event => changeLanguage(event.target.value)} value={i18n.language}>
                            <option value="ru">RU</option>
                            <option value="en">EN</option>
                            <option value="ar">AR</option>
                        </select>
                    </div>
                    <Link to='/' className={cl.logo}>
                        <div/>
                    </Link>
                    <select name="currency" id="" value={currency} className={cl.currencySelect} onChange={event => setCurrency(event.target.value)}>
                        <option value="USD" >$</option>
                        <option value="RUB" >₽</option>
                        <option value="TRY" >₺</option>
                    </select>
                    <Link to='/login'className={cl.profile}>
                        <ProfileIcon/>
                    </Link>
                    <Link to='/cart' className={cl.cart}>
                        <CartIcon/>
                    </Link>
                </div>
            </div>
            <div className={cl.search_conteiner}>
                <div className={cl.search}>
                <input  value={search.value}
                        onChange={e => setSearch({value: e.target.value})}
                        className={cl.input}/>
                <Link onClick={() => setSearch({value: ""})} className={cl.links_item} to='/catalog' state={{ search: search.value }}>
                    <SearchIcon/>
                </Link>
                </div>
            </div>
        </div>
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
                <nav className={cl.navbar_items} onClick={() => setVisible(false)}>
                    <Link className={cl.navbar_item} to='/brand'>{t("navbar.catalog")}</Link>
                    <Link className={cl.navbar_item} to='/brand'>{t("navbar.privateLabel")}</Link>
                    <Link className={cl.navbar_item} to='/delivery'>{t("navbar.delivery")}</Link>
                    <Link className={cl.navbar_item} to='/payment'>{t("navbar.payment")}</Link>
                    <Link className={cl.navbar_item} to='/contacts'>{t("navbar.contacts")}</Link>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Navbar
