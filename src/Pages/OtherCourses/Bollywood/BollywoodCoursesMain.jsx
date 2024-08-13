import React, { useEffect } from 'react'

import BhajjanCourseHeroSection from './BollywoodCourseHeroSection'
import BhajjanCoursesCard from './BollywoodCourseCard'
import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import BollywoodCourseHeroSection from './BollywoodCourseHeroSection'
import BollywoodCoursesCard from './BollywoodCourseCard'

const BollywoodCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>


<BollywoodCourseHeroSection/>
<BollywoodCoursesCard/>
    <Student_testimonials/>


    </>
  )
}

export default BollywoodCoursesMain