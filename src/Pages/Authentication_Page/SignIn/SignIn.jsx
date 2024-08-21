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
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../store/actions/authActions";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const userdata = useSelector((state) => state?.auth?.user?.user);
  console.log(userdata, 'user data')
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const location = useLocation()

  const from = location?.state?.from || '/';



  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
setLoading(true)
    dispatch(userLogin(formValues))
      .then((res) => {

        enqueueSnackbar(res.data.message, { variant: "success" });



const role = res.data.data.role

if(role === 'admin'){
  navigate('/admin-dashboard')
}else if(role === 'user'){
  navigate('/')
}else if(role === 'instructor'){
  navigate('/instructor-dashboard')


}else{
  navigate(from)
}

        setFormValues(initialValues);
setLoading(false)
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
        setLoading(false)

        console.log(err);
      });
  };



  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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


                  <Button
                    sx={{
                      fontSize: "3rem",
                      fontWeight: "600",
                      color:'black',
                      textTransform:'none',
                      marginTop: "2rem",
                      ':hover': {
                  backgroundColor: 'white',
                },

                    }}

                    onClick={()=>navigate('/')}
                    >
                    Logo
                  </Button>



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
                    Sign In
                  </Typography>

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
                      sx={{ marginBottom: "2rem" }}
                    />
                    {/* <TextField
                      fullWidth
                      required
                      label="Password"
                      id="password"
                      name="password"
                      type={"password"}
                      value={formValues.password}
                      onChange={handleChange}
                      variant="outlined"
                      className="mb-4"
                      sx={{ marginBottom: "1rem" }}
                    /> */}

<TextField
          fullWidth
                      required
                      label="Password"
                      id="password"
                      name="password"

                      value={formValues.password}
                      onChange={handleChange}
                      variant="outlined"
                      className="mb-4"
                      sx={{ marginBottom: "1rem" }}
          type={showPassword ? "text" : "password"}


          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

                    <Link
                      to="/forget-password"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          marginLeft: "0.5rem",
                        }}
                      >
                        Forget Password
                      </Typography>
                    </Link>

                    <div>



                    <Button

  type="submit"
variant="contained"
                        sx={{

                          fontSize: "1.1rem",
                          fontWeight: "400",
                          color: "white",
                          marginTop: "2rem",
                          width: "50%",
                          width: "100%",
                          marginBottom: ".5rem",
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
  Sign in
</Button>




                    </div>
                  </form>

                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      textAlign: "center",
                    }}
                  >
                    Don't have an account? <Link style={{textDecoration:'none', color:theme.palette.primary.main}} to="/sign-up">Sign Up</Link>
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

export default SignIn;
