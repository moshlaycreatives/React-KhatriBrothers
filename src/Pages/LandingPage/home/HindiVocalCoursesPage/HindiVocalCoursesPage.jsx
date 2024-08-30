import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Beginner_course from '../beginner_course/Beginner_course'
import IntermediateHomePage from '../intermediate_course/IntermediateHomePage'
import Advance_course from '../advance_course/Advance_course'
import Page from '../../../../components/Page/Page'
const HindiVocalCoursesPage = () => {

    useEffect(()=>{
window.scrollTo(0,0)
    },[])



  return (
    <>

<Page title = 'Hindustani Vocal'>

<Box
        sx={{
          padding: "8rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Hindustani Vocal Courses
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a gal

              </Typography>
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  mt: 4,
                  color: "#8d1851",
                  borderRadius: "0px",
                  padding: "0.8rem 2rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                Start Learning
              </Button> */}
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: "5rem" }}>
              <img src="/AdvanceImage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>

<br/>
<br/>



<Beginner_course/>

<IntermediateHomePage/>

<Advance_course/>


</Page>

    </>
  )
}

export default HindiVocalCoursesPage