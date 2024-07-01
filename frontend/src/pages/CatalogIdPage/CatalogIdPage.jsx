import React, { useEffect, useState } from 'react'
import cl from './CatalogIdPage.module.css'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import CatalogService from '../../API/CatalogService'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../../componets/UI/Loader/Loader'

function CatalogIdPage() {
    const [product, setProduct] = useState({prices: {item_price: {}, full_price: {}}, previews: [{image: ""}]})
    const params = useParams()
    const [count, setCount] = useState(0)
    const [curerentImg, setCurrentImg] = useState(product.previews[0].image)
    
    const [fetchProductById, isLoading, error] = useFetching(async (id) => {
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

    console.log(product)
    

  return (
    <div>
        {isLoading ?
        <Loader/> :
        <div className={cl.container}>
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
                    <div className={cl.prices}>
                        <h3 className={cl.price}>Цена (шт): <span>{product.prices.item_price.TRY} {product.currency}</span></h3>
                        <h3 className={cl.price}>Цена (упаковка): <span>{product.prices.full_price.TRY} {product.currency}</span></h3>
                    </div>
                    <h3 className={cl.price}>Количество штук в серии: <span>12</span></h3>
                    <h3>QR:</h3>
                    <img className={cl.qr} src={product.qrcode} alt="" />
                    <div className={cl.buttons}>
                            <div className={cl.count}>
                                {count === 1 &&
                                    <button>-</button>
                                }
                                {count !== 1 &&
                                    <button onClick={() => setCount(count - 1)}>-</button>
                                 }
                                <div>{count}</div>
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div>
                            <button className={cl.cartButton}>в корзину</button>
                    </div>
                    <div className={cl.table}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>марка</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>сезон</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>пол</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>тип ткани</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>размер</th>
                                    <th>{product.sizes}</th>
                                </tr>
                                <tr>
                                    <th>количество пакетов</th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
}
        <MyFooter/>
    </div>
  )
}

export default CatalogIdPage
