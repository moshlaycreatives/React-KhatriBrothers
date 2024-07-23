import React from 'react'
import "./Hero_card.css"
import Hero_card_box from './Hero_card_box';
import CountUp from 'react-countup';


function Hero_card() {
  return (
    <>
    <section className='hero-card-section'>
    <Hero_card_box icone={<i className="fa-solid fa-globe  home-card-icone"></i>} title={<CountUp className='home-card-counter' start={0} end={45}/>} sub_title="Total Countries"/>
    <Hero_card_box icone={<i className="fa-solid fa-users home-card-icone"></i>} title={<CountUp className='home-card-counter' start={0} end={1200}/>} sub_title="Total Students"/>
    <Hero_card_box icone={<i className="fa-regular fa-face-smile home-card-icone"></i>} title={<CountUp className='home-card-counter' start={0} end={1000}/>} sub_title="Happy Students"/>
    <Hero_card_box icone={<i className="fa-solid fa-globe home-card-icone"></i>} title={<CountUp className='home-card-counter' start={0} end={2500}/>} sub_title="online classes"/>
    </section>
    </>
  )
}

export default Hero_card;




