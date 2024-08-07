import React, { useEffect } from 'react'

import BhajjanCourseHeroSection from './BhajjanCourseHeroSection'
import BhajjanCoursesCard from './BhajjanCourseCard'
import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'

const BhajjanCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>


    <BhajjanCourseHeroSection/>
    <BhajjanCoursesCard/>
    <Student_testimonials/>


    </>
  )
}

export default BhajjanCoursesMain