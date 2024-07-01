import React from 'react'
import InfoBanner from '../../componets/UI/InfoBanner/InfoBanner'
import cl from './Delivery.module.css'
import delivery from './delivery.png'
import MyFooter from '../../componets/UI/MyFooter/MyFooter'

function Delivery() {
  return (
    <div>
      <div className={cl.container}>
        <InfoBanner image={delivery} color="#A682DA" width="54%">
          <h1>ДОСТАВКА</h1>
        </InfoBanner>
        <div className={cl.info}>
          <div className={cl.redLine}/>
          <div className={cl.info_items}>
            <div className={cl.info_item}>
                <div className={cl.redCircle}/>
                <div className={cl.number}>1</div>
                <h2>Доставка по миру</h2>
                <ul>
                  <li>Отправка осуществляется во все страны мира выбранной вами логистической компанией.</li>
                  <li>Если вы ранее не получали груз из Турции, мы предложим вам варианты доставки до вашей страны.</li>
                  <li>Мы также можем отправить груз удобным для вас способом, если у вас есть другие предпочтения.</li>
                  <li>Стоимость доставки оплачивается вами напрямую логистическим компаниям</li>
                </ul>
            </div>

            <div className={cl.info_item}>
                <div className={cl.redCircle}/>
                <div className={cl.number}>2</div>
                <h2>Процесс доставки</h2>
                <ul>
                  <li>Логистическая компания доставляет груз до столицы вашей страны.</li>
                  <li>По прибытию товара в вашу страну, представитель логистической компании связывается с вами, сообщает о прибытии груза и его весе.</li>
                  <li>Затем вы согласовываете доставку до вашего адреса внутри страны</li>
                </ul>
            </div>

            <div className={cl.info_item}>
                <div className={cl.redCircle}/>
                <div className={cl.number}>3</div>
                <h2>Дополнительная информация</h2>
                <ul>
                  <li>Чтобы получить информацию о цене, сроках и возможности отправки брендовых товаров, вы можете связаться с нашим менеджером через WhatsApp.</li>
                  <li>После подготовки товара к отправке, заказ передается в логистическую компанию для дальнейшей доставки в вашу страну.</li>
                </ul>
            </div>
          </div>

        </div>
      </div>
        <div className={cl.sendBack}>
          <div className={cl.sendBack_content}>
            <div className={cl.sendBack_main}>
                <h2>ОБМЕН И ВОЗВРАТ</h2>
                <p>Несмотря на тщательную проверку нашего товара на предмет брака и других недостатков, риск отправки дефектных товаров к вам минимален. Тем не менее, мы ГАРАНТИРУЕМ компенсацию клиенту в случае выявления брака.</p>
            </div>
            <div className={cl.subs}>
              <div className={cl.sub}>
                <div className={cl.whiteCircle}></div>
                <p>Клиенту, желающему сообщить о браке товара, необходимо отправить не менее двух фотографий, детально показывающих дефектные зоны продукта, на наш официальный номер WhatsApp или по электронной почте в течение трех дней после получения товара.</p>
              </div>
              <div className={cl.sub}>
                <div className={cl.whiteCircle}></div>
                <p>После одобрения заявки на брак нашими сотрудниками будет подсчитан ущерб. Клиенту будет предоставлен купон со скидкой в нашем интернет-магазине на сумму бракованного товара. При этом дефектный товар остается у клиента, и нет необходимости в его возврате.</p>
              </div>
            </div>
          </div>
        </div>
        <MyFooter/>
    </div>
  )
}

export default Delivery
