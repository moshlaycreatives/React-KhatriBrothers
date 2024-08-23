// import React, { useEffect, useState } from "react";
// import "./Hero.css";
// import {
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Grid,
//   DialogActions,
//   useTheme,
// } from "@mui/material";
// import {
//   getStudentJoinFreeTrails,
//   studentApplyFreeTrails,
// } from "../../../../store/actions/courseActions";
// import { useSnackbar } from "notistack";
// import { useSelector, useDispatch } from "react-redux";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { useNavigate } from "react-router";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// function Hero() {
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const auth = useSelector((state) => state?.auth?.isAuthenticated);
//   const [trailData, setTrialData] = useState({});
//   const [loadingEnroll, setLoadingEnroll] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const availableTimes = [
//     "6:00 AM",
//     "12:00 AM",
//     "3:00 AM",
//     "7:00 AM",
//     "8:00 AM",
//     "9:00 AM",
//     "10:00 AM",
//   ];

//   useEffect(() => {
//     if (auth === true) {
//       const fetchTrialData = async () => {
//         try {
//           const res = await dispatch(getStudentJoinFreeTrails());
//           const data = res.data.data;
//           setTrialData(data);
//         } catch (err) {
//           console.error("Failed to fetch free trails:", err);
//         }
//       };
//       fetchTrialData();
//     }
//   }, []);

//   const handleFreeTrail = () => {
//     if (auth === true && selectedDate && selectedTime) {
//       setLoadingEnroll(true);
//       const requestData = {
//         courseType: "bhajan",
//         startTime:
//           dayjs(selectedDate).format("YYYY-MM-DD") +
//           "T" +
//           dayjs(selectedTime, "h:mm A").format("HH:mm:ss"),
//       };

//       dispatch(studentApplyFreeTrails(requestData))
//         .then((res) => {
//           console.log(res.data.message, "snackbar messg");
//           enqueueSnackbar(res.data.message, { variant: "success" });
//           setLoadingEnroll(false);
//           setOpenModal(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoadingEnroll(false);

//           enqueueSnackbar(err.response.data.message, { variant: "error" });
//         });
//     }
//   };

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <section className="hero-section">
//           {/* <Navbar/> */}
//           <div className="hero-section-text">
//             <Typography
//               sx={{ color: "white", fontSize: "3rem", fontWeight: "500" }}
//             >
//               Music For <br /> Everyone
//             </Typography>

//             {/* <h1>Music <samp className='hero-section-text-spam' >For</samp> Everyone</h1> */}
//             {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none'}}>Start learning</Button> */}

//             {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none', padding:'0.6rem', width:'50%'}}>Book 15 Minutes Free Trial</Button> */}

//             <Box>
//               {!auth ? (
//                 <>
//                   <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
//                     Which course is suitable for you?
//                   </Typography>
//                   <br />
//                   <Button
//                     variant="contained"
//                     sx={{
//                       textTransform: "none",
//                       fontSize: "1.1rem",
//                       borderRadius: "0px",
//                       position: "relative",
//                     }}
//                     onClick={() => navigate("/sign-in")}
//                   >
//                     {loadingEnroll ? (
//                       <CircularProgress size={24} sx={{ color: "white" }} />
//                     ) : (
//                       "15 Minutes free trial with Admin"
//                     )}
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
//                     Which course is suitable for you?
//                   </Typography>
//                   <br />
//                   <Button
//                     variant="contained"
//                     disabled={trailData && trailData?.studentId?.trial === true}
//                     sx={{
//                       padding: "0.8rem",
//                       textTransform: "none",
//                       fontSize: "1.1rem",
//                       borderRadius: "0px",
//                       cursor:
//                         trailData && trailData?.studentId?.trial === true
//                           ? "not-allowed"
//                           : "pointer",
//                       position: "relative",
//                       "&:disabled": {
//                         cursor: "not-allowed",
//                         backgroundColor: "#B0B0B0",
//                         color: theme.palette.primary.main,
//                       },
//                     }}
//                     onClick={handleOpenModal}
//                   >
//                     {loadingEnroll ? (
//                       <CircularProgress size={24} sx={{ color: "white" }} />
//                     ) : (
//                       "15 Minutes free trial with Admin"
//                     )}
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </div>
//         </section>

//         <Dialog open={openModal} onClose={handleCloseModal}>
//           <DialogTitle>Select Date and Time</DialogTitle>
//           <DialogContent>
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newDate) => setSelectedDate(newDate)}
//               renderInput={(params) => (
//                 <Box component="input" {...params.inputProps} />
//               )}
//             />

//             <Typography sx={{ marginTop: 2 }}>Select Time:</Typography>
//             <Grid container spacing={2}>
//               {availableTimes.map((time, index) => (
//                 <Grid item key={index} xs={6}>
//                   <Button
//                     variant={selectedTime === time ? "contained" : "outlined"}
//                     onClick={() => setSelectedTime(time)}
//                   >
//                     {time}
//                   </Button>
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseModal}>Cancel</Button>
//             <Button
//               variant="contained"
//               onClick={handleFreeTrail}
//               disabled={!selectedDate || !selectedTime}
//             >
//               Confirm
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </LocalizationProvider>
//     </>
//   );
// }

// export default Hero;




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
  TextField,
  useTheme,
  Select,
  MenuItem,
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
  const theme = useTheme();
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const [trailData, setTrailData] = useState({});
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSecondQuestionYes, setIsSecondQuestionYes] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedThirdOption, setSelectedThirdOption] = useState('');

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
          setTrailData(data);
        } catch (err) {
          console.error("Failed to fetch free trails:", err);
        }
      };
      fetchTrialData();
    }
  }, [auth, dispatch]);

  const handleFreeTrail = () => {
    if (auth === true && selectedDate && selectedTime) {
      setLoadingEnroll(true);
      const requestData = {
        courseType: "bhajan",
        startTime:
          dayjs(selectedDate).format("YYYY-MM-DD") +
          "T" +
          dayjs(selectedTime, "h:mm A").format("HH:mm:ss"),
        additionalInfo,
        thirdQuestionOption: selectedThirdOption,
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
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOption('');
    setIsSecondQuestionYes(null);
    setAdditionalInfo('');
    setSelectedThirdOption('');
  };

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

            <Box>
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
            </Box>
          </div>
        </section>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle sx={{textAlign:'center', color:theme.palette.primary.main}}>Select Date and Time for 15 Minutes Free Trial Class with Admin</DialogTitle>
          <DialogContent>
            <DatePicker
fullWidth
size='small'
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => (
                <Box component="input" fullWidth {...params.inputProps} />
              )}
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
            >
              {availableTimes.map((time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            <Typography sx={{fontSize:'0.8rem', color:theme.palette.primary.main}}>Time as per your local time </Typography>
            <br/>

            {/* Question 1 */}
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
              {['Hindustani Vocals', 'Bhajan', 'Tabla', 'Ghazal', 'bollywood/Filmy Songs'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            {/* Question 2 */}
            <Typography sx={{ marginTop: 2 }}>Have you learn music somewhere else?</Typography>
            <Select
              value={isSecondQuestionYes}
              onChange={(e) => setIsSecondQuestionYes(e.target.value)}
              displayEmpty
              fullWidth
            size="small"

              renderValue={(value) => (value !== null ? (value ? "Yes" : "No") : "Select an Option")}
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>

            {/* Conditionally render Question 3 */}
            {isSecondQuestionYes === true && (
              <>
                <Typography sx={{ marginTop: 2 }}>From how many years you are learning?</Typography>
                <Select
                size='small'
                  value={selectedThirdOption}
                  onChange={(e) => setSelectedThirdOption(e.target.value)}
                  displayEmpty
                  fullWidth
                  renderValue={(value) => (value ? value : "Select Option")}
                  sx={{ marginBottom: 2 }}
                >
                  {['1 year', '2 year', '3 year', '4 year', '5 year'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}


          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleFreeTrail}
              disabled={!selectedDate || !selectedTime || !selectedOption || (isSecondQuestionYes === true && !selectedThirdOption)}
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
