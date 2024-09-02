// import { useTheme } from "@emotion/react";
// import {
//   Box,
//   Button,
//   Card,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   useMediaQuery,
//   TableContainer,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch, useSelector } from "react-redux";
// import { useSnackbar } from "notistack";
// import {
//   createClass,
//   getAllGroups,
//   getAssignedCourses,
// } from "../../../../store/actions/courseActions";
// import dayjs from "dayjs";

// const AddClass = () => {
//   const theme = useTheme();
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const initialValues = {
//     title: "",

//     courseId: "",
//     zoomLink: "",
//     classType: "",
//     group: "",
//     student: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//   };
//   const InstructorId = useSelector((state) => state?.auth?.user?._id);

//   const [isAdding, setIsAdding] = useState(false);
//   const [coursesData, setCoursesData] = useState([]);
//   const [groupData, setGroupData] = useState([]);

//   const [formValues, setFormValues] = useState(initialValues);
//   const [loading, setLoading] = useState(false);

//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setFormValues((formValues) => ({ ...formValues, [name]: value }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await dispatch(getAssignedCourses(InstructorId));
//         setCoursesData(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchGroupData = async () => {
//       try {
//         const res = await dispatch(getAllGroups());
//         setGroupData(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       }
//     };

//     fetchGroupData();
//   }, [dispatch]);

//   const handleClassTypeChange = (event) => {
//     const selectedType = event.target.value;
//     setFormValues((formValues) => ({ ...formValues, classType: selectedType }));
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//   };

//   const formatDateTime = (date, time) => {
//     if (!date || !time) return "";

//     const currentTimeZone = dayjs().format('Z'); // ISO 8601 time zone offset, e.g., +05:00


//     console.log("Current Time Zone:", currentTimeZone);

//     // Create a Date object from the provided date and time
//     const [hours, minutes] = time.split(":");
//     const dateTimeLocal = new Date(`${date}T${hours}:${minutes}:00 ${currentTimeZone}`);
// console.log(dateTimeLocal, 'date time local')
//     return dateTimeLocal;
//   };

//   const handleSubmit = async () => {
//     const startDateTime = formatDateTime(formValues.date, formValues.startTime);
//     const endDateTime = formatDateTime(formValues.date, formValues.endTime);

//     console.log(startDateTime, "start time");
//     console.log(endDateTime, "end time");

//     const formData = {
//       courseType: formValues.classType,
//       group: formValues.classType === "group" ? formValues.group : undefined,
//       studentId:
//         formValues.classType === "one2one" ? formValues.student : undefined,
//       courseId: formValues.courseId,
//       zoomLink: formValues.zoomLink,
//       title: formValues.title,

//       date: startDateTime, // Use the formatted local time with time zone
//       startTime: startDateTime,
//       endTime: endDateTime,
//     };

//     // Remove undefined properties
//     Object.keys(formData).forEach(
//       (key) => formData[key] === undefined && delete formData[key]
//     );

//     try {
//       await dispatch(createClass(formData));
//       enqueueSnackbar("Class created successfully!", { variant: "success" });
//       setFormValues(initialValues);
//     } catch (error) {
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//     }
//   };

//   // const handleSubmit = async () => {
//   //   const formatDateTime = (date, time) => {
//   //     if (!date || !time) return "";
//   //     const [hours, minutes] = time.split(":");
//   //     const dateTimeLocal = new Date(`${date}T${hours}:${minutes}:00`);
//   //     const localOffset = dateTimeLocal.getTimezoneOffset() * 60000;
//   //     const localDateTime = new Date(dateTimeLocal.getTime() - localOffset);
//   //     const formattedDateTime = localDateTime.toISOString().slice(0, -1); // Remove 'Z'

//   //     return formattedDateTime;
//   //   };

//   //   const startDateTime = formatDateTime(formValues.date, formValues.startTime);
//   //   const endDateTime = formatDateTime(formValues.date, formValues.endTime);

//   //   console.log(startDateTime, 'd\te time start')

//   //   const formData = {
//   //     courseType: formValues.classType,
//   //     group: formValues.classType === "group" ? formValues.group : undefined,
//   //     studentId:
//   //       formValues.classType === "one2one" ? formValues.student : undefined,
//   //     courseId: formValues.courseId,
//   //     zoomLink: formValues.zoomLink,
//   //     title: formValues.title,

//   //     date: startDateTime,
//   //     startTime: startDateTime,
//   //     endTime: endDateTime,
//   //   };

//   //   Object.keys(formData).forEach(
//   //     (key) => formData[key] === undefined && delete formData[key]
//   //   );

//   //   try {
//   //     await dispatch(createClass(formData));
//   //     enqueueSnackbar("Class created successfully!", { variant: "success" });
//   //     setFormValues(initialValues);
//   //   } catch (error) {
//   //     enqueueSnackbar(error.response.data.message, { variant: "error" });
//   //   }
//   // };

//   return (
//     <Box>
//       {!isAdding ? (
//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: theme.palette.primary.main,
//                 fontWeight: "550",
//                 fontSize: isMobile ? "1.5rem" : "2rem",
//               }}
//             >
//               Create Class
//             </Typography>
//           </Box>

//           <br />

//           {loading ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "50vh",
//               }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             <>
//               <TableContainer
//                 component={Paper}
//                 sx={{
//                   padding: "1rem 1rem",
//                   boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <Typography sx={{ fontWeight: "600", fontSize: "1.1rem" }}>
//                   Add Details
//                 </Typography>
//                 <br />
//                 <br />

//                 <Box>
//                   <Typography variant="subtitle1">Class Name</Typography>
//                   <TextField
//                     type="text"
//                     variant="outlined"
//                     fullWidth
//                     size="small"
//                     name="title"
//                     value={formValues.title}
//                     onChange={handleFormData}
//                     placeholder="Enter Class Name"
//                   />
//                 </Box>
//                 <br />
//                 <Typography>Select Course</Typography>

//                 <FormControl fullWidth size="small">
//                   <Select
//                     labelId="course-select-label"
//                     id="course-select"
//                     name="courseId"
//                     value={formValues.courseId}
//                     onChange={handleFormData}
//                   >
//                     {coursesData.map((course) => (
//                       <MenuItem
//                         key={course.courseId._id}
//                         value={course.courseId._id}
//                       >
//                         {course.courseId.title}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <br />
//                 <br />

//                 <Box>
//                   <Typography>Class Type</Typography>
//                   <FormControl fullWidth size="small">
//                     <Select
//                       labelId="class-type-select-label"
//                       id="class-type-select"
//                       name="classType"
//                       value={formValues.classType}
//                       onChange={handleClassTypeChange}
//                     >
//                       <MenuItem value={"group"}>Group</MenuItem>
//                       <MenuItem value={"one2one"}>One to One</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <br />
//                 {formValues.classType === "group" && (
//                   <Box>
//                     <Typography>Select Group</Typography>
//                     <FormControl fullWidth size="small">
//                       <Select
//                         labelId="group-select-label"
//                         id="group-select"
//                         name="group"
//                         value={formValues.group}
//                         onChange={handleFormData}
//                       >
//                         {groupData
//                           .filter((group) => group.students.length > 0) // Filter groups where the number of students is greater than 0
//                           .map((group) => (
//                             <MenuItem key={group._id} value={group._id}>
//                               {group.name}
//                             </MenuItem>
//                           ))}
//                       </Select>
//                     </FormControl>
//                   </Box>
//                 )}

//                 {formValues.classType === "one2one" && (
//                   <Box>
//                     <Typography>Select Student</Typography>
//                     <FormControl fullWidth size="small">
//                       <Select
//                         labelId="student-select-label"
//                         id="student-select"
//                         name="student"
//                         value={formValues.student}
//                         onChange={handleFormData}
//                       >
//                         {coursesData.map((student) => (
//                           <MenuItem
//                             key={student.studentId._id}
//                             value={student.studentId._id}
//                           >
//                             {student.studentId.firstName}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Box>
//                 )}

//                 <br />

//                 <Box>
//                   <Typography variant="subtitle1">Date</Typography>
//                   <TextField
//                     type="date"
//                     variant="outlined"
//                     fullWidth
//                     size="small"
//                     name="date"
//                     value={formValues.date}
//                     onChange={handleFormData}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Box>

//                 <br />

//                 <Box>
//                   <Typography variant="subtitle1">Start Time</Typography>
//                   <TextField
//                     type="time"
//                     variant="outlined"
//                     fullWidth
//                     name="startTime"
//                     size="small"
//                     value={formValues.startTime}
//                     onChange={handleFormData}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Box>

//                 <br />

//                 <Box>
//                   <Typography variant="subtitle1">End Time</Typography>
//                   <TextField
//                     type="time"
//                     variant="outlined"
//                     fullWidth
//                     name="endTime"
//                     size="small"
//                     value={formValues.endTime}
//                     onChange={handleFormData}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Box>

//                 <br />

//                 <Box>
//                   <Typography variant="subtitle1">Zoom Link</Typography>
//                   <TextField
//                     type="text"
//                     variant="outlined"
//                     fullWidth
//                     size="small"
//                     name="zoomLink"
//                     value={formValues.zoomLink}
//                     onChange={handleFormData}
//                     placeholder="Zoom link"
//                   />
//                 </Box>
//                 <br />
//                 <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
//                   <Box sx={{ width: "50%" }}>
//                     <Button
//                       variant="outlined"
//                       onClick={handleCancel}
//                       sx={{ width: "100%" }}
//                     >
//                       Cancel
//                     </Button>
//                   </Box>
//                   <Box sx={{ width: "50%" }}>
//                     <Button
//                       variant="contained"
//                       onClick={handleSubmit}
//                       sx={{ width: "100%" }}
//                     >
//                       Create
//                     </Button>
//                   </Box>
//                 </Box>
//               </TableContainer>
//             </>
//           )}
//         </>
//       ) : (
//         <Card
//           sx={{
//             boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//             position: "relative",
//           }}
//         >
//           <CloseIcon
//             onClick={handleCancel}
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               cursor: "pointer",
//             }}
//           />
//           <Box sx={{ padding: "1.2rem" }}>
//             <Typography sx={{ fontWeight: "600" }}>Add Details</Typography>
//             <br />
//             <form>
//               <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
//                 Title
//               </Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Enter your title"
//                 sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
//                 name="title"
//                 value={formValues.title}
//                 onChange={handleFormData}
//               />
//               <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   sx={{ width: "100%" }}
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{ width: "100%" }}
//                   onClick={handleSubmit}
//                 >
//                   Create
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default AddClass;

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  createClass,
  getAllGroups,
  getAssignedCourses,
} from "../../../../store/actions/courseActions";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const AddClass = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    title: "",
    courseId: "",
    zoomLink: "",
    classType: "",
    group: "",
    student: "",
    date: "",
    startTime: "",
    endTime: "",
  };

  const InstructorId = useSelector((state) => state?.auth?.user?._id);

  const [isAdding, setIsAdding] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getAssignedCourses(InstructorId));
        setCoursesData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, InstructorId]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await dispatch(getAllGroups());
        setGroupData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchGroupData();
  }, [dispatch]);

  const handleClassTypeChange = (event) => {
    const selectedType = event.target.value;
    setFormValues((formValues) => ({ ...formValues, classType: selectedType }));
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const getTimeZoneOffset = () => {
    const offset = dayjs().utcOffset(); // Returns the offset in minutes
    const sign = offset > 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "";

    const [hours, minutes] = time.split(":");
    const timeZoneOffset = getTimeZoneOffset(); // Get the timezone offset

    // Create a dayjs object with the selected date and time
    const dateTimeLocal = dayjs(`${date}T${hours}:${minutes}:00`).format(`YYYY-MM-DDTHH:mm:ss${timeZoneOffset}`);

    return dateTimeLocal; // This will return a formatted date-time string with timezone offset
  };


  const handleSubmit = async () => {
    const startDateTime = formatDateTime(formValues.date, formValues.startTime);
    const endDateTime = formatDateTime(formValues.date, formValues.endTime);
    // Get the time zone

    const formData = {
      courseType: formValues.classType,
      group: formValues.classType === "group" ? formValues.group : undefined,
      studentId: formValues.classType === "one2one" ? formValues.student : undefined,
      courseId: formValues.courseId,
      zoomLink: formValues.zoomLink,
      title: formValues.title,
      date: startDateTime,
      startTime: startDateTime,
      endTime: endDateTime,
       // Include time zone information
    };

    // Remove undefined properties
    Object.keys(formData).forEach(
      (key) => formData[key] === undefined && delete formData[key]
    );

    try {
      await dispatch(createClass(formData));
      enqueueSnackbar("Class created successfully!", { variant: "success" });
      setFormValues(initialValues);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error creating class', { variant: "error" });
    }
  };

  return (
    <Box>
      {!isAdding ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "550",
                fontSize: isMobile ? "1.5rem" : "2rem",
              }}
            >
              Create Class
            </Typography>
          </Box>

          <br />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  padding: "1rem 1rem",
                  boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  Add Details
                </Typography>
                <br />
                <br />

                <Box>
                  <Typography variant="subtitle1">Class Name</Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="title"
                    value={formValues.title}
                    onChange={handleFormData}
                    placeholder="Enter Class Name"
                  />
                </Box>
                <br />
                <Typography>Select Course</Typography>

                <FormControl fullWidth size="small">
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    name="courseId"
                    value={formValues.courseId}
                    onChange={handleFormData}
                  >
                    {coursesData.map((course) => (
                      <MenuItem
                        key={course.courseId._id}
                        value={course.courseId._id}
                      >
                        {course.courseId.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <br />
                <br />

                <Box>
                  <Typography>Class Type</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="class-type-select-label"
                      id="class-type-select"
                      name="classType"
                      value={formValues.classType}
                      onChange={handleClassTypeChange}
                    >
                      <MenuItem value={"group"}>Group</MenuItem>
                      <MenuItem value={"one2one"}>One to One</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <br />
                {formValues.classType === "group" && (
                  <Box>
                    <Typography>Select Group</Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="group-select-label"
                        id="group-select"
                        name="group"
                        value={formValues.group}
                        onChange={handleFormData}
                      >
                        {groupData
                          .filter((group) => group.students.length > 0) // Filter groups where the number of students is greater than 0
                          .map((group) => (
                            <MenuItem key={group._id} value={group._id}>
                              {group.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                {formValues.classType === "one2one" && (
                  <Box>
                    <Typography>Select Student</Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="student-select-label"
                        id="student-select"
                        name="student"
                        value={formValues.student}
                        onChange={handleFormData}
                      >
                        {coursesData.map((student) => (
                          <MenuItem
                            key={student.studentId._id}
                            value={student.studentId._id}
                          >
                            {student.studentId.firstName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <br />

                <Box>
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
                  />
                </Box>

                <br />

                <Box>
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
                  />
                </Box>

                <br />

                <Box>
                  <Typography variant="subtitle1">End Time</Typography>
                  <TextField
                    type="time"
                    variant="outlined"
                    fullWidth
                    name="endTime"
                    size="small"
                    value={formValues.endTime}
                    onChange={handleFormData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <br />

                <Box>
                  <Typography variant="subtitle1">Zoom Link</Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="zoomLink"
                    value={formValues.zoomLink}
                    onChange={handleFormData}
                    placeholder="Zoom link"
                  />
                </Box>
                <br />
                <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                  <Box sx={{ width: "50%" }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ width: "100%" }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ width: "100%" }}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </TableContainer>
            </>
          )}
        </>
      ) : (
        <Card
          sx={{
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <CloseIcon
            onClick={handleCancel}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
            }}
          />
          <Box sx={{ padding: "1.2rem" }}>
            <Typography sx={{ fontWeight: "600" }}>Add Details</Typography>
            <br />
            <form>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Title
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your title"
                sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
                name="title"
                value={formValues.title}
                onChange={handleFormData}
              />
              <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default AddClass;