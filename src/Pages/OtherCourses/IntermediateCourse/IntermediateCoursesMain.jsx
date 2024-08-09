import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import IntermediateCourseHeroSection from './IntermediateCourseHeroSection'
import IntermediateCourseCard from './intermediateCourseCard'

const IntermediateCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>


    <IntermediateCourseHeroSection/>
    <IntermediateCourseCard/>
    <Student_testimonials/>


    </>
  )
}

export default IntermediateCoursesMain;