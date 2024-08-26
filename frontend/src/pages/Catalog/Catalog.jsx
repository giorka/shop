import React, { useEffect, useState } from 'react'
import cl from "./Catalog.module.css"
import CatalogService from '../../API/CatalogService'
import CaralogFilter from '../../componets/UI/CatalogFilter/CatalogFilter'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import CatalogList from '../../componets/UI/CatalogList/CatalogList'
import { useFetching } from '../../hooks/useFetching'
import Loader from '../../componets/UI/Loader/Loader'
import { useLocation } from 'react-router-dom'
import { useProductsFilter } from '../../hooks/useProductsFilter'
import { getPagesCount } from '../../utils/pages'
import Pagination from '../../componets/UI/Pagination/Pagination'

function Catalog() {
    const location = useLocation()
    if(!location.state){
      location.state = {search: ""}
      }
    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({sort: '', query: location.state.search || ""})
    const SearchedProducts = useProductsFilter(products, filter.query)
    
    function setProductAndPage(response){
      setProducts(response.data.results)
        const TotalCount = response.data.count
        setTotalPages(getPagesCount(TotalCount, 32))
    }

    const [fetchProducts, isLoading, fetchError] = useFetching(async () => {
        let response = await CatalogService.getProductsByPage(page)
        setProductAndPage(response)
    })

    const [allFetchProducts, allIsLoading, allFetchError] = useFetching(async () => {
      let response = await CatalogService.getAll()
      setProducts(response.data)
  })

    const [sortFetchProducts, sortIsLoading, sortFetchError] = useFetching(async () => {
      const sort = Array.from(filter.sort).join('&')
      console.log(sort)
      let response = await CatalogService.getFilteredProducts(sort, page)
      setProductAndPage(response)
      console.log(response)
  })

    useEffect(() => {
      setFilter({...filter, query: location.state.search || ""})
    }, [location.state])

    useEffect(() => {
      if(filter.query) {
        filter.sort = ""
        allFetchProducts()
      }
      if(filter.sort  && !filter.query) sortFetchProducts()
      if(!filter.sort && !filter.query)fetchProducts()
    },[filter, page])

    useEffect(() => {
      setPage(1)
    }, [filter])

  return (
    <div>
        <div className={cl.container}>
          <CaralogFilter filter={filter} setFilter={setFilter}/>
          {(isLoading || sortIsLoading || allIsLoading) ?
            <Loader/>:
            <div>
              {fetchError && 
                <h1 className={cl.error}>{fetchError}</h1>
              }
              {!fetchError && 
                <div>
                  <CatalogList products={SearchedProducts}/>
                  {totalPages !== 0 && 
                    <Pagination totalPages={totalPages} page={page} changePage={setPage}/>
                  }
                </div>
              }
            </div>
        }
        </div>
        <MyFooter/>
    </div>
  )
}

export default Catalog
