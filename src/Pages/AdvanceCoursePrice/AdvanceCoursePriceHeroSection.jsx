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
  getStudentJoinFreeTrails,
  payment,
  studentApplyFreeTrails,
} from "../../store/actions/courseActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import FreeTrialButton from "../../components/FreeTrialButton";

const AdvanceCoursePriceHeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const base = "https://khatribrothersacademy.com:4545";
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState("one2one"); // New state for class type

  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [country, setCountry] = useState("");
  const [classType, setClassType] = useState("one2one");
  const [disableInstallment, setDisableInstallment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loadingTrial, setLoadingTrial] = useState(false);

  const { courseType } = location.state || {};

  console.log(courseType, "course type of custom");
  const availableTimes = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
  ];

  const [courseType2, setCourseType2] = useState(undefined); // Initially undefined

  // Function to handle button clicks
  const handleButtonClick = (type) => {
    setCourseType2(type);
    navigate("/form", { state: { courseType: type } }); // Pass the type as state
  };

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
    localStorage.setItem("classType", event.target.value); // Save selected class type to local storage
  };

  const handleEnroll = (installment) => {
    if (auth === true) {
      if (userData.role === "admin") {
        enqueueSnackbar("Admin cannot enroll in a course", {
          variant: "error",
        });
        return;
      }

      setLoadingEnroll(true);
      dispatch(firstPaymentApi({ name, email }))
        .then((res) => {
          const paymentId = res.data.data.id;
          localStorage.setItem("paymentId2", id);
          localStorage.setItem("installment", installment);
          localStorage.setItem("classType", selectedClassType);
          if (paymentId) {
            dispatch(payment(price, paymentId, installment, currency)).then(
              (res) => {
                localStorage.setItem("currency", currency);

                const testCheckoutUrl = res.data.session.url;
                window.location.href = testCheckoutUrl;
              }
            );
          }
          setLoadingEnroll(false);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err.response.data.message, { variant: "error" });
          setLoadingEnroll(false);
        });
    } else {
      navigate("/sign-in", { state: { from: location.pathname } });
    }
  };

  const [trailData, setTrialData] = useState({});

  useEffect(() => {
    if (auth === true) {
      const fetchTrialData = async () => {
        try {
          const res = await dispatch(getStudentJoinFreeTrails());
          const data = res.data.data;
          setTrialData(data);
        } catch (err) {
          console.error("Failed to fetch free trails:", err);
        }
      };
      fetchTrialData();
    }
  }, []);

  const handleFreeTrail = (courseType) => {
    if (auth === true && selectedDate && selectedTime) {
      setLoadingTrial(true);
      const requestData = {
        courseType: "Bhajan",
        startTime:
          dayjs(selectedDate).format("YYYY-MM-DD") +
          "T" +
          dayjs(selectedTime, "h:mm A").format("HH:mm:ss") +
          "Z",
      };

      dispatch(studentApplyFreeTrails(requestData))
        .then((res) => {
          const paymentId = res.data.message;
          console.log(res.data.message, "snackbar messg");
          enqueueSnackbar(res.data.message, { variant: "success" });
          setLoadingTrial(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingTrial(false);

          enqueueSnackbar(err.response.data.message, { variant: "error" });
        });
    }
    // else {
    //   navigate("/sign-in", { state: { from: location.pathname } });
    // }
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get("https://ipinfo.io/json");
        setCountry(response.data.country);
        console.log(response.data.country, "currency");
      } catch (error) {
        console.error("Error fetching user country:", error);
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
        if (res.data.data.courseDuration !== 12) {
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

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [related, setRelated] = useState([]);
  const userData = useSelector((state) => state?.auth?.user);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);

  const email = userData?.email;
  const name = userData?.firstName;

  const getPriceByCountry = (countryCode) => {
    const priceMap = {
      US: courseData?.usaPrice,

      IN: courseData?.indianPrice,
      GB: courseData?.ukPrice,
      KE: courseData?.kenyaPrice,
      UG: courseData?.ugandaPrice,
      AE: courseData?.uaePrice,
      CAN: courseData?.canadaPrice,
      CA: courseData?.canadaPrice,
      AU: courseData?.australiaPrice,
      AUS: courseData?.australiaPrice,
    };
    return priceMap[countryCode] || courseData?.usaPrice;
  };

  const getCurrencySymbol = (countryCode) => {
    const currencyMap = {
      US: "$",

      IN: "₹",
      GB: "£",
      KE: "KSh",
      UG: "USh",
      AE: "AED",
      CAN: "C$",
      CA: "C$",
      AU: "A$",
      AUS: "A$",
    };
    return currencyMap[countryCode] || "$";
  };

  const getCurrencyType = (countryCode) => {
    const currencyType = {
      US: "USD",

      IN: "INR",
      GB: "GBP",
      KE: "KES",
      UG: "UGX",
      AE: "AED",
      CAN: "CAD",
      CA: "CAD",
      AU: "AUD",
      AUS: "AUD",
    };
    return currencyType[countryCode] || "USD";
  };

  const currencySymbol = getCurrencySymbol(country);
  const price = getPriceByCountry(country);
  const currency = getCurrencyType(country);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const truncateText = (text, wordLimit) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit) {
      return words?.slice(0, wordLimit).join(" ") + "...";
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            minHeight: isSmall ? "80vh" : "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: isSmall ? "5rem 10% 0rem 10%" : "2rem 10% 0rem 10%",
            background: "linear-gradient(to bottom, #901953, #000000)",
          }}
        >
          <Grid container sx={{ alignItems: "center" }} spacing={5}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography variant="h5" fontWeight="550" color="white">
                {courseData?.title}
              </Typography>
              <Box>
                <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                  {truncateText(courseData?.overview, 30)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      mt: 4,
                      color: "#8d1851",
                      borderRadius: "0px",
                      // padding: "0.6rem 2.3rem",
                      padding: isSmall ? "0.6rem 0.6rem" : "0.6rem 2.3rem",

                      textTransform: "none",
                      fontSize: "0.8rem",
                      "&:hover": {
                        backgroundColor: "white",
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

                  {courseType === "bhajjan" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "white",
                        mt: 4,
                        ml: 2,
                        color: "#8d1851",
                        borderRadius: "0px",
                        padding: isSmall ? "0.6rem 0.6rem" : "0.6rem 2.3rem",
                        textTransform: "none",
                        fontSize: "0.8rem",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      onClick={() => handleButtonClick("bhajjan")}
                    >
                      Customized Bhajan Course
                    </Button>
                  )}

                  {courseType === "bollywood" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "white",
                        mt: 4,
                        ml: 2,
                        color: "#8d1851",
                        borderRadius: "0px",
                        // padding: "0.6rem 2.3rem",
                        padding: isSmall ? "0.6rem 0.6rem" : "0.6rem 2.3rem",

                        textTransform: "none",
                        fontSize: "0.8rem",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      onClick={() => handleButtonClick("bollywood")}
                    >
                      Customized Bollywood Course
                    </Button>
                  )}



                  {courseType === "ghazal" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "white",
                        mt: 4,
                        ml: 2,
                        color: "#8d1851",
                        borderRadius: "0px",
                        // padding: "0.6rem 2.3rem",
                        padding: isSmall ? "0.6rem 0.6rem" : "0.6rem 2.3rem",

                        textTransform: "none",
                        fontSize: "0.8rem",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      onClick={() => handleButtonClick("ghazal")}
                    >
                      Customized Ghazal Course
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box sx={{ padding: isSmall ? "0rem " : "4rem" }}>
                <img
                  src={`${base}${courseData?.image?.replace(/ /g, "%20")}`}
                  alt="image"
                  width={"100%"}
                  height="300vh"
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
                {courseData?.overview}
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
                {courseData?.prerequisites}
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
              {courseData?.topics?.map((topic, index) => (
                <Typography sx={{ color: "grey", mb: 1 }} key={index}>
                  ● {topic}
                </Typography>
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
                    <Box>
                      <img src="/enroll.png" />
                    </Box>
                    <Typography sx={{ fontWeight: 600, marginLeft: "0.5rem" }}>
                      Enrolled :
                    </Typography>
                  </Box>
                  <span
                    style={{
                      color: "grey",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    24+ Students
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <img src="/duration.png" />
                    </Box>
                    <Typography sx={{ fontWeight: 600, marginLeft: "0.4rem" }}>
                      Course Duration :
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {courseData?.courseDuration} Weeks
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <img src="/lectures.png" />
                    </Box>
                    {/* <MdDateRange
                      style={{
                        fontSize: "1.5rem",
                        color: theme.palette.primary.main,
                      }}
                    /> */}
                    <Typography sx={{ fontWeight: 600, marginLeft: "0.5rem" }}>
                      Lectures :
                    </Typography>
                  </Box>
                  <span
                    style={{
                      color: "grey",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    1 class/ Per Week
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
                    <Box>
                      <img src="/level.png" />
                    </Box>
                    <Typography sx={{ marginLeft: "0.5rem", fontWeight: 600 }}>
                      Level :
                    </Typography>
                  </Box>
                  <span
                    style={{
                      color: "grey",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
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
                    <Box>
                      <img src="/clock.png" />
                    </Box>
                    <Typography sx={{ fontWeight: 600, marginLeft: "0.5rem" }}>
                      Lecture Duration :
                    </Typography>
                  </Box>
                  <span
                    style={{
                      color: "grey",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {courseData?.lectureDuration} Hour per class
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
                    {/* <MdDateRange
                      style={{
                        fontSize: "1.5rem",
                        color: theme.palette.primary.main,
                      }}
                    /> */}

                    <Box>
                      <img src="/classtype.png" />
                    </Box>
                    <Typography sx={{ marginLeft: "0.5rem", fontWeight: 600 }}>
                      Class Type :
                    </Typography>
                  </Box>
                  <span
                    style={{
                      color: "grey",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    One to One
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
                  ></Typography>
                </Box>
                <br />
                <FreeTrialButton />

                {/* <Box>
                  {!auth ? (
                    <Button
                      variant="contained"
                      sx={{
                        width: "100%",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        borderRadius: "0px",
                        position: "relative",
                      }}
                      onClick={() => navigate("/sign-in")}
                    >
                      {loadingTrial ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "15 Minutes free trial with Admin"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={
                        trailData && trailData?.studentId?.trial === true
                      }
                      sx={{
                        width: "100%",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        borderRadius: "0px",
                        position: "relative",
                      }}
                      onClick={handleOpenModal}
                    >
                      {loadingTrial ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "15 Minutes free trial with Admin"
                      )}
                    </Button>
                  )}
                </Box> */}

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
                      src={`${base}${val?.image?.replace(/ /g, "%20")}`}
                      alt="alt image"
                      width={"100%"}
                      height={"250vh"}
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
                      Start Learning &rarr;
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
              Please select your preferred payment option.
            </DialogContentText>
            <RadioGroup
              value={selectedClassType}
              onChange={handleClassTypeChange}
              sx={{ marginBottom: 2 }}
            >
              <FormControlLabel
                value="one2one"
                sx={{ display: "none" }}
                control={<Radio />}
                label="One to One"
              />
              {/* <FormControlLabel
                value="group"
                control={<Radio />}
                label="Group"


              /> */}

              {!disableInstallment ? (
                <>
                  <Typography sx={{ color: "grey" }}>
                    For installment pay {currencySymbol}{" "}
                    {(price / 3).toFixed(2)}
                  </Typography>
                </>
              ) : null}
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
            <Button onClick={() => handleEnroll(false)} color="primary">
              Full Fee
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Select Date and Time</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <Box component="input" {...params.inputProps} />
              )}
            />

            <Typography sx={{ marginTop: 2 }}>Select Time:</Typography>
            <Grid container spacing={2}>
              {availableTimes.map((time, index) => (
                <Grid item key={index} xs={6}>
                  <Button
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFreeTrail}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Select Date and Time for Trial Class</DialogTitle>
          <DialogContent>
            <DatePicker
              label="Select Date"
              size="small"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <Box
                  component="input"
                  size="small"
                  fullWidth
                  sx={{ width: "100%" }}
                  {...params.inputProps}
                />
              )}
            />

            <Typography sx={{ marginTop: 2 }}>Select Time:</Typography>
            <Grid container spacing={2}>
              {availableTimes.map((time, index) => (
                <Grid item key={index} xs={6}>
                  <Button
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFreeTrail}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};

export default AdvanceCoursePriceHeroSection;
