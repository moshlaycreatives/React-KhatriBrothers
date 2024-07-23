import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../store/actions/authActions";
import { enqueueSnackbar } from 'notistack'; // Ensure you have this import

const Forget_Password = () => {
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
        enqueueSnackbar("Failed to send OTP", { variant: 'error' });
        navigate("/signup");
      });
  };

  return (
    <>
      <Stack sx={{ padding: "5rem 10%", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Lost Your Password</h1>
          <p style={{margin:'1rem'}}>
            Please enter your email address. You will receive an OTP Password
            to create a new password via email.
          </p>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              className="mb-4"
              required // Mark email field as required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop:'1rem',
                backgroundColor: "#94603b",
                borderRadius: "25px",
                color: "white",
                "&:hover": {
                  backgroundColor: "#94603b", // Change background color to red on hover
                },
              }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Stack>
    </>
  );
};

export default Forget_Password;
