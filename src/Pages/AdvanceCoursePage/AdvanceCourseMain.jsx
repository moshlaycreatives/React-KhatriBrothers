import React from 'react'
import AdvanceCourseHeroSection from './AdvanceCourseHeroSection'
import AdvanceCoursesCard from './AdvanceCoursesCard'
import Student_testimonials from '../LandingPage/home/student_testimonials/Student_testimonials'
import Page from '../../components/page/page'

const AdvanceCourseMain = () => {
  return (
    <>
<Page title='Advance Courses'>

<AdvanceCourseHeroSection/>

<AdvanceCoursesCard/>

<Student_testimonials/>
</Page>

    </>
  )
}

export default AdvanceCourseMain