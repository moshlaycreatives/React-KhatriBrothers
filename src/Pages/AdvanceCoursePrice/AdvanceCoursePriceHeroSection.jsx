import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  firstPaymentApi,
  getRelatedCourses,
  getSingleCourse,
  payment,
} from "../../store/actions/courseActions";

import axios from 'axios';

const AdvanceCoursePriceHeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";

  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState('one2one'); // New state for class type
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [country, setCountry] = useState('');
  const [classType, setClassType] = useState('one2one');
  const [disableInstallment, setDisableInstallment] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (option) => {
    setOpen(false);
    if (option) {
      handleEnroll(option);
    }
  };

  const handleClassTypeChange = (event) => {
    setSelectedClassType(event.target.value);
    localStorage.setItem('classType', event.target.value); // Save selected class type to local storage
  };

  const handleEnroll = (installment) => {
    if (auth === true) {
      setLoadingEnroll(true);
      dispatch(firstPaymentApi({ name, email }))
        .then((res) => {
          const paymentId = res.data.data.id;
          localStorage.setItem('paymentId2', id);
          localStorage.setItem('installment', installment);
          localStorage.setItem('classType', selectedClassType); // Save selected class type to local storage

          if (paymentId) {
            dispatch(payment(price, paymentId, installment, currency))
              .then((res) => {
                const testCheckoutUrl = res.data.session.url;
                window.location.href = testCheckoutUrl;
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingEnroll(false);
        });
    } else {
      navigate("/sign-in", { state: { from: location.pathname } });
    }
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json');
        setCountry(response.data.country);
      } catch (error) {
        console.error('Error fetching user country:', error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getSingleCourse(id));
        setCourseData(res.data.data);
        // if (res.data.data.courseDuration < '12' || res.data.data.courseType === 'tabla' || res.data.data.courseType === 'ghazal') {
        //   setDisableInstallment(true);
        // }
        if (res.data.data.courseDuration !== '12') {
          setDisableInstallment(true);
        }
        dispatch(getRelatedCourses(res.data.data.courseType))
          .then((res) => {
            setRelated(res?.data?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.error("Failed to fetch advance courses:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [related, setRelated] = useState([]);
  const userData = useSelector((state) => state?.auth?.user);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);

  const email = userData?.email;
  const name = userData?.firstName;

  const getPriceByCountry = (countryCode) => {
    const priceMap = {
      US: courseData.usaPrice,
      PK: courseData.indianPrice,
      IN: courseData.indianPrice,
      GB: courseData.ukPrice,
      KE: courseData.kenyaPrice,
      UG: courseData.ugandaPrice,
      UAE: courseData.uaePrice,
      CAN: courseData.canadaPrice,
      CA: courseData.canadaPrice,
      AU: courseData.australiaPrice,
      AUS: courseData.australiaPrice,
    };
    return priceMap[countryCode] || courseData.indianPrice;
  };

  const getCurrencySymbol = (countryCode) => {
    const currencyMap = {
      US: '$',

      IN: '₹',
      GB: '£',
      KE: 'KSh',
      UG: 'USh',
      UAE: 'د.إ',
      CAN: 'C$',
      CA: 'C$',
      AU: 'A$',
      AUS: 'A$',
    };
    return currencyMap[countryCode] || '$';
  };

  const getCurrencyType = (countryCode) => {
    const currencyType = {
      US: 'USD',

      IN: 'INR',
      GB: 'GBP',
      KE: 'KES',
      UG: 'UGX',
      UAE: 'AED',
      CAN: 'CAD',
      CA: 'CAD',
      AU: 'AUD',
      AUS: 'AUD',
    };
    return currencyType[countryCode] || 'USD';
  };

  const currencySymbol = getCurrencySymbol(country);
  const price = getPriceByCountry(country);
  const currency = getCurrencyType(country);

  const truncateText = (text, wordLimit) => {
    const words = text?.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          minHeight: isSmall ? '80vh' : '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isSmall ? "5rem 10% 0rem 10%" : "2rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }} spacing={5}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h5" fontWeight="550" color="white">
              {courseData.title}
            </Typography>
            <Box>
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                {truncateText(courseData.overview, 30)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  mt: 4,
                  color: "#8d1851",
                  borderRadius: "0px",
                  padding: "0.6rem 2.3rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
                onClick={handleDialogOpen}
              >
                {loadingEnroll ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  />
                ) : (
                  "Enroll Course"
                )}
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: isSmall ? '0rem ' : "4rem" }}>
              <img
                src={`${base}${courseData.image.replace(/ /g, "%20")}`}
                alt="image"
                width={"100%"}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={5}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Overview:{" "}
            </Typography>
            <Typography sx={{ color: "grey" }}>
              {courseData.overview}
            </Typography>
            <br />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Prerequisites:
            </Typography>
            <Typography sx={{ color: "grey" }}>
              {courseData.prerequisites}
            </Typography>
            <Typography sx={{ color: "grey", marginTop: "0.5rem" }}>
              Tanpura app or Electronic Tanpura needed
            </Typography>
            <br />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Topics covered:{" "}
            </Typography>
            {courseData.topics.map((topic, index) => (
              <Typography sx={{ color: "grey", mb: 1 }} key={index}>● {topic}</Typography>
            ))}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box sx={{ border: "8px solid #961a56", padding: "2rem 1.5rem" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: "1.3rem",
                }}
              >
                Course Feature
              </Typography>
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>Enrolled :</Typography>
                </Box>
                <span
                  style={{ color: "grey", fontSize: "0.9rem", fontWeight: 600 }}
                >
                  240 Students
                </span>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>
                    Course Duration :
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: "grey", fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    {courseData.courseDuration} Weeks
                  </Typography>
                </Box>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>Lectures :</Typography>
                </Box>
                <span
                  style={{ color: "grey", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  1/ Per Week
                </span>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>Level :</Typography>
                </Box>
                <span
                  style={{ color: "grey", fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Beginner to Professional
                </span>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>
                    Lecture Duration :
                  </Typography>
                </Box>
                <span
                  style={{ color: "grey", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  {courseData.lectureDuration} Hours
                </span>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MdDateRange
                    style={{
                      fontSize: "1.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600 }}>
                    Max Class Size :
                  </Typography>
                </Box>
                <span
                  style={{ color: "grey", fontSize: "0.9rem", fontWeight: 600 }}
                >
                  03
                </span>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                >
                  Price : {currencySymbol} {price}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {/* Convert to INR? */}
                </Typography>
              </Box>
<br/>

<Button
                variant="contained"
                sx={{
                  width: "100%",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: "0px",
                  position: "relative",
                }}
                onClick={handleDialogOpen}
              >
                {loadingEnroll ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "15 Minutes free trail with Admin"
                )}
              </Button>


              <br />
              <br />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: "0px",
                  position: "relative",
                }}
                onClick={handleDialogOpen}
              >
                {loadingEnroll ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Enroll Course"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "1rem" }}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: theme.palette.primary.main,
            }}
          >
            Related Courses{" "}
          </Typography>
          <br />
          <Grid container spacing={5}>
            {related.slice(0, 3).map((val, ind) => (
              <Grid key={ind} item lg={4} md={4} sm={12} xs={12}>
                <Box>
                  <img
                    src={`${base}${val.image.replace(/ /g, "%20")}`}
                    alt="alt image"
                    width={"100%"}
                    height={"200vh"}
                  />
                </Box>
                <Box>
                  <Typography sx={{ color: "grey" }}>{val.title}</Typography>
                  <br />
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.primary.main,
                      textTransform: "none",
                      borderRadius: "0px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Learn More &rarr;
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => handleDialogClose(null)}>
        <DialogTitle>Select Payment Option</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select your preferred class type and payment option.
          </DialogContentText>
          <RadioGroup
            value={selectedClassType}
            onChange={handleClassTypeChange}
            sx={{ marginBottom: 2 }}
          >
            <FormControlLabel
              value="one2one"
              control={<Radio />}
              label="One2One"
            />
            <FormControlLabel
              value="group"
              control={<Radio />}
              label="Group"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleEnroll(true)}
            color="primary"
            disabled={disableInstallment}
          >
            Installment
          </Button>
          <Button
            onClick={() => handleEnroll(false)}
            color="primary"
          >
            Full Fee
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdvanceCoursePriceHeroSection;