import React, { useContext, useEffect, useState } from 'react'
import cl from "./Main.module.css"
import mainBanner1 from './mainBanner1.png'
import mainBanner2 from './mainBanner2.png'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import { Link } from 'react-router-dom'
import Carousel from '../../componets/UI/Carousel/Carousel'
import CatalogService from '../../API/CatalogService'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../../componets/UI/Loader/Loader'
import CatalogList from '../../componets/UI/CatalogList/CatalogList'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import StarIcon from '../../componets/icons/StarIcon'
import Slider from 'react-slick'
import CategoryBanners from '../../componets/UI/CategoryBanners/CategoryBanners'
import PromoBanners from '../../componets/UI/PromoBanners/PromoBanners'

function Main() {
    const { t, i18n } = useTranslation();
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [fetchProducts, isLoading] = useFetching(async (id) => {
        let response = await CatalogService.getNewProducts()
        setProducts(response.data.results)
    })
    useEffect(() => {
        fetchProducts()
    },[])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2500,
                settings: {
                  slidesToShow: 5,
                },
              },
              {
                breakpoint: 2100,
                settings: {
                  slidesToShow: 4,
                },
              },
            {
              breakpoint: 1800,
              settings: {
                slidesToShow: 3,
              },
            },
            {
                breakpoint: 1350,
                settings: {
                  slidesToShow: 2,
                },
              },
        ]
      };
  return ( 
    <div className={cl.main}>
        <div className={cl.conteiner}>
            <Carousel>
                <InfoBanner image={mainBanner1} color="#2076E4" width="54%">
                    <div className={cl.mainBanner}>
                        {(i18n.language === "en" || i18n.language === "ar")&&
                            <div>
                                <h1 className={cl.mainH}>{t("main.banners.banner1.header1")}</h1>
                                <h1 className={cl.clothes}>{t("main.banners.banner1.header2")}</h1>
                            </div>
                        }
                        {(i18n.language === "ru") &&
                            <div>
                                <h1 className={cl.mainH_ru}>{t("main.banners.banner1.header1")}</h1>
                                <h1 className={cl.clothes_ru}>{t("main.banners.banner1.header2")}</h1>
                            </div>
                        }
                        <p className={cl.mainParagraph}>{t("main.banners.banner1.text")}</p>
                        <div className={cl.shopNow1}>
                            <Link className={cl.link} to="/catalog">{t("main.banners.button")}</Link>
                        </div>
                    </div>
                </InfoBanner>
                <InfoBanner image={mainBanner2} color="#A682DA" width="54%">
                    <div className={cl.mainBanner}>
                        <h1>{t("main.banners.banner2.header1")}</h1>
                        <p className={cl.mainParagraph}>{t("main.banners.banner2.text")}</p>
                        <div className={cl.shopNow2}>
                            <Link className={cl.link} to="/catalog">{t("main.banners.button")}</Link>
                        </div>
                    </div>
                </InfoBanner>
            </Carousel>
            <div className={cl.cards_block}>
                <div className={cl.cards}>
                    <div className={cl.card}>
                        <div className={cl.card_icon}>
                            <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M66 1L46 21.5" stroke="black" stroke-width="2"/>
                                <path d="M31.5 7.5H60V34L28 65L2 39.5L31.5 7.5Z" stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                        <h2>{t("main.cards.card1")}</h2>
                    </div>
                    <div className={cl.card}>
                        <div className={cl.card_icon}>
                            <svg width="67" height="66" viewBox="0 0 67 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.3388 27.4127H20.0807C18.5323 27.4127 15.4355 28.2254 15.4355 31.4762C15.4355 35.5396 18.5323 37.5714 22.1452 36.0476C25.0355 34.8285 25.7581 33 25.7581 31.9841" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M38.1456 27.4127H46.4037C47.9521 27.4127 51.0488 28.2254 51.0488 31.4762C51.0488 35.5396 47.9521 37.5714 44.3392 36.0476C41.4488 34.8285 39.1779 31.4762 43.3069 27.4127" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M19.5645 36.5555H46.9193" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M9.24219 46.7143C14.4035 45.3598 25.3454 47.1206 27.8228 65" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M57.7578 46.7143C52.5965 45.3598 41.6546 47.1206 39.1772 65" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M24.7256 54.3349C27.8715 52.3097 35.579 49.5756 41.2417 54.8413" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M21.629 1.50794C20.7688 6.41799 21.8354 16.3397 32.9838 16.746C44.1322 17.1524 46.2312 6.75661 45.8871 1.50794M45.8871 1.50794L64.6784 4.91454C65.1541 5.00079 65.5 5.41503 65.5 5.89851V21.6253C65.5 22.2551 64.9248 22.7281 64.3069 22.6064L58.9512 21.5523C58.3332 21.4307 57.7581 21.9037 57.7581 22.5335V46.7143C57.9301 52.1323 54.5581 63.3746 39.6935 65H27.3065C21.629 65 10.0677 61.3429 9.24194 46.7143V22.1058C9.24194 21.4504 8.62202 20.9722 7.9881 21.1386L2.75384 22.5122C2.11991 22.6786 1.5 22.2004 1.5 21.545V5.87755C1.5 5.40346 1.83289 4.99452 2.29712 4.89834L20.5748 1.11148C20.9099 1.04206 21.2546 1.14997 21.5034 1.38487C25.408 5.07039 35.1178 9.75112 45.8871 1.50794Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <h2>{t("main.cards.card2")}</h2>
                    </div>
                    <div className={cl.card}>
                        <div className={cl.card_icon}>
                            <svg width="81" height="64" viewBox="0 0 81 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H16.0679C16.5094 1 16.8987 1.28959 17.0256 1.71249L31.8015 50.9346C31.9285 51.3575 32.3177 51.6471 32.7593 51.6471H71.5448" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                <path d="M19.2451 8.41174L39.4163 8.58308M76.0008 22.3593L79.6734 10.2062C79.8664 9.56758 79.3918 8.92265 78.7247 8.91698L59.5874 8.75442M76.0008 22.3593L71.8473 36.104C71.7185 36.5302 71.3235 36.8199 70.8783 36.8147L57.1789 36.6537M76.0008 22.3593H23.2768L27.5 36.6537L42.4269 36.4803M59.5874 8.75442L57.1789 36.6537M59.5874 8.75442L39.4163 8.58308M57.1789 36.6537L42.4269 36.4803M42.4269 36.4803L39.4163 8.58308" stroke="black" stroke-width="2"/>
                                <circle cx="34.5" cy="57.5" r="5.5" stroke="black" stroke-width="2"/>
                                <path d="M77 57.5C77 60.4691 74.3848 63 71 63C67.6152 63 65 60.4691 65 57.5C65 54.5309 67.6152 52 71 52C74.3848 52 77 54.5309 77 57.5Z" stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                        <h2>{t("main.cards.card3")}</h2>
                    </div>
                    <div className={cl.card}>
                        <div className={cl.card_icon}>
                            <svg width="64" height="54" viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M51.975 20.9137L55.0872 24.9789L55.5379 25.5676L56.2322 25.3074L61.0027 23.5193L58.1462 27.8732L57.757 28.4664L58.1883 29.0296L61.3516 33.1616L56.4593 31.7343L55.749 31.5271L55.3431 32.1457L52.5306 36.4325L52.345 31.2483L52.3192 30.5264L51.6257 30.3241L46.6898 28.884L51.5125 27.0764L52.1866 26.8237L52.1609 26.1042L51.975 20.9137ZM35.9342 48.6648C37.8301 48.6648 39.6679 48.4079 41.4157 47.9264C37.2029 51.117 31.9956 53 26.3616 53C12.3772 53 1 41.3821 1 27C1 12.6179 12.3772 1 26.3616 1C32.2735 1 37.716 3.0735 42.0322 6.5556C40.102 5.95819 38.0546 5.63687 35.9342 5.63687C24.2978 5.63687 14.9053 15.2917 14.9053 27.1508C14.9053 39.01 24.2978 48.6648 35.9342 48.6648Z" stroke="black" stroke-width="2"/>
                            </svg>
                        </div>
                        <h2>{t("main.cards.card4")}</h2>
                    </div>
                </div>
                    <div className={cl.cards_info}>
                        <div>
                            <h2>{t("main.cards.card5.styles")}</h2>
                            <h2>{t("main.cards.card5.brands")}</h2>
                        </div>
                        {!isAuth &&
                            <Link className={cl.signUp} to='/login'>
                                {t("main.cards.card5.login")}
                            </Link>
                        }
                    </div>
            </div>
            <CategoryBanners/>
            <div className={cl.newArrivals}>
                <h1>{t("main.info_text")}</h1>
                {isLoading ?
                    <Loader/>:
                    <CatalogList products={products}/>
                }
            </div>
            <PromoBanners/>
            <div className={cl.aboutUs}>
                <div className={cl.aboutUs_text}>
                    <div className={cl.aboutUs_header}>
                        <h1>{t("main.aboutUs.header.part1")}</h1>
                        <h2>{t("main.aboutUs.header.part2")}</h2>
                    </div>
                    <div className={cl.aboutUs_block}>
                        <p>{t("main.aboutUs.text.part1")}</p>
                        <p>{t("main.aboutUs.text.part2")}</p>
                        <p>{t("main.aboutUs.text.part3")}</p>
                        <p>{t("main.aboutUs.text.part4")}</p>
                    </div>
                </div>
                
                <div className={cl.aboutUs_movie}></div>
            </div>    
            <div className={cl.reviews}>
                <h2 className={cl.reviews_header}>{t("main.reviews.header")}</h2>
                <Slider {...settings}>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review1.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review1.text")}</p>
                        </div>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review2.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review2.text")}</p>
                        </div>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review3.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review3.text")}</p>
                        </div>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review4.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review4.text")}</p>
                        </div>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review5.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review5.text")}</p>
                        </div>
                        <div className={cl.review}>
                            <h2 className={cl.review_name}>{t("main.reviews.review6.name")}</h2>
                            {[1,2,3,4,5].map(() => 
                                <StarIcon/>
                            )}
                            <p className={cl.review_text}>{t("main.reviews.review6.text")}</p>
                        </div>
                        </Slider>
            </div>
        </div>
        <MyFooter/>
    </div>
  )
}

export default Main
