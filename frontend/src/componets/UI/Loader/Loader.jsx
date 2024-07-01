import React from 'react'
import cl from './Loader.module.css'

function Loader() {
  return (
    <div className={cl.loaderConteiner}>
      <span className={cl.loader}></span>
    </div>
  )
}

export default Loader
