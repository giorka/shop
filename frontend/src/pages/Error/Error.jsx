import React from 'react'
import cl from './Error.module.css'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { useTranslation } from 'react-i18next';

function Error() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={cl.error}>
        {t("error.text")}
      </div>
      <MyFooter/>
    </div>
  )
}

export default Error
