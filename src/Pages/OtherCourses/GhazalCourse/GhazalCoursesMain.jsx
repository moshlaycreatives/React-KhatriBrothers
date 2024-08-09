import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import GhazalCourseHeroSection from './GhazalCourseHeroSection'
import GhazalCourseCard from './GhazalCourseCard'

const GhazalCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>


    <GhazalCourseHeroSection/>
    <GhazalCourseCard/>
    <Student_testimonials/>


    </>
  )
}

export default GhazalCoursesMain;