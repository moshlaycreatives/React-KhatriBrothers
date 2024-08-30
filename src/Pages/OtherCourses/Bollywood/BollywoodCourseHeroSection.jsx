
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';

const BollywoodHeroSection = () => {

  const navigate = useNavigate()

  const handleCustomCourseClick = () => {
    navigate('/form', { state: { courseType: 'bollywood' } });
  };

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))


  return (
    <>

<Box
        sx={{
          padding: isSmall ? "6rem 10% 0rem 10%":"5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Bollywood
              {/* <span style={{ fontSize: "2rem", fontWeight: "500" }}>Level</span> */}
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Discover the magic of Bollywood music. Our Bollywood Filmy Songs course offers a fun and engaging way to learn popular Hindi songs. Perfect for everyone, this course covers a variety of genres, including romantic ballads, upbeat dance numbers, and soulful melodies. Learn the lyrics, pronunciation, and basic singing techniques to confidently sing along to your favorite Bollywood hits.
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


              {/* <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                mt: 4,
                ml: 5,
                color: '#8d1851',
                borderRadius: '0px',
                padding: '0.8rem 2rem',
                textTransform: 'none',
                fontSize: '0.8rem',
                ':hover': {
                  color: 'white',
                },
              }}
              onClick={handleCustomCourseClick}
            >
              Want Custom Course?
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

export default BollywoodHeroSection