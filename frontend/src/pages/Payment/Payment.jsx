import React from 'react'
import payment from './payment.png'
import cl from './Payment.module.css'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'

function Payment() {
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={payment} color="#2076E4" width="54%">
          <h1>ОПЛАТА</h1>
        </InfoBanner>
        <div className={cl.info}>
          <h2>Мы принимаем следующие способы оплаты:</h2>
          <div className={cl.info_items}>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>Международные системы денежных переводов, такие как Western Union, Corona Pay, Contact, MoneyGram, Ria и другие. Этот метод позволяет производить оплату онлайн через приложения указанных систем.</p>
              </div>
            </div>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>Перевод оплаты на наш банковский счет «Wise» в вашей стране. Мы имеем счет в Wise, что обеспечивает удобство для наших клиентов при осуществлении переводов из разных стран без лишних сложностей.</p>
              </div>
            </div>
            <div className={cl.info_item}>
              <div className={cl.info_item_content}>
                <div className={cl.redCircle}></div>
                <p>После подтверждения вашей корзины вы сможете выбрать удобный для вас метод оплаты. Наш менеджер свяжется с вами для окончательного оформления заказа и ответит на все ваши вопросы</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <MyFooter/>
    </div>
  )
}

export default Payment
