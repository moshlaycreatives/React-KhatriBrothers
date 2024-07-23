import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Side_Image from "../Components/Side_Image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/actions/authActions";
import Loader from "../../../components/Loader/Loader";
import { useSnackbar } from "notistack";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Page from "../../../components/page";
const Login_Main = () => {
  const initialValues = {
    email: "",
    password: "",
  };
const navigate = useNavigate()
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin(formValues))
      .then((res) => {

        enqueueSnackbar(res.data.message, { variant: "success" });

        // alert(res.data.message, 'response')
        setFormValues(initialValues)
        navigate('/seller/dashboard')




      })
      .catch((err) => {
        setLoading(false);
      enqueueSnackbar('Please enter valid email password', { variant: "error" });

        console.log(err);
      });
  };


  return (
    <>
<Page title="Login">

      <Box>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ padding: "2rem 0rem", textAlign:'start' }}>

                <form onSubmit={handleLoginSubmit}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      variant="outlined"
                      className="mb-4"
                      sx={{marginBottom:'2rem'}}
                    />
                    <TextField
                      fullWidth
                      required
                      label="Password"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formValues.password}
                      onChange={handleChange}
                      variant="outlined"
                      className="mb-4"
sx={{marginBottom:'1rem'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />

<Link to="/forget-password" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        marginLeft: "0.5rem",
                      }}
                    >
                    Forget Password
                    </Typography>


                    </Link>
                    <br />
                    <br />
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        className="mb-4 w-10"
                        style={{ backgroundColor: "#94603b" }}
                      >
                        Login
                      </Button>
                    </div>
                  </form>

              </Box>

          </Grid>

        </Grid>
      </Box>
</Page>
    </>
  );
};

export default Login_Main;
