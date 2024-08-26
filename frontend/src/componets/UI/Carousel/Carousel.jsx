import React, { Children, useState } from 'react'
import cl from './Carousel.module.css'
import Slider from 'react-slick';

function Carousel({children}) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div>
            <Slider {...settings}>
                    {children}
            </Slider>
    </div>
  )
}

export default Carousel
