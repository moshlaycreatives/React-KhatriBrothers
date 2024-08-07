import React, { useEffect } from 'react'
import "./Home"
import Hero from './hero/Hero'
import Hero_card from './hero-card/Hero_card'
import About from './about/About'
import Advance_course from './advance_course/Advance_course'
import Beginner_course from './beginner_course/Beginner_course'
import Our_mission from './our_mission/Our_mission'
import Student_testimonials from './student_testimonials/Student_testimonials'
import Footer from '../footer/Footer'
import HomeBlogs from './HomeBlogs'
import { getAdvanceCourse, getAllCourse, getBeginnerCourse } from '../../../store/actions/courseActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'



function Home() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


const navigate = useNavigate()
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllCourse())
}, []);


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
        <HomeBlogs/>
        {/* <Footer/> */}
    </section>
    </>
  )
}

export default Home