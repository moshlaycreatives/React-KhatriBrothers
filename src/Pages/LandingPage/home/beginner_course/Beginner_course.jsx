import React from 'react'
import "./Beginner_course.css"
import Beginner_course_card from './Beginner.course-card.jsx'
import { Box, Typography, useTheme } from '@mui/material'
import BegginerCourseCard from '../../../BegginerCoursesPage/BegginerCourseCard.jsx'

function Beginner_course() {
 const theme = useTheme()
  return (


    <>




<Box sx={{textAlign:'center'}}>


<Typography sx={{color:theme.palette.primary.main, fontWeight:700, fontSize:'2rem'}}>Begginer Level Courses</Typography>
<Typography>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio maiores minus velit saepe.
</Typography>



</Box>


<BegginerCourseCard/>


    <div className='beginner-course-main-div'>

        <div className='beginner-image-div'>
            <Beginner_course_card image="./assets/beginner_course/beginner_1.png"
            description=" lorem lorem lorem loem "/>
            <Beginner_course_card image="./assets/beginner_course/beginner_2.png"
            description=" lorem lorem lorem loem "/>
            <Beginner_course_card image="./assets/beginner_course/beginner_3.png"
            description=" lorem lorem lorem loem "/>
             <Beginner_course_card image="./assets/beginner_course/beginner_4.png"
            description=" lorem lorem lorem loem "/>
        </div>
    </div>
    </>

  )
}

export default Beginner_course