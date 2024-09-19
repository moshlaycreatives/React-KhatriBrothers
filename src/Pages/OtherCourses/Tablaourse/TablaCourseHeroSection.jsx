
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';

const TablaCourseHeroSection = () => {

  const navigate = useNavigate()

  const handleCustomCourseClick = () => {
    navigate('/form', { state: { courseType: 'tabla' } });
  };

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>

<Box
        sx={{
          padding:isSmall ? "6rem 10% 0rem 10%": "5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Tabla
              {/* <span style={{ fontSize: "2rem", fontWeight: "500" }}>Level</span> */}
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Learn the rhythmic heart of Indian music. Our Tabla course offers a comprehensive curriculum to master this iconic. From basic bols to complex layakaris, our experienced instructors will guide you on your tabla journey. Grab this opportunity to learn from the experts.

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
            <Box sx={{ padding: isSmall ? "2rem ": "4rem" }}>
              <img src="/TablaCourseLogo.JPG" alt="image" width={"100%"} height={'300rem'}/>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}

export default TablaCourseHeroSection;