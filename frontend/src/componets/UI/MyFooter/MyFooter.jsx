import React from 'react'
import cl from './MyFooter.module.css'
import { Link } from 'react-router-dom'
import korona from './img/koronapay.png'
import western from './img/westernunion.png'
import moneygram from './img/moneygram.png'
import moneytransfer from './img/moneytransfer.png'
import wise from './img/wise.png'
import visa from './img/visa.png'
import mastercard from './img/mastercard.png'

function MyFooter() {
  return (
    <div className={cl.footer}>
      <div className={cl.footer_conteiner}>
        <div className={cl.links}>
            <div className={cl.links_column}>
                <Link className={cl.links_item} to='/brand'>Ваш бренд</Link>
                <Link className={cl.links_item} to='/delivery'>Доставка</Link>
                <Link className={cl.links_item} to='/payment'>Оплата</Link>
            </div>
            <div>
                <Link className={cl.links_item} to='/catalog'>Каталог</Link>
                <div className={cl.links_item}>О нас</div>
            </div>
            <div>
                <div className={cl.links_item}>Duaçınarı, 1. Kurtul Sk. No:46 Kat 1, 16270 Yıldırım/Bursa</div>
                <div className={cl.links_item}>E-mail: <span>kidslandstore1@gmail.com</span></div>
                <div className={cl.links_contact}>
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 2C19.6362 2 13.5275 4.50774 9.03125 8.96719C4.53036 13.4284 2.00125 19.4787 2 25.7877C2 32.094 4.53125 38.1487 9.03125 42.6082C13.5275 47.0676 19.6362 49.5754 26 49.5754C32.3638 49.5754 38.4725 47.0676 42.9688 42.6082C47.4688 38.1487 50 32.094 50 25.7877C50 19.4813 47.4688 13.4266 42.9688 8.96719C38.4725 4.50774 32.3638 2 26 2Z" fill="url(#paint0_linear_113_352)" stroke="white" strokeWidth="3.84"/>
                        <path d="M12.432 25.489C19.4295 22.468 24.0945 20.4761 26.427 19.5139C33.0945 16.766 34.4783 16.2888 35.382 16.2726C35.5808 16.2694 36.0233 16.3181 36.312 16.5495C36.552 16.7446 36.6195 17.0085 36.6533 17.1938C36.6833 17.3789 36.7245 17.8008 36.6908 18.1301C36.3308 21.8915 34.767 31.0193 33.972 35.2323C33.6383 37.0149 32.9745 37.6126 32.3333 37.6709C30.9383 37.798 29.8808 36.7581 28.5308 35.8813C26.4195 34.5086 25.227 33.6545 23.1758 32.3153C20.8058 30.7677 22.3433 29.9169 23.6933 28.5268C24.0458 28.1629 30.1883 22.6267 30.3045 22.1246C30.3195 22.0617 30.3345 21.8276 30.192 21.7042C30.0533 21.5804 29.847 21.6228 29.697 21.6562C29.4833 21.7038 26.112 23.9146 19.572 28.2882C18.6158 28.9401 17.7495 29.2579 16.9695 29.2412C16.1145 29.2229 14.4645 28.7609 13.2383 28.3662C11.7383 27.8819 10.542 27.6258 10.647 26.8033C10.6995 26.3751 11.2958 25.9369 12.432 25.489Z" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_113_352" x1="2402" y1="2" x2="2402" y2="4759.54" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2AABEE"/>
                        <stop offset="1" stopColor="#229ED9"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_113_355)">
                        <path d="M1.06836 24.8937C1.06719 29.1275 2.17344 33.2615 4.27695 36.9053L0.867188 49.3549L13.6078 46.0142C17.1317 47.9326 21.08 48.9378 25.0922 48.9381H25.1027C38.3479 48.9381 49.1297 38.1601 49.1353 24.9127C49.1379 18.4933 46.6402 12.457 42.1023 7.9156C37.5652 3.37458 31.5311 0.872437 25.1018 0.869507C11.8551 0.869507 1.07402 11.6469 1.06855 24.8937" fill="url(#paint0_linear_113_355)"/>
                        <path d="M0.208984 24.8859C0.207617 29.2721 1.35352 33.5539 3.53203 37.3281L0 50.224L13.1975 46.7637C16.8338 48.7463 20.9279 49.7916 25.0939 49.7932H25.1047C38.825 49.7932 49.9941 38.6275 50 24.9059C50.0023 18.2559 47.4148 12.0025 42.7148 7.29844C38.0143 2.59492 31.7643 0.00273438 25.1047 0C11.382 0 0.214453 11.1641 0.208984 24.8859ZM8.06855 36.6781L7.57578 35.8959C5.5043 32.6021 4.41094 28.7959 4.4125 24.8875C4.4168 13.4822 13.6988 4.20312 25.1125 4.20312C30.6398 4.20547 35.8344 6.36016 39.7414 10.2695C43.6482 14.1793 45.798 19.3766 45.7967 24.9043C45.7916 36.3096 36.5094 45.5898 25.1047 45.5898H25.0965C21.383 45.5879 17.741 44.5906 14.5648 42.7061L13.809 42.2578L5.97734 44.3111L8.06855 36.6781Z" fill="url(#paint1_linear_113_355)"/>
                        <path d="M18.8828 14.482C18.4168 13.4462 17.9264 13.4253 17.4832 13.4072C17.1203 13.3915 16.7055 13.3927 16.291 13.3927C15.8762 13.3927 15.2021 13.5488 14.6324 14.1708C14.0621 14.7935 12.4551 16.2982 12.4551 19.3585C12.4551 22.4191 14.6842 25.3767 14.9949 25.7921C15.3061 26.2068 19.2982 32.688 25.6209 35.1814C30.8756 37.2535 31.9449 36.8414 33.0854 36.7374C34.226 36.6339 36.7658 35.2332 37.284 33.7806C37.8025 32.3283 37.8025 31.0833 37.6471 30.8232C37.4916 30.564 37.0768 30.4083 36.4547 30.0974C35.8324 29.7863 32.7742 28.2814 32.2041 28.0738C31.6338 27.8664 31.2191 27.7628 30.8043 28.3857C30.3895 29.0076 29.1982 30.4083 28.8352 30.8232C28.4725 31.239 28.1094 31.2908 27.4875 30.9796C26.865 30.6675 24.8617 30.0115 22.485 27.8925C20.6357 26.2437 19.3873 24.2076 19.0244 23.5847C18.6615 22.9628 18.9855 22.6257 19.2975 22.3158C19.577 22.0371 19.9197 21.5894 20.2311 21.2263C20.5412 20.863 20.6447 20.6039 20.8521 20.189C21.0598 19.7738 20.9559 19.4105 20.8006 19.0994C20.6447 18.7882 19.4359 15.7119 18.8828 14.482Z" fill="white"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_113_355" x1="2414.28" y1="4849.41" x2="2414.28" y2="0.869507" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1FAF38"/>
                        <stop offset="1" stopColor="#60D669"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_113_355" x1="2500" y1="5022.4" x2="2500" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F9F9F9"/>
                        <stop offset="1" stopColor="white"/>
                        </linearGradient>
                        <clipPath id="clip0_113_355">
                        <rect width="50" height="50.3906" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg>
                    </div>
            </div>
        </div>
        <div className={cl.cards}>
            <div className={cl.cards_item}><img className={cl.korona} src={korona} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.western} src={western} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.moneygram} src={moneygram} alt=''/></div>
            <div className={cl.cards_item} ><img className={cl.moneytransfer} src={moneytransfer} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.wise} src={wise} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.visa} src={visa} alt=''/></div>
            <div className={cl.cards_item}><img className={cl.mastercard} src={mastercard} alt=''/></div>
        </div>
      </div>
    </div>
  )
}

export default MyFooter
