import React, { useEffect, useState } from 'react'
import CatalogItem from '../../componets/UI/CatalogItem/CatalogItem'
import cl from "./Catalog.module.css"
import CatalogService from '../../API/CatalogService'
import CaralogFilter from '../../componets/UI/CatalogFilter/CatalogFilter'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import CatalogList from '../../componets/UI/CatalogList/CatalogList'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../../componets/UI/Loader/Loader'

function Catalog() {
    const [products, setProducts] = useState([])
    const [fetchProducts, isLoading, error] = useFetching(async (id) => {
        let response = await CatalogService.getAll()
        setProducts(response.data)
        console.log(response)
        console.log(products)
    })

    useEffect(() => {
        fetchProducts()
        console.log(products)
    },[])

  return (
    <div>
        <div className={cl.container}>
          <CaralogFilter/>
          {isLoading ?
            <Loader/>:
            <CatalogList products={products}/>
        }
        </div>
        <MyFooter/>
    </div>
  )
}

export default Catalog
