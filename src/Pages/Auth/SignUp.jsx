import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { userEmailVerification, userRegister } from "../../store/actions/authActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const initialValues = {
    learnerType: "",
    firstName: "",
    lastName: "",
    gender: "",

    email: "",
    phone: "",
    dob: "",
    country: "",


    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtherCountryField, setShowOtherCountryField] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setShowOtherCountryField(value === "Others");
      setFormValues({
        ...formValues,
        country: value === "Others" ? "" : value, // Reset if "Others" selected
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

  };
  const handleOtherCountryChange = (e) => {
    setFormValues({ ...formValues, country: e.target.value });
  };
  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phone: value });
  };

  const handleDOBChange = (name, value) => {
    setFormValues({
      ...formValues,
      dob: { ...formValues.dob, [name]: value },
    });
  };



  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const alphabetRegex = /[a-zA-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check if password meets complexity requirements
    if (
      !alphabetRegex.test(formValues.password) ||
      !numberRegex.test(formValues.password) ||
      !specialCharRegex.test(formValues.password)
    ) {
      enqueueSnackbar(
        "Password must contain alphabets, numbers, and special characters",
        { variant: "error" }
      );
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      setLoading(false);
      return;
    }

    // Prepare data for submission
    const dobString = `${formValues.dob.month} ${formValues.dob.day}, ${formValues.dob.year}`;
    const dataToSubmit = {
      ...formValues,
      dob: dobString,
    };

    // First API call to register user
    dispatch(userRegister(dataToSubmit))
      .then((res) => {
        // enqueueSnackbar(res?.data?.message, { variant: "success" });

        // Reset form values
        setFormValues(initialValues);

        // Second API call with email (assuming 'email' is defined somewhere)
        return dispatch(userEmailVerification({email:formValues.email}));
      })
      .then((res) => {
        const emailAccess = formValues.email
        // Navigate to email confirmation after the second API call succeeds
        navigate("/email-confirmation", {
          state: { emailAccess }
        });
      })
      .catch((err) => {
        // Handle errors from either API call
        console.log(err, "error");
        enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
      })
      .finally(() => {
        // Ensure loading is stopped
        setLoading(false);
      });
  };


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const country = [
    "India",
    "USA",
    "United Kingdom",
    "UAE",
    "Australia",
    "Kenya",
    "Uganda",
    "Canada",
    "Others",
  ];

  const [countries, setCountries] = useState([]);


  const transformedCountries = countries.map((country) => {
    const name = country.label.split(" ").slice(1).join(" ");
    return { ...country, label: name };
  });

  console.log(transformedCountries, "___________________");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Page title="sign-up">
        <Box>
          <Grid container spacing={5}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundImage: "url(/sign-in-up.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: isSmall ? "50vh" :"100%",
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
                  width: "80%",
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
                      marginTop: "2rem",
                      marginBottom: "1rem",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Sign Up
                  </Typography>

                  <form onSubmit={handleRegisterSubmit}>
                    <FormControl sx={{ marginBottom: ".5rem" }}>
                      <FormLabel
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: "400",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Please Select Learner's age group
                      </FormLabel>
                      <RadioGroup
                        sx={{ display: "flex", flexDirection: "row" }}
                        name="learnerType"
                        value={formValues.learnerType}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                          value="Adult"
                          control={<Radio />}
                          label="Adult"
                        />
                        <FormControlLabel
                          sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                          value="Child(below 14 years)"
                          control={<Radio />}
                          label="Child (below 14 years)"
                        />
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      >
                        First Name
                      </Typography>
                      <TextField
                        placeholder="Enter Your First Name"
                        fullWidth
                        size="small"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      >
                        Last Name
                      </Typography>
                      <TextField
                        placeholder="Enter Your Last Name"
                        fullWidth
                        size="small"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ marginBottom: "0.5rem" }}>
                      <Typography
                        sx={{ fontSize: "1.1rem", fontWeight: "400" }}
                      >
                        Email
                      </Typography>
                      <TextField
                        placeholder="Enter Your Email"
                        fullWidth
                        size="small"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={3}
                      sx={{ marginBottom: "0.5rem" }}
                    >
                      <Box>
                        <InputLabel sx={{ color: "black" }}>Phone</InputLabel>
                        <PhoneInput
                          country={"in"}
                          value={formValues.phone}
                          onChange={handlePhoneChange}
                          inputStyle={{ width: "100%" }}
                        />
                      </Box>

                      <FormControl>
                        <FormLabel
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: "400",
                            marginBottom: "0.5rem",
                            color: "black",
                          }}
                        >
                          Gender
                        </FormLabel>
                        <RadioGroup
                          sx={{ display: "flex", flexDirection: "row" }}
                          name="gender"
                          value={formValues.gender}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>

                      <Box>
                        <InputLabel sx={{ color: "black" }}>
                          Date Of Birth
                        </InputLabel>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <FormControl fullWidth size="small">
                            <Typography sx={{ fontSize: "0.8rem" }}>
                              Month
                            </Typography>

                            <Select
                              value={formValues.dob.month}
                              onChange={(e) =>
                                handleDOBChange("month", e.target.value)
                              }
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Month
                              </MenuItem>
                              {months.map((month, index) => (
                                <MenuItem key={index} value={month}>
                                  {month}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small">
                            <Typography sx={{ fontSize: "0.8rem" }}>
                              Day
                            </Typography>

                            <Select
                              value={formValues.dob.day}
                              onChange={(e) =>
                                handleDOBChange("day", e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                Day
                              </MenuItem>
                              {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                  {day}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl fullWidth size="small">
                            <Typography sx={{ fontSize: "0.8rem" }}>
                              Year
                            </Typography>
                            <Select
                              value={formValues.dob.year}
                              onChange={(e) =>
                                handleDOBChange("year", e.target.value)
                              }
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Year
                              </MenuItem>
                              {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>
                    {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <label style={{ fontSize: "1rem" }}>Country</label>
                      <FormControl fullWidth>
                        <Select
                          name="country" // Ensure this name matches the one used in handleChange
                          placeholder="Select Country"
                          labelId="country-select-label"
                          id="country-select"
                          value={formValues.country || ""} // Ensure this value is correctly managed
                          onChange={handleChange}
                          size="small"
                        >
                          {country.map((co, ind) => (
                            <MenuItem key={ind} value={co}>
                              {co}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box> */}

                    <Box>
                  <InputLabel sx={{ color: "black" }}>Country</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      name="country"
                      value={formValues.country || ""}
                      onChange={handleChange}
                      displayEmpty
                      size="small"
                    >
                      {country.map((co, ind) => (
                        <MenuItem key={ind} value={co}>
                          {co}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Show text field if "Others" is selected */}
                {showOtherCountryField && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      placeholder="Enter Country"
                      fullWidth
                      size="small"
                      value={formValues.country}
                      onChange={handleOtherCountryChange}
                    />
                  </Box>
                )}



                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      >
                        Password
                      </Typography>
                      <TextField
                        placeholder="Enter Your Password"
                        fullWidth
                        size="small"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        placeholder="Confirm Your Password"
                        fullWidth
                        size="small"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                        color: "white",
                        marginTop: "2rem",
                        width: "100%",
                        marginBottom: ".5rem",
                        position: "relative",
                      }}
                      disabled={loading} // Disable button while loading
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                          }}
                        />
                      )}
                      Sign Up
                    </Button>
                  </form>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      textAlign: "center",
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      style={{
                        textDecoration: "none",
                        color: theme.palette.primary.main,
                      }}
                      to="/sign-in"
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
};

export default SignUp;
