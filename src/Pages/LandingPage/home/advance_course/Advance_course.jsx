import React from 'react'
import "./Advance_course.css"
import Advance_course_card from './Advance_course_card'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import AdvanceCoursesCard from '../../../AdvanceCoursePage/AdvanceCoursesCard'

function Advance_course() {
  const advanceData = [
    {
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },
    {
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },{
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },
  ]
  const theme = useTheme()

  return (

    <>



<Box sx={{textAlign:'center'}}>


<Typography sx={{color:theme.palette.primary.main, fontWeight:700, fontSize:'2rem'}}>Advance Level Courses</Typography>
<Typography>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio maiores minus velit saepe.
</Typography>



</Box>
<Box sx={{padding:'2rem 10%'}}>


<Grid container spacing={4}>


{advanceData.map((val, ind)=>(
    <Grid key={ind} item lg={4} md={4} sm={12} xs={12}>
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

{/* <AdvanceCoursesCard/> */}


</>
  )
}

export default Advance_course