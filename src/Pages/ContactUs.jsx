import {
  Box,
  Button,
  Grid,
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

const ContactUs = () => {
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
        enqueueSnackbar("Please enter valid email password", {
          variant: "error",
        });

        console.log(err);
      });
  };

  return (
    <>
      <Page title="Contact us">
        <Box sx={{ padding: "1rem 10%" }}>
          <Box
            sx={{
              padding: "5rem 4rem",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Grid container spacing={4} sx={{ backgroundColor: "white" }}>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                    temporibus sint aut debitis cupiditate quidem obcaecati
                    soluta veniam nemo, laborum odio ipsum beatae ipsam impedit
                    asperiores ea amet facere aspernatur?
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <Typography sx={{ fontWeight: 600, fontSize: "3rem" }}>
                    Logo
                  </Typography>
                </Box>
              </Grid>

              <Grid item lg={6} md={12} sm={12} xs={12}>
                <form onSubmit={handleLoginSubmit}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    id="name"
                    name="name"
                    type="name"
                    value={formValues.name}
                    onChange={handleChange}
                    variant="outlined"
                    className="mb-4"
                    sx={{ marginBottom: "2rem" }}
                  />
                  <TextField
                    fullWidth
                    required
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
                    className="mb-4"
                    sx={{ marginBottom: "2rem" }}
                  />

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
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        marginTop: "2rem",
                        width: "50%",
                        width: "100%",
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
