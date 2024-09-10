import React, { useEffect } from 'react'

import Student_testimonials from '../../LandingPage/home/student_testimonials/Student_testimonials'
import { useSelector } from 'react-redux'
import BollywoodCourseHeroSection from './KeyboardCourseHeroSection'
import BollywoodCoursesCard from './KeyboardCourseCard'
import Page from '../../../components/page'

const KeyboardCoursesMain = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  return (
    <>

<Page title='Keyboard Courses'>

<BollywoodCourseHeroSection/>
<BollywoodCoursesCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default KeyboardCoursesMain