import React, { useEffect, useState } from 'react'
import cl from './CatalogFilter.module.css'
import CatalogSelect from '../CatalogSelect/CatalogSelect'
import CatalogService from '../../../API/CatalogService'
import { useTranslation } from 'react-i18next';

function CatalogFilter({filter, setFilter}) {
  const { t, i18n } = useTranslation();
  let [categoryFilters, setCategoryFilters] = useState(new Set());

  useEffect(() => {
    console.log(categoryFilters)
  }, [categoryFilters])

  function updateFilters(checked, categoryFilter) {
    console.log(checked)
    console.log(categoryFilter)
    if (checked)
      setCategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
      setCategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
      });
  }

  function clearValue(e) {
    e.preventDefault();
    setCategoryFilters(new Set())
    setFilter({...filter, sort: ""})
  }

  function filterSubmit(e){
    e.preventDefault();
    setFilter({query: "", sort: categoryFilters})
  }
  return (
    <form className={cl.filter}>
      <h1 className={cl.filter_header}>{t("catalog.category.header")}</h1>
      <div className={cl.catalogInputs}>
        <CatalogSelect
                categoryFilters={categoryFilters}
                onChange={(checked, sort) => updateFilters(checked, sort)}
                defaultValue={t("catalog.category.boys_header")}
                options={[
                  {value: 'BOY_TROUSERS', name: t("catalog.category.trousers")},
                  {value: 'BOY_UNDERWEAR_PAJAMAS', name: t("catalog.category.underwear")},
                  {value: 'BOY_TOP', name: t("catalog.category.top")},
                  {value: 'BOY_SHOES', name: t("catalog.category.shoes")},
                  {value: 'BOY_PAJAMAS', name: t("catalog.category.pajamas")},
                  {value: 'BOY_SHIRT', name: t("catalog.category.shirt")},
                  {value: 'BOY_COSTUME', name: t("catalog.category.costume")},
                  {value: 'BOY_OUTERWEAR', name: t("catalog.category.outerwear")},
                ]}
                />
        <CatalogSelect
                categoryFilters={categoryFilters}
                onChange={(checked, sort) => updateFilters(checked, sort)}
                defaultValue={t("catalog.category.girls_header")}
                options={[
                    {value: 'GIRL_DRESS', name: t("catalog.category.dress")},
                    {value: 'GIRL_TOP', name: t("catalog.category.top")},
                    {value: 'GIRL_SHOES', name: t("catalog.category.shoes")},
                    {value: 'GIRL_SET', name: t("catalog.category.set")},
                    {value: 'GIRL_TROUSERS', name: t("catalog.category.trousers")},
                    {value: 'GIRL_UNDERWEAR', name: t("catalog.category.underwear")},
                    {value: 'GIRL_OVERALLS', name: t("catalog.category.overalls")},
                    {value: 'GIRL_PAJAMAS', name: t("catalog.category.pajamas")},
                    {value: 'GIRL_SHIRT', name: t("catalog.category.shirt")},
                    {value: 'GIRL_OUTERWEAR', name: t("catalog.category.outerwear")},
                ]}
                />
      </div>
      <div className={cl.buttons}>
        <div className={cl.button}>
          <button className={cl.sumbit} onClick={filterSubmit}>{t("catalog.category.sumbit")}</button>
        </div>
        <div className={cl.button}>
          <button className={cl.clear} onClick={clearValue}>{t("catalog.category.clear")}</button>
        </div>
      </div>
          
    </form>
  )
}

export default CatalogFilter
