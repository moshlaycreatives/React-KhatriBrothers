import React from 'react'
import "./Beginner_course.css"
import Beginner_course_card from './Beginner.course-card.jsx'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import BegginerCourseCard from '../../../BegginerCoursesPage/BegginerCourseCard.jsx'

function Beginner_course() {
 const theme = useTheme()


 const advanceData = [
  {
      image:'advancecourse.png',
      desc:'Lorem ipsum dolor sit amet.',
  },
  {
      image:'advancecourse.png',
      desc:'Lorem ipsum dolor sit amet.',
  },
  {
    image:'advancecourse.png',
    desc:'Lorem ipsum dolor sit amet.',
},
{
    image:'advancecourse.png',
    desc:'Lorem ipsum dolor sit amet.',
},
]
  return (


    <>




<Box sx={{textAlign:'center'}}>


<Typography sx={{color:theme.palette.primary.main, fontWeight:700, fontSize:'2rem'}}>Begginer Level Courses</Typography>
<Typography>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio maiores minus velit saepe.
</Typography>



</Box>


<Box sx={{ padding: "3rem 10%" }}>
        <Grid container spacing={3}>


{advanceData.map((val, ind)=>(
    <Grid key={ind} item lg={3} md={3} sm={12} xs={12}>
            <Box>
              <img src={val.image} alt="alt image" width={"100%"} />
            </Box>
            <Box>
              <Typography sx={{ color: "grey" }}>
{val.desc}
              </Typography>
              <br/>
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: "none",
                borderRadius:'0px',
                fontSize:'1.1rem'
                }}
              >
                Learn More &rarr;
              </Button>
            </Box>
          </Grid>
))}

        </Grid>
      </Box>


    {/* <div className='beginner-course-main-div'>

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
    </div> */}
    </>

  )
}

export default Beginner_course