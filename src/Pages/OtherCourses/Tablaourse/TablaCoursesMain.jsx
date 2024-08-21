import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import TablaCourseHeroSection from './TablaCourseHeroSection'
import TablaCourseCard from './TablaCourseCard'
import { useNavigate } from 'react-router'
import Page from '../../../components/page'

const TablaCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])



  return (
    <>

<Page title='Tabla Courses'>
    <TablaCourseHeroSection/>
    <TablaCourseCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default TablaCoursesMain