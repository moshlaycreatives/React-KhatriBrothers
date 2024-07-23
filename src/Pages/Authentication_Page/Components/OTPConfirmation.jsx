import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Page from '../../../components/Page/Page'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { resendotpcode, userLogin, verifyPassword } from '../../../store/actions/authActions'
import { enqueueSnackbar, useSnackbar } from 'notistack'

const OTPConfirmation = () => {
    const theme = useTheme()
const {enqueueSnackbar} = useSnackbar()
const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const email= location.state.email

  const [otp, setOTP] = useState(['', '', '', '', '', '']);

  const handleChange = (index, event) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = event.target.value;
    setOTP(updatedOTP);
  };




  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOTP = otp.join('');

    dispatch(verifyPassword( { email, forgotPasswordOtp: enteredOTP  }))
      .then((res) => {
        console.log('API Response:', res); // Log the response to debug

          navigate("/set-password",  { state: {email} });
          enqueueSnackbar("OTP Confirmed", { variant: 'success' });

        })
      .catch((err) => {
        console.error('API Error:', err); // Log the error to debug
        enqueueSnackbar("Failed to send OTP", { variant: 'error' });
        // navigate("/signup");
      });
  };


  const handleKeyPress = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {

      document.getElementsByName(`otp${index}`)[0].focus();
    } else if (event.key >= '0' && event.key <= '9' && index < 5 && otp[index]) {

      document.getElementsByName(`otp${index + 2}`)[0].focus();
    }
  };


  const  resendotp = ()=>{
    dispatch(resendotpcode( { email}))
      .then((res) => {
        console.log('API Response:', res); // Log the response to debug

          enqueueSnackbar("OTP Sent", { variant: 'success' });

        })
      .catch((err) => {
        console.error('API Error:', err); // Log the error to debug
        enqueueSnackbar("Failed to send OTP", { variant: 'error' });
        // navigate("/signup");
      });

  }



    return (
    <>
    <Page title="sign-in">
    <Box sx={{marginBottom:"3rem"}}>
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
           <Box sx={{ display:'flex', alignItems:'center',justifyContent:"center", width:"100%"}}>

            <Box sx={{width:"90%"}}>
            <Typography sx={{fontSize:"3rem", fontWeight:"600" , marginTop:'2rem'}} >logo </Typography>

            <Typography sx={{fontSize:"2.5rem", fontWeight:"700", marginTop:"5rem", marginBottom:"1rem",
                color:theme.palette.primary.main
            }}>OTP Verification</Typography>
<Typography sx={{color:'grey'}}>
Please enter the 6 digit code sent to {email}
</Typography>

<form onSubmit={handleSubmit}>
      <div className="otpContainer">
        {otp.map((value, index) => (
          <input
            key={index}
            name={`otp${index + 1}`}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={value}
            onChange={(e) => handleChange(index, e)}
            maxLength="1"
            onKeyDown={(e) => handleKeyPress(index, e)}
            style={{ marginRight: '5px' }}
            required
          />
        ))}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '0rem' }}>
        <Button
          variant="contained"
          type="submit"
          fullWidth
        >
          Verify
        </Button>

      </Box>

    </form>
    <Button onClick={resendotp}>Resend OTP</Button>


           </Box>
           </Box>
            </Grid>
        </Grid>
    </Box>
    </Page>
    </>
  )
}

export default OTPConfirmation