import React from 'react'
import Page from '../../components/page/page'
import BegginerCourseHeroSection from './BegginerCourseHeroSection'
import BegginerCoursesCard from './BegginerCourseCard'
import Student_testimonials from '../LandingPage/home/student_testimonials/Student_testimonials'

const BegginerCoursesMain = () => {
  return (
    <>

<Page title='Begginer courses'>
    <BegginerCourseHeroSection/>
    <BegginerCoursesCard/>
    <Student_testimonials/>
</Page>

    </>
  )
}

export default BegginerCoursesMain