import {
    Avatar,
    Box,
    Button,
    Card,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  import { useRef } from "react";
  import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { verifyPassword } from "../../../store/actions/authActions";
import { useDeferredValue } from "react";
import { useDispatch } from "react-redux";

  const Password_Confirmation = () => {

    const theme = useTheme()

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
          enqueueSnackbar("OTP has been successfully sent to you email", { variant: 'success' });

        })
      .catch((err) => {
        console.error('API Error:', err); // Log the error to debug
        enqueueSnackbar("Failed to send OTP", { variant: 'error' });
        navigate("/signup");
      });
  };


  const handleKeyPress = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {

      document.getElementsByName(`otp${index}`)[0].focus();
    } else if (event.key >= '0' && event.key <= '9' && index < 5 && otp[index]) {

      document.getElementsByName(`otp${index + 2}`)[0].focus();
    }
  };

    return (
      <>
<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%' }}>


<Box gap={2} sx={{marginTop:'1rem'}}>
<img src='/Logo Ok.png' alt='vector1' width={'50%'}/>

</Box>

<Typography sx={{textAlign:'center', marginTop:'1rem', fontSize:'1.2rem', fontWeight:'600'}}>Enter You OTP tht you recevied on your Email</Typography>




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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '5rem' }}>
        <Button
          variant="contained"
          type="submit"
          sx={{

      backgroundColor: "#94603b", // Change background color to red on hover

            color: 'white',
            "&:hover": {
      backgroundColor: "#94603b", // Change background color to red on hover
    },
          }}
        >
          Submit
        </Button>
      </Box>
    </form>

</Box>
      </>
    );
  };

  export default Password_Confirmation;
