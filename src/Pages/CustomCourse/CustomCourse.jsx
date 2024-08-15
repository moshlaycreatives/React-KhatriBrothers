import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddCustomCourse from './AddCustomCourse';

const CustomCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseType = location.state?.courseType;
const theme = useTheme()

  console.log(courseType)
  return (
<>

<Box
      sx={{
        padding: '5rem 10% 0rem 10%',
        background: 'linear-gradient(to bottom, #901953, #000000)',
      }}
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h4" fontWeight="550" color="white">
            Custom Course
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
          </Box>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box sx={{ padding: '4rem' }}>
            <img src="/BegginerImage.png" alt="image" width={"100%"} />
          </Box>
        </Grid>
      </Grid>
    </Box>


<Box sx={{padding:'3rem 10%', display:'flex', justifyContent:'center', alignItems:'start', minHeight:'100vh',}}>

<Box>

<Typography sx={{ fontSize: "2rem", fontWeight: 700, color:theme.palette.primary.main }}>
          Add Details, What you want to learn from Khatri Brothers Academy?
        </Typography>


<AddCustomCourse courseType={courseType}/>
</Box>

</Box>



</>


  );
};

export default CustomCourse;
