import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";

const Change_Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state.email;

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match", { position: "top-right" });

      return;
    }


    dispatch(resetPassword({ email, password, confirmPassword }))
      .then((res) => {
        console.log('API Response:', res); // Log the response to debug

          navigate("/signup");
          enqueueSnackbar("Password changed", { variant: 'success' });

        })
      .catch((err) => {
        console.error('API Error:', err); // Log the error to debug
        enqueueSnackbar("Password does not match ", { variant: 'error' });
        navigate("/set-password");
      });
  };


  return (
    <>

      <Stack sx={{ padding: "0rem 10%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",

          }}
        >


<Box gap={2} sx={{marginTop:'1rem'}}>
<img src='/Logo Ok.png' alt='vector1' width={'50%'}/>

</Box>

          <h1>Enter New Password</h1>
          <form onSubmit={handleSubmit} style={{marginTop:'2rem'}}>
            <Box
              sx={{
                width: "100%",
                "@media(max-width:480px)": { width: "100%" },
              }}
            >
              <h5>New Password</h5>
              <TextField
                sx={{ width: "100%" }}
                type="password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: "2rem",
                "@media(max-width:480px)": { width: "100%" },
              }}
            >
              <h5>Confirm Password</h5>
              <TextField
                sx={{ width: "100%" }}
                type="password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "2rem",
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

export default Change_Password;
