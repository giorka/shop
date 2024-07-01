import React from 'react'
import cl from './navbar.module.css'
import { Link } from 'react-router-dom'

function navbar() {
  return (
    <div className={cl.navbar}>
        <div className={cl.navbar_content}>
            <div className={cl.logo}>
                <div/>
            </div>
            <nav className={cl.navbar_items}>
                <Link className={cl.navbar_item} to='/brand'>Ваш бренд</Link>
                <Link className={cl.navbar_item} to='/delivery'>Доставка</Link>
                <Link className={cl.navbar_item} to='/payment'>Оплата</Link>
                <Link className={cl.navbar_item} to='/contacts'>Контакты</Link>
            </nav>
            <div className={cl.search}>
                <input className={cl.input}/>
                <Link className={cl.links_item} to='/catalog'><svg width="29" height="26" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12.3947" cy="11.5625" rx="11.3947" ry="10.5625" stroke="#83878C" strokeWidth="1.93939"/>
                    <path d="M29.298 27.7415C29.7076 28.0866 30.3193 28.0344 30.6644 27.6249C31.0095 27.2153 30.9573 26.6036 30.5478 26.2585L29.298 27.7415ZM19.6564 19.6165L29.298 27.7415L30.5478 26.2585L20.9061 18.1335L19.6564 19.6165Z" fill="#83878C"/>
                </svg></Link>
            </div>
            <div className={cl.lang}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="13.25" stroke="black" strokeWidth="1.5"/>
                    <path d="M20.25 14C20.25 17.7748 19.4834 21.1552 18.2789 23.5641C17.052 26.0179 15.4959 27.25 14 27.25C12.5041 27.25 10.948 26.0179 9.72107 23.5641C8.51662 21.1552 7.75 17.7748 7.75 14C7.75 10.2252 8.51662 6.84483 9.72107 4.43592C10.948 1.98214 12.5041 0.75 14 0.75C15.4959 0.75 17.052 1.98214 18.2789 4.43592C19.4834 6.84483 20.25 10.2252 20.25 14Z" stroke="black" strokeWidth="1.5"/>
                    <path d="M14 0V28" stroke="black" strokeWidth="1.5"/>
                    <path d="M1 14L27 14" stroke="black" strokeWidth="1.5"/>
                    <path d="M5 4C7.7 6.26387 15.08 9.43329 23 4" stroke="black" strokeWidth="1.5"/>
                    <path d="M23 24C20.3 21.7361 12.92 18.5667 5 24" stroke="black" strokeWidth="1.5"/>
                </svg>
                    <select name="lang" id="lang" className={cl.langSelect}>
                        <option>RU</option>
                        <option>EN</option>
                        <option>TU</option>
                        <option>AR</option>
                    </select>
            </div>
            <Link to='/login'className={cl.profile}>
                <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="11.4267" cy="6.5" rx="5.59268" ry="5.5" stroke="black" strokeWidth="1.5"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.5 26C1.5 20.3508 6.16021 15.75 11.9354 15.75C17.7105 15.75 22.3707 20.3508 22.3707 26C22.3707 26.3373 22.3541 26.6709 22.3216 27H23.8282C23.8563 26.6704 23.8707 26.3369 23.8707 26C23.8707 19.4989 18.5152 14.25 11.9354 14.25C5.35551 14.25 0 19.4989 0 26C0 26.3369 0.0143807 26.6704 0.0425672 27H1.54909C1.51662 26.6709 1.5 26.3373 1.5 26Z" fill="black"/>
                    <path d="M0.75 25.5H23.1207V27H0.75V25.5Z" fill="black"/>
                </svg>
            </Link>
            <Link to='/cart' className={cl.cart}>
                <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.871094 1H6.96117C7.14487 1 7.3066 1.12108 7.35835 1.29735L13.3376 21.6673C13.3893 21.8436 13.5511 21.9646 13.7348 21.9646H29.4248" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8.25586 4.068L16.4203 4.13892M31.2283 9.84141L32.7156 4.80828C32.7935 4.54449 32.5972 4.27945 32.3222 4.27706L24.5848 4.20984M31.2283 9.84141L29.5479 15.5283C29.4954 15.706 29.3312 15.8271 29.1459 15.8249L23.6099 15.7584M31.2283 9.84141H9.88773L11.5971 15.7584L17.6389 15.6866M24.5848 4.20984L23.6099 15.7584M24.5848 4.20984L16.4203 4.13892M23.6099 15.7584L17.6389 15.6866M17.6389 15.6866L16.4203 4.13892" stroke="black" strokeWidth="1.5"/>
                    <path d="M16.3117 24.3874C16.3117 25.4751 15.4538 26.328 14.4307 26.328C13.4077 26.328 12.5498 25.4751 12.5498 24.3874C12.5498 23.2997 13.4077 22.4468 14.4307 22.4468C15.4538 22.4468 16.3117 23.2997 16.3117 24.3874Z" stroke="black" strokeWidth="1.5"/>
                    <path d="M31.2877 24.3874C31.2877 25.4231 30.392 26.328 29.2044 26.328C28.0168 26.328 27.1211 25.4231 27.1211 24.3874C27.1211 23.3517 28.0168 22.4468 29.2044 22.4468C30.392 22.4468 31.2877 23.3517 31.2877 24.3874Z" stroke="black" strokeWidth="1.5"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}

export default navbar
