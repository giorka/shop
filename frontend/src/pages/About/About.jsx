import React from 'react'
import cl from "./About.module.css"
import MyFooter from '../../componets/UI/MyFooter/MyFooter'
import { useTranslation } from 'react-i18next';

function About() {
  const { t, i18n } = useTranslation();
  return (
    <div className={cl.about}>
        <div className={cl.conteiner}>
            <h1>{t("about.h1")}</h1>

                <h2>{t("about.h2")}</h2>
                <p>{t("about.text1")}</p>

                <h2>{t("about.h3")}</h2>
                <h3>{t("about.h4")}</h3>
                <p>{t("about.text2")}</p>

                <h3>{t("about.h5")}</h3>
                <p>{t("about.text3")}</p>

                <h3>{t("about.h6")}</h3>
                <p>{t("about.text4")}</p>

                <h3>{t("about.h7")}</h3>
                <p>{t("about.text5")}</p>

                <h2>{t("about.h8")}</h2>
                <p>{t("about.text6")}</p>
                <ul>
                <li>{t("about.li1")}</li>
                <li>{t("about.li2")}</li>
                <li>{t("about.li3")}</li>
                <li>{t("about.li4")}</li>
                <li>{t("about.li5")}</li>
                </ul>

                <h2>{t("about.h9")}</h2>
                <h3>{t("about.h10")}</h3>
                <p>{t("about.text7")}</p>

                <h3>{t("about.h11")}</h3>
                <p>{t("about.text8")}</p>

                <h3>{t("about.h12")}</h3>
                <p>{t("about.text9")}</p>

                <p>{t("about.text10")}</p> 
        </div>
        <MyFooter/>
    </div>
  )
}

export default About
