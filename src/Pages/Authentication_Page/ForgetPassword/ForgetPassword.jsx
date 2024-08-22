import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page/Page'
import {Link, useNavigate} from "react-router-dom"
import { forgetPassword } from '../../../store/actions/authActions'
import { useDispatch } from 'react-redux'

const ForgetPassword = () => {

    const theme = useTheme();


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(forgetPassword({ email }))
        .then((res) => {
          console.log('API Response:', res); // Log the response to debug

            navigate("/otp-verification",  { state: {email} });

          })
        .catch((err) => {
          console.error('API Error:', err); // Log the error to debug
          // enqueueSnackbar("Failed to send OTP", { variant: 'error' });
          // navigate("/signup");
        });
    };

  return (
    <>
    <Page title="forget-password">
    <Box>
        <Grid container  spacing={5}>
            <Grid item lg={6} md={6} xs={12} sm={12} >
            <Box
                sx={{
                  backgroundImage: "url(/sign-in-up.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  width: "100%",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"flex-end",
                  padding:"1rem 1rem 6rem 1rem"
                }}
              >
                <Typography sx={{color:"white"}} >
                  Es un hecho establecido hace demasiado tiempo que un lector se
                  distraerá con el contenido del texto de un sitio mientras que
                  mira su diseño.
                </Typography>
              </Box>
            </Grid>

           <Grid item lg={6} md={6} xs={12} sm={12} >
           <Box sx={{ display:'flex', alignItems:'center', justifyContent:"center", width:"100%"}}>

            <Box sx={{width:"90%"}}>
            <Typography sx={{fontSize:"3rem", fontWeight:"600" , marginTop:'2rem'}} >logo </Typography>

            <Typography sx={{fontSize:"2.5rem", fontWeight:"700", marginTop:"6rem", marginBottom:"1rem",
                color:theme.palette.primary.main
            }}>Forget Password</Typography>

            <Typography sx={{fontSize:'1.1rem', fontWeight:"400", marginBottom:"1rem"}}>To reset your password, please enter your email address
            below.</Typography>

            <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              size='small'
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              className="mb-4"
              required // Mark email field as required
            />
              <Button type='submit' variant='contained' sx={{fontSize:"1.1rem", fontWeight:"400" ,
                color:'white', marginTop:"2rem", width:"100%", marginBottom:".5rem"
            }}>Send</Button>
          </form>


           </Box>
           </Box>
            </Grid>
        </Grid>
    </Box>
    </Page>
    </>
  )
}

export default ForgetPassword