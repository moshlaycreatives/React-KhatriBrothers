import React from 'react'
import "./Hero_card.css"


function Hero_card_box({icone,sub_title, title}) {

  console.log(title, 'gggggg')
  return (
    <div className='hero_card_box'>
      <h2>{icone}</h2>
      <h1 style={{fontSize:'3rem'}}>
        {title}+

      

      </h1>
      <p>{sub_title}</p>
    </div>
  )
}

export default Hero_card_box