import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BhajjanCourseHeroSection = () => {
  const navigate = useNavigate();

  const handleCustomCourseClick = () => {
    navigate('/form', { state: { courseType: 'bhajjan' } });
  };

  return (
    <Box
      sx={{
        padding: '5rem 10% 0rem 10%',
        background: 'linear-gradient(to bottom, #901953, #000000)',
      }}
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h4" fontWeight="550" color="white">
            Bhajan
          </Typography>
          <Box>
            <Typography sx={{ color: 'white' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a gal
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                mt: 4,
                color: '#8d1851',
                borderRadius: '0px',
                padding: '0.8rem 2rem',
                textTransform: 'none',
                fontSize: '0.8rem',
                ':hover': {
                  color: 'white',
                },
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
          <Box sx={{ padding: '4rem' }}>
            <img src="/BegginerImage.png" alt="image" width={"100%"} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BhajjanCourseHeroSection;
