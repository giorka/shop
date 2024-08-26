import React, { useContext, useEffect, useState } from 'react'
import cl from './CatalogIdPage.module.css'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import CatalogService from '../../API/CatalogService'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../../componets/UI/Loader/Loader'
import CartService from '../../API/CartService'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

function CatalogIdPage() {
    const { t, i18n } = useTranslation();
    const [product, setProduct] = useState({prices: {item_price: {}, full_price: {}}, previews: [{image: ""}]})
    const params = useParams()
    const [count, setCount] = useState(0)
    const [curerentImg, setCurrentImg] = useState(product.previews[0])
    
    const [fetchProductById, isLoading, fetchError] = useFetching(async (id) => {
        let response = await CatalogService.getProductById(id)
        let product = response.data
        if(product.previews.length === 0){
            product.previews.push({title: "0-1", image: "https://sublimagia.ru/image/cache/catalog/fut2/dmod11-600x600.jpg"})
        }
        setProduct(product)
        setCount(product.package_count)
        setCurrentImg(product.previews[0])
    })

    useEffect(() => {
        fetchProductById(params.id)
    }, [])

    
    const {isAuth, setIsAuth} = useContext(AuthContext)
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
        const response = await CartService.addProductInCart(localStorage.getItem("auth"), curerentImg.identifier)
    }

  return (
    <div>
        {isLoading ?
        <Loader/> :
        <div className={cl.container}>
              {fetchError && 
                <h1 className={cl.error}>{fetchError}</h1>
              }
              {!fetchError && 
                <div className={cl.product}>
                    <div className={cl.images}>
                        <img className={cl.img} src={curerentImg.image} alt="" />
                        <div className={cl.subImages}>
                                {product.previews.map(preview =>
                                
                                <div className={cl.subImageItem}>
                                    {preview !== curerentImg &&
                                    <img className={cl.subImage} src={preview.image} onClick={() => setCurrentImg(preview)} alt=""/>
                                    }
                                    {preview === curerentImg &&
                                    <img className={cl.subImageActive} src={preview.image} onClick={() => setCurrentImg(preview)} alt=""/>
                                    }
                                    <h2>{preview.title}</h2>
                                </div>
                        )}
                        </div>
                    </div>
                    <div className={cl.info}>
                        <h1 className={cl.title}>{product.title}</h1>
                        <h3 className={cl.price}>{t("catalogIdPage.sizes")} <span>{product.sizes}</span></h3>
                        <div className={cl.prices}>
                            <h3 className={cl.price}>{t("catalogIdPage.price1")} <span>{product.prices.item_price.TRY} {product.currency}</span></h3>
                            <h3 className={cl.price}>{t("catalogIdPage.price2")} <span>{product.prices.full_price.TRY} {product.currency}</span></h3>
                        </div>
                        <h3>QR:</h3>
                        <img className={cl.qr} src={product.qrcode} alt="" />
                        <div className={cl.buttons}>
                                <div className={cl.count}>
                                    {count === 1 &&
                                        <button>-</button>
                                    }
                                    {count !== 1 &&
                                        <button>-</button>
                                    }
                                    <div>{count}</div>
                                    <button>+</button>
                                </div>
                                <button className={cl.cartButton} onClick={() => addProduct()}>{t("catalogIdPage.cart")}</button>
                        </div>
                    </div>
                </div>
                }
        </div>
}
        <MyFooter/>
    </div>
  )
}

export default CatalogIdPage
