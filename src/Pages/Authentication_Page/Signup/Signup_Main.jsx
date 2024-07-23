import Side_Image from "../Components/Side_Image";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../store/actions/authActions";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader/Loader";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Page from "../../../components/page";
const Signup_Main = () => {
  const initialValues = {
    name: "",
    username: "",
    email: "",
    state: "",
    community: "",
    password: "",
    confirmPassword: "",
  };

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const alphabetRegex = /[a-zA-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check if password meets complexity requirements
    if (
      !alphabetRegex.test(formValues.password) ||
      !numberRegex.test(formValues.password) ||
      !specialCharRegex.test(formValues.password)
    ) {

      enqueueSnackbar("Password must contain alphabets, numbers, and special characters", { variant: "success" });

      return;
    }



    if (formValues.password !== formValues.confirmPassword) {
      enqueueSnackbar("Password do not match", { variant: "error" });

      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }



    setLoading(true);

    dispatch(userRegister(formValues))
      .then((res) => {


        alert(res.data.message, 'response')
        setFormValues(res.data.payload);

        enqueueSnackbar("User Registered Successfully", { variant: "success" });

        setFormValues(initialValues);

        navigate("/signup");
      })
      .catch((err) => {
        setLoading(false);
        // console.log(res.data.payload, 'payloaddddddd')
        console.log(err.message, 'errorrrrrr');
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <>
<Page title="Signup">

      <Box>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ padding: "1rem 0rem" }}>



                <form onSubmit={handleRegisterSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Box display="flex" gap={5}>
                        <TextField
                          fullWidth
                          required
                          label="Name"
                          id="name"
                          name="name"
                          type="text"
                          value={formValues.name}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          required
                          label="Username"
                          id="username"
                          name="username"
                          type="text"
                          value={formValues.username}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Box>

                      <Box display="flex" gap={5}>
                        <TextField
                          fullWidth
                          required
                          label="Email"
                          id="sellerEmail"
                          name="email"
                          type="email"
                          value={formValues.email}
                          onChange={handleChange}
                          variant="outlined"
                        />

                      </Box>

                      <TextField
                        fullWidth
                        required
                        label="Phone"
                        id="phone"
                        name="phone"
                        type="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        variant="outlined"
                      />
                      <Box display="flex" gap={5}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">State</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                            label="State"
                          >
                            {/* <MenuItem value="select">Select Emirate</MenuItem> */}
                            <MenuItem value="Abu Dhabi">Abu Dhabi</MenuItem>
                            <MenuItem value="Dubai">Dubai</MenuItem>
                            <MenuItem value="Sharjah">Sharjah</MenuItem>
                            <MenuItem value="Ajman">Ajman</MenuItem>
                            <MenuItem value="Umm Al Quwain">Umm Al Quwain</MenuItem>
                            <MenuItem value="Fujairah">Fujairah</MenuItem>
                            <MenuItem value="Ras Al Khaimah">Ras Al Khaimah</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          fullWidth
                          required
                          label="Community"
                          id="community"
                          name="community"
                          type="text"
                          value={formValues.community}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Box>

                      <TextField
                        fullWidth
                        required
                        label="Password"
                        id="sellerPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleChange}
                        variant="outlined"
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
                      <TextField
                        fullWidth
                        required
                        label="Confirm Password"
                        id="sellerConfirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        className="mb-4 w-10"
                        style={{ backgroundColor: "#94603b", marginTop:'1rem' }}
                      >
                        Sign up
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

export default Signup_Main;
