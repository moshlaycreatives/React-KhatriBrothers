import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../components/page";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contactUser } from "../store/actions/authActions";
import PhoneInput from "react-phone-input-2";
import { IoMdClose } from "react-icons/io";
const ContactUs = () => {
  const history = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const theme = useTheme();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phone: value });
  };


  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(contactUser(formValues))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });

        // alert(res.data.message, 'response')
        setFormValues(initialValues);
        // navigate('/seller/dashboard')
      })
      .catch((err) => {
        // enqueueSnackbar("Please enter valid email password", {
        //   variant: "error",
        // });

        console.log(err);
      });
  };

  return (
    <>
      <Page title="Contact us">
        <Box sx={{}}>
          <Box
            sx={{
            minHeight:'100vh',
              padding: "3rem 5%",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Grid container sx={{ backgroundColor: "white", padding:'1.5rem' }}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: "3rem",
                    }}
                  >
                    Contact
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography color={"grey"}>
                  If you have any kind of queries regarding the admission process feel free to contact us. Our admissions counselors are here to help you at any time.
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />



                  <Box sx={{}}>
            <img
              src="/loginlogo.svg"
              width="45%"
              // style={{ display: isRoot ? "none" : "block" }}
              alt="Logo"
            />
          </Box>


                </Box>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                sx={{ paddingRight: "2.5rem" }}
              >
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <IoMdClose
                    style={{ fontSize: "1.8rem", cursor:'pointer' }}
                    onClick={handleClick}
                  />
                </Box>
                <form onSubmit={handleLoginSubmit}>
                  <InputLabel
                    sx={{
                      marginBottom: "0.5rem",
                      color: "black",
                      fontSize: "0.9rem",
                    }}
                  >
                    Name*
                  </InputLabel>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    label="Name"
                    id="name"
                    name="name"
                    type="name"
                    value={formValues.name}
                    onChange={handleChange}
                    variant="outlined"
                    className="mb-4"
                    sx={{ marginBottom: "1rem" }}
                  />
                  <InputLabel
                    sx={{
                      marginBottom: "0.5rem",
                      color: "black",
                      fontSize: "0.9rem",
                    }}
                  >
                    Email*
                  </InputLabel>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    label="Email"
                    id="email"
                    name="email"
                    type={"email"}
                    value={formValues.email}
                    onChange={handleChange}
                    variant="outlined"
                    className="mb-4"
                    sx={{ marginBottom: "1rem" }}
                  />
                  <Box>
                    <InputLabel
                      sx={{
                        marginBottom: "0.5rem",
                        color: "black",
                        fontSize: "0.9rem",
                      }}
                    >
                      Phone*
                    </InputLabel>
                    <PhoneInput
                      country={"in"}
                      value={formValues.phone}
                      onChange={handlePhoneChange}
                      inputStyle={{ width: "100%" }}
                    />
                  </Box>

                  <br />

                  <Typography>How Can We Help You*</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Type..."
                    multiline
                    rows={5}
                    required
                    label="Message"
                    id="message"
                    name="message"
                    type="message"
                    value={formValues.message}
                    onChange={handleChange}
                    variant="outlined"
                  />

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
                        marginBottom: ".5rem",
                      }}
                    >
                      Submit Now
                    </Button>
                  </div>
                </form>

                {/*
<Box>
  <Typography sx={{fontWeight:'600', fontSize:'1.5rem'}}>Enter Details</Typography>
<Typography>Name*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Name'/>

<br/>
<br/>

<Typography>Email*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Email'/>


  <br/>
<br/>

<Typography>Phone*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Phone'/>



  <br/>
<br/>

<Typography>How Can We Help You*</Typography>
  <TextField size='small' fullWidth placeholder='Type...' multiline rows={5}/>

</Box>

<br/>
<br/>
<br/>
<br/>

<Button variant='contained' sx={{borderRadius:'0px', textTransform:'none'}}>

Submit Now

</Button>

<br/>
<br/>
<br/> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default ContactUs;
