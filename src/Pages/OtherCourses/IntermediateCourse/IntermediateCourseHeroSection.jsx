
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const IntermediateCourseHeroSection = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>

<Box
        sx={{
          padding:isSmall ? "6rem 10% 0rem 10%" :"5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Intermediate
              {/* <span style={{ fontSize: "2rem", fontWeight: "500" }}>Level</span> */}
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Build upon your foundation. This course is perfect for students who have completed the beginner level and are ready to explore more to scale the skill. Develop your vocal skills and gain a deeper understanding of Hindustani classical music.

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
            <Box sx={{ padding:isSmall ? "2rem": "4rem" }}>
              <img src="/BegginerImage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}

export default IntermediateCourseHeroSection;