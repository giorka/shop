import React from 'react'
import CatalogItem from '../CatalogItem/CatalogItem'
import cl from './CatalogList.module.css'

function CatalogList({products}) {
  return (
    <div className={cl.catalogList}>
        {products.map(product =>
            <CatalogItem product={product} key={product.identifier}/>
        )}
    </div>
  )
}

export default CatalogList
