import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { userRegister } from "../../store/actions/authActions";

const SignUp = () => {
  const theme = useTheme();
  const initialValues = {
    learnerType: "",
    firstName: "",
    lastName: "",
    gender: "",

    email: "",
    phone: "",
    dob:'',
    country:'',

    // dob: {
    //   month: "",
    //   day: "",
    //   year: "",
    // },
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    const dobString = `${formValues.dob.month} ${formValues.dob.day}, ${formValues.dob.year}`;
    const dataToSubmit = {
      ...formValues,
      dob: dobString,
    };
    console.log(dataToSubmit, 'Form values');
    // setLoading(false);

    dispatch(userRegister(dataToSubmit))

    .then((res) => {



      setFormValues(res.data.payload);

      enqueueSnackbar(res.data.message, { variant: "success" });

      setFormValues(initialValues);

      navigate("/signup");
    })
    .catch((err) => {
      // setLoading(false);
      // console.log(res.data.payload, 'payloaddddddd')
      console.log(err, 'errorrrrrr');
      enqueueSnackbar(err.response.data.message, { variant: "error" });
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

const [countries, setCountries] = useState([])
  useEffect(()=>{
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        console.log(data.countries, 'countries')
      });
  },[])

  console.log(countries, 'hhhhhhhh')

 const name = countries.map((country)=>country.label.split(' ').at(1))
const hh = Array(name)
const variable = countries[0]?.label?.split(' ').at(1)

console.log(typeof hh, 'jack ')


  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

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
                  height: "100%",
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
                    logo{" "}
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
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: "400" }}>
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
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: "400" }}>
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
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: "400" }}>
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
                        <InputLabel sx={{color:'black'}}>Phone</InputLabel>
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
 color:'black'
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
                        <InputLabel sx={{color:'black'}}>Date Of Birth</InputLabel>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <FormControl fullWidth size="small">
                            <Select
                              value={formValues.dob.month}
                              onChange={(e) => handleDOBChange('month', e.target.value)}
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
                            <Select
                              value={formValues.dob.day}
                              onChange={(e) => handleDOBChange('day', e.target.value)}

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
                            <Select
                              value={formValues.dob.year}
                              onChange={(e) => handleDOBChange('year', e.target.value)}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "1.2rem" }}>Country</label>
              <FormControl fullWidth>
                <Select
                  name="country"
                  placeholder="Select Country"
                  labelId="country-select-label"
                  id="country-select"
                  value={formValues.hh}
                  onChange={handleChange}
                  label="Country"
                              >
                  {hh.map((country) => (
                    <MenuItem key={country} value={country}>

                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: "400" }}>
                        Password
                      </Typography>
                      <TextField
                        placeholder="Password"
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ marginBottom: ".5rem" }}>
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: "400" }}>
                        Confirm Password
                      </Typography>
                      <TextField
                        placeholder="Confirm password"
                        fullWidth
                        size="small"
                        name="confirmPassword"
                        type="password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                      />
                    </Box>
                    <Button
                    variant="contained"
                      type="submit"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                        // backgroundColor: theme.palette.primary.main,
                        color: "white",
                        marginTop: "2rem",
                        width: "100%",
                        marginBottom: ".5rem",
                      }}
                    >
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
                    Already have an account? <Link to="/sign-in">Sign In</Link>
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
