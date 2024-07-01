import React from 'react'
import cl from './CatalogFilter.module.css'
import CatalogSelect from '../CatalogSelect/CatalogSelect'

function CatalogFilter() {
  return (
    <form className={cl.filter}>
        <CatalogSelect
                defaultValue="Цвет"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Марка"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Сезон"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Пол"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Тип ткани"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Размер"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Количество"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Тип товара"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
        <CatalogSelect
                defaultValue="Цена"
                options={[
                    {value: 'red', name: 'Красный'},
                    {value: 'blue', name: 'Синий'},
                ]}
            />
          <button className={cl.sumbit}>применить</button>
          <button className={cl.clear}>очистить</button>
          
    </form>
  )
}

export default CatalogFilter
