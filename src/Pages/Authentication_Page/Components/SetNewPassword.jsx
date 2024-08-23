import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resendotpcode,
  resetPassword,
  userLogin,
  verifyPassword,
} from "../../../store/actions/authActions";
import { enqueueSnackbar, useSnackbar } from "notistack";

const setNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const email = location?.state?.email;

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please try again ", { position: "top-right" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password do not match", { position: "top-right" });

      return;
    }

    dispatch(resetPassword({ email, password, confirmPassword }))
      .then((res) => {
        console.log("API Response:", res); // Log the response to debug

        navigate("/sign-in");
        enqueueSnackbar("Password changed", { variant: "success" });
      })
      .catch((err) => {
        console.error("API Error:", err); // Log the error to debug
        enqueueSnackbar("Password does not match ", { variant: "error" });
        navigate("/set-password");
      });
  };

  return (
    <>
      <Page title="sign-in">
        <Box>
          <Grid container spacing={5}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundImage: "url(/sign-in-up.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  padding: "1rem 1rem 6rem 1rem",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  Es un hecho establecido hace demasiado tiempo que un lector se
                  distraerá con el contenido del texto de un sitio mientras que
                  mira su diseño.
                </Typography>
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
                    logo{" "}
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
                    Create New Password
                  </Typography>
                  <Typography sx={{ color: "grey" }}>
                    Your new password must be different from previously used
                    password.
                  </Typography>

                  <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
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
                        borderRadius: "25px",
                        color: "white",
                      }}
                    >
                      Reset Password
                    </Button>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
};

export default setNewPassword;
