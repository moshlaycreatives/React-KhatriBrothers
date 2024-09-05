import React, { useEffect, useState } from "react";
import "./Hero.css";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  getStdTime,
  getStudentJoinFreeTrails,
  studentApplyFreeTrails,
} from "../../../../store/actions/courseActions";
import FreeTrialButton from "../../../../components/FreeTrialButton";

function Hero() {
  const now = dayjs();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const [trailData, setTrailData] = useState({});
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSecondQuestionYes, setIsSecondQuestionYes] = useState(null);
  const [selectedThirdOption, setSelectedThirdOption] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // Helper function to filter available times

  console.log(selectedDate, "selected date");
  console.log(selectedTime, "selected time");

  const filterAvailableTimes = (date) => {
    if (!date) return [];
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return availableTimes.filter(
      (timeObj) => dayjs(timeObj.time).format("YYYY-MM-DD") === formattedDate
    );
  };

  const today = dayjs().startOf("day");
  const tomorrow = today.add(1, "day");
  const dayAfterTomorrow = today.add(2, "day");

  const shouldDisableDate = (date) => {
    const selectedDay = dayjs(date).startOf("day");
    return ![today, tomorrow, dayAfterTomorrow].some((day) =>
      day.isSame(selectedDay, "day")
    );
  };

  const fetchAvailableTime = async () => {
    try {
      const res = await dispatch(getStdTime());
      const data = res.data.data;
      setAvailableTimes(data);
    } catch (err) {
      console.error("Failed to fetch available times:", err);
    }
  };

  useEffect(() => {
    fetchAvailableTime();
  }, []);

  useEffect(() => {
    if (auth === true) {
      const fetchTrialData = async () => {
        try {
          const res = await dispatch(getStudentJoinFreeTrails());
          const data = res.data.data;
          setTrailData(data);
        } catch (err) {
          console.error("Failed to fetch free trails:", err);
        }
      };
      fetchTrialData();
    }
  }, [auth, dispatch]);
  // Get current time and time zone
  const currentTimeZone = dayjs().format("Z"); // ISO 8601 time zone offset, e.g., +05:00

  console.log("Current Time:", now.format());
  console.log("Current Time Zone:", currentTimeZone);

  const handleFreeTrail = () => {
    if (auth === true && selectedDate && selectedTime && selectedOption) {
      setLoadingEnroll(true);

      let courseType;

      switch (selectedOption) {
        case "Bhajan":
          courseType = "bhajan";
          break;
        case "Hindustani Vocals":
          courseType = "Hindustani vocals";
          break;
        case "Tabla":
          courseType = "Tabla";
          break;
        case "Ghazal":
          courseType = "Ghazal";
          break;
        case "Bollywood/Filmy Songs":
          courseType = "Bollywood/Filmy Songs";
          break;
        default:
          courseType = "Not Selected";
          break;
      }

      // const requestData = {
      //   courseType: courseType,
      //   startTime:
      //     dayjs(selectedDate).format("YYYY-MM-DD") +
      //     "T" +
      //     dayjs(selectedTime, "h:mm A").format(`HH:mm:ss${currentTimeZone}`),
      //   isExperienced: isSecondQuestionYes,
      //   years: selectedThirdOption,
      // };

      // Format the selected date and time
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD"); // Format the date
      const formattedTime = dayjs(selectedTime, "h:mm A").format(`HH:mm:ss`); // Format the time

      const startTime = `${formattedDate}T${formattedTime}${currentTimeZone}`;
      alert(startTime, "start time");
      // Construct request data
      const requestData = {
        courseType: courseType,
        startTime: startTime, // Use the formatted start time with timezone
        isExperienced: isSecondQuestionYes,
        years: selectedThirdOption,
      };

      console.log(requestData, "req dataaaaaaaaa");

      dispatch(studentApplyFreeTrails(requestData))
        .then((res) => {
          console.log(res.data.message, "snackbar message");
          enqueueSnackbar(res.data.message, { variant: "success" });
          setLoadingEnroll(false);
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingEnroll(false);
          console.log(startTime, "start");
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        });
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOption("");
    setIsSecondQuestionYes(null);
    setSelectedThirdOption("");
    setSelectedTime("");
  };

  const filteredAvailableTimes = filterAvailableTimes(selectedDate);
  const currentTime = dayjs();

  const futureTimes = filteredAvailableTimes.filter((timeObj) =>
    dayjs(timeObj.time).isAfter(currentTime)
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="hero-section">
          <div className="hero-section-text">
            <Typography
              sx={{ color: "white", fontSize: "3rem", fontWeight: "500" }}
            >
              Music For <br /> Everyone
            </Typography>

            <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
              Which course is suitable for you?
            </Typography>
            <br />
            <Box sx={{ width: isSmall ? "200%" : "50%" }}>
              <FreeTrialButton />
            </Box>

            {/* <Box>
              {!auth ? (
                <>
                  <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
                    Which course is suitable for you?
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      fontSize: "1.1rem",
                      borderRadius: "0px",
                      position: "relative",
                    }}
                    onClick={() => navigate("/sign-in")}
                  >
                    {loadingEnroll ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "15 Minutes free trial with Admin"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
                    Which course is suitable for you?
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    disabled={trailData && trailData?.studentId?.trial === true}
                    sx={{
                      padding: "0.8rem",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      borderRadius: "0px",
                      cursor:
                        trailData && trailData?.studentId?.trial === true
                          ? "not-allowed"
                          : "pointer",
                      position: "relative",
                      "&:disabled": {
                        cursor: "not-allowed",
                        backgroundColor: "#B0B0B0",
                        color: theme.palette.primary.main,
                      },
                    }}
                    onClick={handleOpenModal}
                  >
                    {loadingEnroll ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "15 Minutes free trial with Admin"
                    )}
                  </Button>
                </>
              )}
            </Box> */}
          </div>
        </section>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle
            sx={{ textAlign: "center", color: theme.palette.primary.main }}
          >
            Select Date and Time for 15 Minutes Free Trial Class with Admin
          </DialogTitle>
          <DialogContent>
            <DatePicker
              fullWidth
              size="small"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <Box component="input" fullWidth {...params.inputProps} />
              )}
              shouldDisableDate={shouldDisableDate}
            />

            <Typography sx={{ marginTop: 2 }}>Select Time:</Typography>

            <Select
              size="small"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              displayEmpty
              fullWidth
              renderValue={(value) => (value ? value : "Select Time")}
              sx={{ marginBottom: 2 }}
              disabled={!selectedDate}
            >
              {futureTimes.length > 0 ? (
                futureTimes.map((timeObj, index) => (
                  <MenuItem
                    key={index}
                    value={dayjs(timeObj.time).format("h:mm A")}
                  >
                    {dayjs(timeObj.time).format("h:mm A")}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No available times</MenuItem>
              )}
            </Select>
            <Typography
              sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
            >
              Time as per your local time{" "}
            </Typography>
            <br />

            <Typography>What Music Course you are interested in?</Typography>
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              displayEmpty
              size="small"
              fullWidth
              renderValue={(value) => (value ? value : "Select Course")}
              sx={{ marginBottom: 2 }}
            >
              {[
                "Hindustani Vocals",
                "Bhajan",
                "Tabla",
                "Ghazal",
                "Bollywood/Filmy Songs",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <Typography sx={{ marginTop: 2 }}>
              Have you learned music somewhere else?
            </Typography>
            <Select
              value={isSecondQuestionYes}
              onChange={(e) => setIsSecondQuestionYes(e.target.value)}
              displayEmpty
              fullWidth
              size="small"
              renderValue={(value) =>
                value !== null ? (value ? "Yes" : "No") : "Select an Option"
              }
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>

            {isSecondQuestionYes === true && (
              <>
                <Typography sx={{ marginTop: 2 }}>
                  For how many years have you been learning?
                </Typography>
                <Select
                  size="small"
                  value={selectedThirdOption}
                  onChange={(e) => setSelectedThirdOption(e.target.value)}
                  displayEmpty
                  fullWidth
                  renderValue={(value) => (value ? value : "Select Option")}
                  sx={{ marginBottom: 2 }}
                >
                  {["1 year", "2 years", "3 years", "4 years", "5 years"].map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                </Select>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFreeTrail}
              disabled={
                !selectedDate ||
                !selectedTime ||
                !selectedOption ||
                (isSecondQuestionYes === true && !selectedThirdOption)
              }
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
}

export default Hero;
