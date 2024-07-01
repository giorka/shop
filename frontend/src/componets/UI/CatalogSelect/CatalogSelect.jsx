import React from 'react'
import cl from "./CatalogSelect.module.css"

function CatalogSelect({options, defaultValue}) {
  return (
    <select className={cl.select}>
            <option value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
    </select>
  )
}

export default CatalogSelect
