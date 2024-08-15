import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import TablaCourseHeroSection from './TablaCourseHeroSection'
import TablaCourseCard from './TablaCourseCard'
import { useNavigate } from 'react-router'

const TablaCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])



  return (
    <>


    <TablaCourseHeroSection/>
    <TablaCourseCard/>
    <Student_testimonials/>


    </>
  )
}

export default TablaCoursesMain