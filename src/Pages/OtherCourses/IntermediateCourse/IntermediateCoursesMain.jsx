import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import IntermediateCourseHeroSection from './IntermediateCourseHeroSection'
import IntermediateCourseCard from './intermediateCourseCard'
import Page from '../../../components/page/page'

const IntermediateCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>
<Page title='Intermediate Courses'>

    <IntermediateCourseHeroSection/>
    <IntermediateCourseCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default IntermediateCoursesMain;