import React, { useEffect } from 'react'

import BhajjanCourseHeroSection from './BhajjanCourseHeroSection'
import BhajjanCoursesCard from './BhajjanCourseCard'
import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import Page from '../../../components/page'

const BhajjanCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>

<Page title='Bhajan courses'>
    <BhajjanCourseHeroSection/>
    <BhajjanCoursesCard/>
    <Student_testimonials/>
    </Page>

    </>
  )
}

export default BhajjanCoursesMain