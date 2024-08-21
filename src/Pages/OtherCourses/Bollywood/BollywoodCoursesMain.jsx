import React, { useEffect } from 'react'

import BhajjanCourseHeroSection from './BollywoodCourseHeroSection'
import BhajjanCoursesCard from './BollywoodCourseCard'
import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import BollywoodCourseHeroSection from './BollywoodCourseHeroSection'
import BollywoodCoursesCard from './BollywoodCourseCard'
import Page from '../../../components/page'

const BollywoodCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>

<Page title='Bollywood/Filmy Courses'>

<BollywoodCourseHeroSection/>
<BollywoodCoursesCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default BollywoodCoursesMain