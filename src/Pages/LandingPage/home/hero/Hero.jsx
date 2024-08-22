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
  Grid,
  DialogActions,
} from "@mui/material";
import {
  getStudentJoinFreeTrails,
  studentApplyFreeTrails,
} from "../../../../store/actions/courseActions";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Hero() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const [trailData, setTrialData] = useState({});
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const availableTimes = [
    "6:00 AM",
    "12:00 AM",
    "3:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
  ];

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

  const handleFreeTrail = () => {
    if (auth === true && selectedDate && selectedTime) {
      setLoadingEnroll(true);
      const requestData = {
        courseType: "bhajan",
        startTime:
          dayjs(selectedDate).format("YYYY-MM-DD") +
          "T" +
          dayjs(selectedTime, "h:mm A").format("HH:mm:ss"),
      };

      dispatch(studentApplyFreeTrails(requestData))
        .then((res) => {
          console.log(res.data.message, "snackbar messg");
          enqueueSnackbar(res.data.message, { variant: "success" });
          setLoadingEnroll(false);
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingEnroll(false);

          enqueueSnackbar(err.response.data.message, { variant: "error" });
        });
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="hero-section">
          {/* <Navbar/> */}
          <div className="hero-section-text">
            <Typography
              sx={{ color: "white", fontSize: "3rem", fontWeight: "500" }}
            >
              Music For <br /> Everyone
            </Typography>

            {/* <h1>Music <samp className='hero-section-text-spam' >For</samp> Everyone</h1> */}
            {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none'}}>Start learning</Button> */}

            {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none', padding:'0.6rem', width:'50%'}}>Book 15 Minutes Free Trial</Button> */}

            <Box>
              {!auth ? (
                <>
                  <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
                    Which course is suitable for me?
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
                  {trailData?.studentId?.trial === false || !trailData && (
                    <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
                      Which course is suitable for me?
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    disabled={trailData && trailData?.studentId?.trial === true}
                    sx={{
                      padding: "0.8rem",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      borderRadius: "0px",

                      position: "relative",
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
            </Box>
          </div>
        </section>

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
      </LocalizationProvider>
    </>
  );
}

export default Hero;
