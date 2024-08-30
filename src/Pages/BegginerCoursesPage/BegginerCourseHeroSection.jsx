
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const BegginerCourseHeroSection = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>

<Box
        sx={{
          padding: isSmall ? "6rem 10% 0rem 10%": "5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Begginer{" "}
              <span style={{ fontSize: "2rem", fontWeight: "500" }}>Level</span>
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
               The beginner course is tailored to the student's age category and prior musical experience. This course is for students of various ages. This course is a great opportunity for those students who are under the age limit and have potential for music.

              </Typography>
              <Button
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
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: isSmall ? "2rem":"4rem" }}>
              <img src="/BegginerImage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}

export default BegginerCourseHeroSection