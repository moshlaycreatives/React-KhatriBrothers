// import {
//   Box,
//   Card,
//   TextField,
//   Button,
//   Typography,
//   useTheme,
//   Divider,
// } from "@mui/material";
// import React, { useState } from "react";
// import { useSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
// import {
//   addAdminTrail,
//   createClass,
// } from "../../../../store/actions/courseActions";


// const AddTrailForStudent = ({ rowData }) => {
//   const theme = useTheme();

//   console.log(rowData._id, "id row");
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();

//   const initialValues = {
//     date: "",
//     startTime: "",
//     link: "",
//   };

//   const [formValues, setFormValues] = useState(initialValues);
//   const [loading, setLoading] = useState(false);

//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setFormValues((formValues) => ({ ...formValues, [name]: value }));
//   };

//   const formatDateTime = (date, time) => {
//     if (!date || !time) return "";
//     const [hours, minutes] = time.split(":");
//     const dateTimeLocal = new Date(`${date}T${hours}:${minutes}:00`);
//     const localOffset = dateTimeLocal.getTimezoneOffset() * 60000;
//     const localDateTime = new Date(dateTimeLocal.getTime() - localOffset);
//     const formattedDateTime = localDateTime.toISOString().slice(0, -1); // Remove 'Z'
//     return formattedDateTime;
//   };

//   const handleSubmit = async () => {
//     const startDateTime = formatDateTime(formValues.date, formValues.startTime);

//     const formData = {
//       date: startDateTime,
//       startTime: startDateTime,
//       link: formValues.link,
//     };

//     try {
//       const res = await dispatch(addAdminTrail(rowData._id, formData));
//       enqueueSnackbar(res.data.message, { variant: "success" });
//       setFormValues(initialValues);
//     } catch (error) {
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//       console.error("Error creating class:", error);
//     }
//   };

//   return (
//     <Box>
//       <Typography
//         sx={{
//           color: theme.palette.primary.main,
//           fontSize: "1.5rem",
//           fontWeight: 600,
//         }}
//       >
//         Schedule The Free Trail{" "}
//       </Typography>
//       <br />
//       <Card sx={{ padding: "2rem" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "1.1rem",
//                 color: theme.palette.primary.main,
//                 fontWeight: 600,
//               }}
//             >
//               Student Name
//             </Typography>
//             <Typography>
//               {rowData.studentId.firstName} {rowData.studentId.lastName}
//             </Typography>
//           </Box>

//           <Box>
//             <br />
//             <Typography
//               sx={{
//                 fontSize: "1.1rem",
//                 color: theme.palette.primary.main,
//                 fontWeight: 600,
//               }}
//             >
//               Course Type
//             </Typography>
//             <Typography>{rowData.courseType}</Typography>
//           </Box>

//           <Box>
//             <br />
//             <Typography
//               sx={{
//                 fontSize: "1.1rem",
//                 color: theme.palette.primary.main,
//                 fontWeight: 600,
//               }}
//             ></Typography>
//             <Typography></Typography>
//           </Box>
//         </Box>

//         <br />
//         <br />

//         <Box sx={{ padding: "1rem" }}>
//           <Box>
//             <Typography variant="subtitle1">Date</Typography>
//             <TextField
//               type="date"
//               variant="outlined"
//               fullWidth
//               size="small"
//               name="date"
//               value={formValues.date}
//               onChange={handleFormData}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Box>

//           <br />

//           <Box>
//             <Typography variant="subtitle1">Start Time</Typography>
//             <TextField
//               type="time"
//               variant="outlined"
//               fullWidth
//               name="startTime"
//               size="small"
//               value={formValues.startTime}
//               onChange={handleFormData}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Box>

//           <br />

//           <Box>
//             <Typography variant="subtitle1">Trail Link</Typography>
//             <TextField
//               type="text"
//               variant="outlined"
//               fullWidth
//               size="small"
//               name="link"
//               value={formValues.link}
//               onChange={handleFormData}
//               placeholder="Zoom link"
//             />
//           </Box>

//           <br />

//           <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
//             <Box sx={{ width: "50%" }}>
//               <Button
//                 variant="outlined"
//                 onClick={() => setFormValues(initialValues)}
//                 sx={{ width: "100%" }}
//               >
//                 Cancel
//               </Button>
//             </Box>
//             <Box sx={{ width: "50%" }}>
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 sx={{ width: "100%" }}
//               >
//                 Create
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default AddTrailForStudent;




import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    useTheme,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useSnackbar } from "notistack";
  import { useDispatch } from "react-redux";
  import {
    addAdminTrail,
  } from "../../../../store/actions/courseActions";

  const AddTrailForStudent = ({ rowData }) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const initialValues = {
      // date: "",
      // startTime: "",
      link: "",
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleFormData = (e) => {
      const { name, value } = e.target;
      setFormValues((formValues) => ({ ...formValues, [name]: value }));
    };

    const formatDateTime = (date, time) => {
      if (!date || !time) return "";
      const [hours, minutes] = time.split(":");
      const dateTimeLocal = new Date(`${date}T${hours}:${minutes}:00`);
      const localOffset = dateTimeLocal.getTimezoneOffset() * 60000;
      const localDateTime = new Date(dateTimeLocal.getTime() - localOffset);
      const formattedDateTime = localDateTime.toISOString().slice(0, -1); // Remove 'Z'
      return formattedDateTime;
    };

    const handleSubmit = async () => {
      // Clear previous errors
      setErrors({});

      // Validate form
      const newErrors = {};
      // if (!formValues.date) newErrors.date = "Date is required";
      // if (!formValues.startTime) newErrors.startTime = "Start time is required";
      if (!formValues.link) newErrors.link = "Trail link is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        enqueueSnackbar("Please fill required field.", { variant: "error" });
        return;
      }

      setLoading(true); // Start loading
      const startDateTime = formatDateTime(formValues.date, formValues.startTime);

      const formData = {
        // date: startDateTime,
        // startTime: startDateTime,
        link: formValues.link,
      };

      try {
        const res = await dispatch(addAdminTrail(rowData._id, formData));
        enqueueSnackbar(res.data.message, { variant: "success" });
        setFormValues(initialValues);
        setLoading(false)
      } catch (error) {
        enqueueSnackbar(error.response.data.message || "An error occurred", { variant: "error" });
        setLoading(false)

        console.error("Error creating class:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    return (
      <Box>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          Schedule The Free Trial Class
        </Typography>
        <br />
        <Card sx={{ padding: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                Student Name
              </Typography>
              <Typography>
                {rowData.studentId.firstName} {rowData.studentId.lastName}
              </Typography>
            </Box>

            <Box>
              <br />
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                {/* Course Type */}
              </Typography>
              {/* <Typography>{rowData.courseType}</Typography> */}
            </Box>
          </Box>

          <br />
          <br />

          <Box sx={{ padding: "1rem" }}>


            {/* <Box>
              <Typography variant="subtitle1">Date</Typography>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                size="small"
                name="date"
                value={formValues.date}
                onChange={handleFormData}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Box> */}

            <br />

            {/* <Box>
              <Typography variant="subtitle1">Start Time</Typography>
              <TextField
                type="time"
                variant="outlined"
                fullWidth
                name="startTime"
                size="small"
                value={formValues.startTime}
                onChange={handleFormData}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.startTime}
                helperText={errors.startTime}
              />
            </Box> */}



            <Box>
              <Typography variant="subtitle1">Trial class link</Typography>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                size="small"
                name="link"
                value={formValues.link}
                onChange={handleFormData}
                placeholder="Enter Trial class link"
                error={!!errors.link}
                helperText={errors.link}
              />
            </Box>

            <br />

            <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
              <Box sx={{ width: "50%" }}>
                <Button
                  variant="outlined"
                  onClick={() => setFormValues(initialValues)}
                  sx={{ width: "100%" }}
                  disabled={loading} // Disable button while loading
                >
                  Cancel
                </Button>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ width: "100%" }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Creating..." : "Create"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  };

  export default AddTrailForStudent;
