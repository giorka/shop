import React from 'react'
import brand from './brand.png'
import cl from './YourBrand.module.css'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'

function YourBrand() {
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={brand} color="#2076E4" width="60%">
          <h1>ВАШ БРЕНД</h1>
          <p>Наш современный интернет-магазин предоставляет 
              покупателям и розничным продавцам широкий ассортимент премиальных товаров, обеспечивая непревзойденный опыт покупок и первоклассное обслуживание клиентов.<br/>  
              Но подождите, это еще не все!<br/> 
              Kidsland - это не просто компания по Интернет магазин.<br/> 
              Мы являемся полностью функциональным ресурсом,
              посвященным помощи розничным продавцам
              и оптовикам в индустрии детской одежды обуви
              и аксессуаров на каждом этапе их поискового пути. Будь то поиск конкретных товаров или создание совершенно новой коллекции, наша команда здесь, чтобы сделать это реальностью.
          </p>
        </InfoBanner>
        <div className={cl.info}>
          <div className={cl.info_text}>Что мы предлагаем:</div>
          <div className={cl.list}>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>Ребрендирование коллекций</h2>
              <p>Мы можем изменить логотип товаров которые уже в продаже на нашем сайте под ваш бренд.</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>Производство одежды под вашим брендом</h2>
              <p>Мы можем создать одежду, которая будет иметь ваш собственный бренд и уникальный дизайн. Это означает, что вы получите уникальные модели, которые будут принадлежать именно вам.</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>Эксклюзивные модели</h2>
              <p>Мы поможем подобрать модели, соответствующие вашим требованиям.</p>
            </div>
            <div className={cl.list_item}>
              <div className={cl.decorationBlock}></div>
              <h2>Доставка из Турции</h2>
              <p>Мы возьмем на себя все организационные моменты, связанные с отправкой вашего заказа из Турции прямо на склад маркетплейса в любую точку мира, с учетом всех требований вашего интернет-маркета либо доставим на любой адрес который вы укажете.</p>
            </div>
          </div>
        </div>
      </div>
      <MyFooter/>
    </div>
  )
}

export default YourBrand
