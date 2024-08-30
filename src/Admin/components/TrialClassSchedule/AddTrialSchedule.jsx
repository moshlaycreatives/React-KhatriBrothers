// import React, { useState } from "react";
// import { TextField, Button, Box, Card, Typography, CircularProgress } from "@mui/material";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { trialDateAdmin } from "../../../store/actions/courseActions";
// import { useDispatch } from "react-redux";
// import { enqueueSnackbar } from "notistack";

// dayjs.extend(isBetween);
// dayjs.extend(customParseFormat);

// const AddTrialSchedule = () => {
//   const dispatch = useDispatch();

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const now = dayjs();
//   const endRange = now.add(2, "day");

//   const handleSubmit = () => {
//     if (!selectedDate || !selectedTime) {
//       enqueueSnackbar("Please select both date and time.", {variant:'error'});
//       return;
//     }

//     const selectedDateTime = dayjs(
//       `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format("HH:mm:ss")}`
//     );

//     const isValidDate = selectedDateTime.isBetween(now, endRange, null, "[]");

//     if (isValidDate && selectedDateTime.isAfter(now)) {
//       setLoading(true);
//       const formatedTime = selectedDateTime.format("YYYY-MM-DDTHH:mm:ss");
//       dispatch(trialDateAdmin(formatedTime))
//         .then((res) => {
//           enqueueSnackbar(res.data.message, { variant: "success" });
//           setSelectedDate(null);
//           setSelectedTime(null);
//         })
//         .catch((err) => {
//           enqueueSnackbar(err.response.data.message, { variant: "error" });
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       enqueueSnackbar("Selected Time is in the past.", { variant: "error" });
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "50vh",
//           flexDirection: "column",
//         }}
//       >
//         <Card sx={{ padding: "5rem" }}>
//           <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
//             Select Date
//           </Typography>
//           <DatePicker
//             value={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             minDate={now}
//             maxDate={now.add(2, "day")}
//             renderInput={(params) => <TextField {...params} />}
//           />
//           <br />
//           <br />

//           <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
//             Select Time
//           </Typography>

//           <TimePicker
//             label="Select Time"
//             value={selectedTime}
//             onChange={(time) => setSelectedTime(time)}
//             renderInput={(params) => <TextField {...params} />}
//           />
//           <br />
//           <br />
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ width: "100%", position: "relative" }}
//             onClick={handleSubmit}
//             disabled={loading}
//           >


// {loading ? <CircularProgress size={24} sx={{}} /> : 'Submit'}


//           </Button>
//         </Card>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default AddTrialSchedule;



import React, { useState } from "react";
import { TextField, Button, Box, Card, Typography, CircularProgress } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { trialDateAdmin } from "../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

const AddTrialSchedule = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const now = dayjs();
  const endRange = now.add(2, "day");

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      enqueueSnackbar("Please select both date and time.", { variant: 'error' });
      return;
    }

    // Combine the selected date and time
    const selectedDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format("HH:mm:ss")}`
    );

    // Get current time and time zone
    const currentTimeZone = dayjs().format('Z'); // ISO 8601 time zone offset, e.g., +05:00

    console.log("Current Time:", now.format());
    console.log("Current Time Zone:", currentTimeZone);

    // Check if selectedDateTime is within the allowed range
    const isValidDate = selectedDateTime.isBetween(now, endRange, null, "[]");

    if (isValidDate && selectedDateTime.isAfter(now)) {
      setLoading(true);

      // Format time with the time zone included
      const formattedTime = selectedDateTime.format(`YYYY-MM-DDTHH:mm:ss${currentTimeZone}`);

      dispatch(trialDateAdmin(formattedTime))
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
          setSelectedDate(null);
          setSelectedTime(null);
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      enqueueSnackbar("Selected Time is in the past or out of range.", { variant: "error" });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          flexDirection: "column",
        }}
      >
        <Card sx={{ padding: "5rem" }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
            Select Date
          </Typography>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={now}
            maxDate={now.add(2, "day")}
            renderInput={(params) => <TextField {...params} />}
          />
          <br />
          <br />

          <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
            Select Time
          </Typography>

          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            renderInput={(params) => <TextField {...params} />}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", position: "relative" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-12px", marginTop: "-12px" }} /> : 'Submit'}
          </Button>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTrialSchedule;
