import {useMemo} from "react";
export const useProductsFilter =  (products, query) => {
    const sortedAndSearchedProducts = useMemo(() => {
        return products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
      }, [query, products])
    return sortedAndSearchedProducts;
}