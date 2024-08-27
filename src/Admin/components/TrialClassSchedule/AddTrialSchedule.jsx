// import React, { useState } from "react";
// import { TextField, Button, Box, Card, Typography } from "@mui/material";
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

//   const now = dayjs();
//   const endRange = now.add(2, "day");

//   const handleSubmit = () => {
//     if (!selectedDate || !selectedTime) {
//       console.error("Please select both date and time.");
//       return;
//     }

//     const selectedDateTime = dayjs(
//       `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format("HH:mm:ss")}`
//     );

//     const isValidDate = selectedDateTime.isBetween(now, endRange, null, "[]");

//     if (isValidDate && selectedDateTime.isAfter(now)) {
//       const formatedTime = selectedDateTime.format("YYYY-MM-DDTHH:mm:ss");
//       const formatedTimehaha = new Date(formatedTime);
//       const res = dispatch(trialDateAdmin(formatedTime))
//         .then((res) =>
//           enqueueSnackbar(res.data.message, { variant: "success" })
//         )
//         .catch((err) =>
//           enqueueSnackbar(err.response.data.message, { variant: "error" })
//         );
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
//             sx={{ width: "100%" }}
//             onClick={handleSubmit}
//           >
//             Submit
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
  const [loading, setLoading] = useState(false); // Loading state

  const now = dayjs();
  const endRange = now.add(2, "day");

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      enqueueSnackbar("Please select both date and time.", {variant:'error'});
      return;
    }

    const selectedDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")}T${selectedTime.format("HH:mm:ss")}`
    );

    const isValidDate = selectedDateTime.isBetween(now, endRange, null, "[]");

    if (isValidDate && selectedDateTime.isAfter(now)) {
      setLoading(true); // Start loading
      const formatedTime = selectedDateTime.format("YYYY-MM-DDTHH:mm:ss");
      dispatch(trialDateAdmin(formatedTime))
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
          setSelectedDate(null); // Reset DatePicker
          setSelectedTime(null);
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    } else {
      enqueueSnackbar("Selected Time is in the past.", { variant: "error" });
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
            disabled={loading} // Disable button while loading
          >


{loading ? <CircularProgress size={24} sx={{}} /> : 'Submit'}


          </Button>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTrialSchedule;
