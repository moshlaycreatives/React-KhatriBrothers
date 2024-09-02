import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/actions/authActions";
import { enqueueSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const email = location?.state?.email;
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
      enqueueSnackbar("Please try again", { variant: "error" });
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    setLoading(true);
    dispatch(resetPassword({ email, password, confirmPassword }))
      .then((res) => {
        console.log("API Response:", res);
        navigate("/sign-in");
        enqueueSnackbar("Password changed", { variant: "success" });
      })
      .catch((err) => {
        console.error("API Error:", err);
        enqueueSnackbar("An error occurred", { variant: "error" });
        navigate("/set-password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Page title="Set New Password">
      <Box>
        <Grid container spacing={5}>
          <Grid item lg={6} md={6} xs={12} sm={12}>
            <Box
              sx={{
                backgroundImage: "url(/sign-in-up.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: isSmall ? "50vh" : "100vh",
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
                  <Box sx={{ marginTop: isSmall ? "1rem" : "6rem" }}>

                   <Link to='/'>

                    <img
                      src="loginlogo.svg"
                      style={{ width: isSmall ? "50%" : "30%" }}
                      alt="logo"
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
                    <Typography variant="h6">New Password</Typography>
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        sx={{ width: "100%" }}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChangePassword}
                        required
                      />
                      <IconButton
                        sx={{ position: "absolute", right: 0, top: 0, height: "100%", padding: "0 8px" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      marginTop: "2rem",
                      "@media(max-width:480px)": { width: "100%" },
                    }}
                  >
                    <Typography variant="h6">Confirm Password</Typography>
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        sx={{ width: "100%" }}
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        required
                      />
                      <IconButton
                        sx={{ position: "absolute", right: 0, top: 0, height: "100%", padding: "0 8px" }}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "2rem",
                      // borderRadius: "5px",
                      color: "white",
                      width:'100%',
                      position: "relative",
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20}/>
                    ):(
                      "Reset Password"
                    )}

                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default SetNewPassword;
