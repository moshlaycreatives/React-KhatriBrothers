import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
    CircularProgress,
    Grid,
  } from "@mui/material";
  import React, { useState } from "react";
  import Page from "../../../components/Page/Page";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { resenduserotpcode, verifyAccountOTP } from "../../../store/actions/authActions";
  import { useSnackbar } from "notistack";
  import { Link } from "react-router-dom";

  const EmailOTPConfirmation = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const email = location.state.emailAccess;

    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);

    const handleChange = (index, event) => {
      const updatedOTP = [...otp];
      updatedOTP[index] = event.target.value;
      setOTP(updatedOTP);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const enteredOTP = otp.join("");
      setLoadingVerify(true);

      dispatch(verifyAccountOTP({ email, verificationOtp: enteredOTP }))
        .then((res) => {
          navigate("/sign-in");
          enqueueSnackbar(res.data.message, { variant: "success" });
        })
        .catch((err) => {
          console.error("API Error:", err);
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoadingVerify(false);
        });
    };

    const handleKeyPress = (index, event) => {
      if (event.key === "Backspace" && index > 0 && !otp[index]) {
        document.getElementsByName(`otp${index}`)[0].focus();
      } else if (
        event.key >= "0" &&
        event.key <= "9" &&
        index < 5 &&
        otp[index]
      ) {
        document.getElementsByName(`otp${index + 2}`)[0].focus();
      }
    };

    const resendotp = () => {
      setLoadingResend(true);

      dispatch(resenduserotpcode({ email }))
        .then((res) => {
          console.log("API Response:", res);
          enqueueSnackbar(res.data.message, { variant: "success" });
        })
        .catch((err) => {
          console.error("API Error:", err);
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoadingResend(false);
        });
    };

    return (
      <>
        <Page title="sign-in">
          <Box sx={{ marginBottom: "0rem" }}>
            <Grid container spacing={5}>
              <Grid item lg={6} md={6} xs={12} sm={12}>
                <Box
                  sx={{
                    backgroundImage: "url(/sign-in-up.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height:isSmall ?"50vh": "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    padding: "1rem 1rem 6rem 1rem",
                  }}
                >
                  <Typography sx={{ color: "white" }}></Typography>
                </Box>
              </Grid>

              <Grid item lg={6} md={6} xs={12} sm={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "90%" }}>
                    <Typography
                      sx={{
                        fontSize: "3rem",
                        fontWeight: "600",
                        marginTop: "2rem",
                      }}
                    >
                      <Box sx={{ marginTop: isSmall ? "1rem " : "6rem" }}>

                      <Link to='/'>


                        <img
                          src="loginlogo.svg"
                          style={{ width: isSmall ? "50%" : "30%" }}
                        />
                      </Link>
                      </Box>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginTop: "5rem",
                        marginBottom: "1rem",
                        color: theme.palette.primary.main,
                      }}
                    >
                      OTP Verification
                    </Typography>
                    <Typography sx={{ color: "grey" }}>
                      Please enter the 6 digit code sent to {email}
                    </Typography>


                    <Typography sx={{ color: "grey" }}>
                      Check spam folder if not receiving OTP.
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
                            style={{ marginRight: "5px" }}
                            required
                          />
                        ))}
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingBottom: "0rem",
                        }}
                      >
                        <Button variant="contained" type="submit" sx={{width:'50%'}} disabled={loadingVerify}>
                          {loadingVerify ? <CircularProgress size={24} /> : "Verify"}
                        </Button>
                      </Box>
                    </form>
                    <Button onClick={resendotp} disabled={loadingResend}>
                      {loadingResend ? <CircularProgress size={24} /> : "Resend OTP"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Page>
      </>
    );
  };

  export default EmailOTPConfirmation;
