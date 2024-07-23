import React from 'react'
import "./Advance_course.css"
import Advance_course_card from './Advance_course_card'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import AdvanceCoursesCard from '../../../AdvanceCoursePage/AdvanceCoursesCard'

function Advance_course() {

  const theme = useTheme()

  return (

    <>



<Box sx={{textAlign:'center'}}>


<Typography sx={{color:theme.palette.primary.main, fontWeight:700, fontSize:'2rem'}}>Advance Level Courses</Typography>
<Typography>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio maiores minus velit saepe.
</Typography>



</Box>


<AdvanceCoursesCard/>


</>
  )
}

export default Advance_course