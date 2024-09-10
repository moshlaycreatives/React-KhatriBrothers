import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import BollywoodCourseHeroSection from './GuitarCourseHeroSection'
import BollywoodCoursesCard from './GuitarCourseCard'
import Page from '../../../components/page'

const GuitarCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>

<Page title='Guitar Courses'>

<BollywoodCourseHeroSection/>
<BollywoodCoursesCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default GuitarCoursesMain