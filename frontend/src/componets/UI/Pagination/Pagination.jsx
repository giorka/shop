import React from 'react'
import cl from './Pagination.module.css'
import { usePagination } from '../../../hooks/usePagination'
import PaginationRightArrow from '../../icons/PaginationArrows/PaginationRightArrow'
import PaginationLeftArrow from '../../icons/PaginationArrows/PaginationLeftArrow'

function Pagination({totalPages, page, changePage}) {
    let pagesArray = usePagination(totalPages)
    function arrowChange(p) {
        if(p === 0) return
        if(p === pagesArray.length + 1) return
        changePage(p)
    }

    function paginationMap() {
        return (
            <div className={cl.page_numbers}>
                {pagesArray.length < 5 && pagesArray.map(p => {
                    <span className={page === p ? cl.page_current : cl.page} onClick={() => changePage(p)} key={p}>{p}</span>
                })}
                {page < 2 && pagesArray.length > 4 && page < pagesArray[pagesArray.length - 5] && [1, 2, 3, 4].map(p => 
                <span className={page === p ? cl.page_current : cl.page} onClick={() => changePage(p)} key={p}>{p}</span>
                )}
                {page > 1 && page < pagesArray[pagesArray.length - 5] && [page - 1, page, page + 1, page + 2].map(p => 
                    <span className={page === p ? cl.page_current : cl.page} onClick={() => changePage(p)} key={p}>{p}</span>
                )}
                {page > pagesArray[pagesArray.length - 6] && [pagesArray[pagesArray.length - 6], pagesArray[pagesArray.length - 5], pagesArray[pagesArray.length - 4], pagesArray[pagesArray.length - 3]].map(p => 
                    <span className={page === p ? cl.page_current : cl.page} onClick={() => changePage(p)} key={p}>{p}</span>
                )}
                {page < pagesArray[pagesArray.length - 5] &&
                    <span className={cl.page}>...</span>
                }
                <span className={page === pagesArray[pagesArray.length - 2] ? cl.page_current : cl.page} onClick={() => changePage(pagesArray[pagesArray.length - 2])}>{pagesArray[pagesArray.length - 2]}</span>
                <span className={page === pagesArray[pagesArray.length - 1] ? cl.page_current : cl.page} onClick={() => changePage(pagesArray[pagesArray.length - 1])}>{pagesArray[pagesArray.length - 1]}</span>
            </div>
        )
    }
  return (
    <div className={cl.page_wrapper}>
        <span onClick={() => arrowChange(page - 1)}>
            <PaginationLeftArrow/>
        </span>
        {paginationMap()}
        <span onClick={() => arrowChange(page + 1)}>
            <PaginationRightArrow/>
        </span>
      </div>
  )
}

export default Pagination
