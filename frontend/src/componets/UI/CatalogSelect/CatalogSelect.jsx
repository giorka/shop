import React from 'react'
import cl from "./CatalogSelect.module.css"

function CatalogSelect({options, defaultValue, onChange, categoryFilters}) {
  function updateCheckBox(e, option) {
    onChange(e.target.checked, e.target.value)
  }
  return (
    <div>
      <h2 className={cl.inputs_header}>{defaultValue}</h2>
            {options.map(option =>
                <div className={cl.checkbox}>
                  <input id={option.value} className={cl.checkbox_input} type="checkbox" key={option.value} value={option.value} onChange={(e) => updateCheckBox(e, option)}/>
                  <label for={option.value} className={cl.checkbox_text}>
                    {option.name}
                  </label>
                </div>
            )}
    </div>
  )
}

export default CatalogSelect
