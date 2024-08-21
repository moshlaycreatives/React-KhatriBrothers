import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import GhazalCourseHeroSection from './GhazalCourseHeroSection'
import GhazalCourseCard from './GhazalCourseCard'
import Page from '../../../components/page'

const GhazalCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>
<Page title='Ghazal Courses'>

    <GhazalCourseHeroSection/>
    <GhazalCourseCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default GhazalCoursesMain;