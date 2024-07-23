import React from 'react'
import "./Home"
import Hero from './hero/Hero'
import Hero_card from './hero-card/Hero_card'
import About from './about/About'
import Advance_course from './advance_course/Advance_course'
import Beginner_course from './beginner_course/Beginner_course'
import Our_mission from './our_mission/Our_mission'
import Student_testimonials from './student_testimonials/Student_testimonials'
import Footer from '../footer/Footer'



function Home() {
  return (
    <>
    <section className=''>
        <Hero/>
        <Hero_card/>
        <About/>
        <Advance_course/>
        <Beginner_course/>
        <Our_mission/>
        <Student_testimonials/>
        {/* <Footer/> */}
    </section>
    </>
  )
}

export default Home