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
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon
// import {
//   addStudentsTestimonial,
//   getAllTestimonial,
//   getBeginnerCourse,
//   getStudentEnrolledCourses,
//   getStudentTestimonial,
// } from "../../../store/actions/courseActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useSnackbar } from "notistack";

// const Testimonials = () => {
//   const theme = useTheme();
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const studentId = useSelector((state) => state?.auth?.user?._id);
//   console.log(studentId, "ids");

//   const initialValues = {
//     title: "",
//     courseId: "",
//     video: null,
//   };

//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [isAdding, setIsAdding] = useState(false); // State to toggle between form and table view
//   const base = "https://khatribrothersacademy.com:4545";
//   const [testimonialData, setTestimonialData] = useState([]);
//   const [currentCourseId, setCurrentCourseId] = useState(null);
//   const [formValues, setFormValues] = useState(initialValues);
//   const [loading, setLoading] = useState(false);

//   // const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

//   const handleFromData = (e) => {
//     const { name, value } = e.target;
//     setFormValues((formValues) => ({ ...formValues, [name]: value }));
//     console.log("kkkkkkkk", formValues);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await dispatch(getStudentEnrolledCourses());
//         setTestimonialData(res.data.data);
//         console.log("testtimonial  data:", res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch student data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleChange = (event) => {
//     // setSelectedCourse(event.target.value);
//     const selectedId = event.target.value;
//     setSelectedCourse(selectedId);
//     setFormValues((formValues) => ({ ...formValues, courseId: selectedId }));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setFormValues((formValues) => ({ ...formValues, video: file }));
//   };

//   const handleAddTestimonial = () => {
//     setIsAdding(true);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();
//     formData.append("stuName", formValues.title);
//     formData.append("courseId", formValues.courseId);
//     if (formValues.video) {
//       formData.append("video", formValues.video);
//     }

//     dispatch(addStudentsTestimonial(formData))
//       .then((res) => {
//         enqueueSnackbar(res.data.message, { variant: "success" });
//         setFormValues(initialValues);
//       })
//       .catch((error) => {
//         enqueueSnackbar(error.response.data.message, { variant: "error" });
//       });
//   };

//   // const handleCouseClick  = (e , id)=>{
//   //   setCurrentCourseId(id);

//   //   const {name } = e.target;
//   //   setFormValues((formValues)=>({...formValues, [name]: id}))
//   //   console.log('kkkkkkkk' ,formValues);

//   // }
//   // console.log('course test id', currentCourseId);

//   const rows = [
//     {
//       coursename: "Hindustani vocal advanced A series",
//       teacher: "Faraz",
//       image: "/ggg.png",
//     },
//   ];

//   const [allTestimonials, setAllTestimonials] = useState([]);
//   const fetchData = async () => {
//     try {
//       const res = await dispatch(getStudentTestimonial());
//       setAllTestimonials(res.data.data);
//       console.log("testtimonial  data:", res.data.data);
//     } catch (error) {
//       console.error("Failed to fetch all testimonial data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

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
//               Testimonial
//             </Typography>

//             <Box>
//               <Button
//                 variant="outlined"
//                 onClick={handleAddTestimonial}
//                 sx={{
//                   textTransform: "none",
//                   borderRadius: "0px",
//                   fontWeight: 400,
//                   fontSize: isMobile ? "0.8rem" : "1.2rem",
//                 }}
//               >
//                 + Add Testimonial
//               </Button>
//             </Box>
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
//                 <Table
//                   sx={{ minWidth: 650 }}
//                   size="small"
//                   aria-label="a dense table"
//                 >
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Title</TableCell>
//                       <TableCell>Course name</TableCell>
//                       <TableCell>Video</TableCell>
//                       <TableCell>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {allTestimonials.map((row) => (
//                       <TableRow
//                         key={row._id}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                           paddingBottom: "1rem",
//                           alignItems: "start",
//                         }}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ color: "grey" }}
//                         >
//                           {row.stuName}
//                         </TableCell>
//                         <TableCell sx={{ color: "grey" }}>
//                           {row.courseId.title}
//                         </TableCell>
//                         <TableCell sx={{ color: "grey" }}>
//                           <Box>
//                             <img
//                               src={`${base}${row.video.replace(/ /g, "%20")}`}
//                               alt=""
//                               width={"200px"}
//                               height="100vh"
//                             />
//                           </Box>
//                         </TableCell>

//                         <TableCell
//                           sx={{
//                             color: row.status ? "green" : "red",
//                             fontWeight: 600,
//                           }}
//                         >
//                           {row.status ? "Reviewed" : "Under-Review"}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </>
//           )}
//         </>
//       ) : (
//         <Card
//           sx={{
//             boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//             position: "relative", // Position relative for the close button
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
//                 Student Name
//               </Typography>

//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Enter your title"
//                 sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
//                 name="title"
//                 value={formValues.title}
//                 onChange={handleFromData}
//               />

//               <br />

//               <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
//                 Course Name
//               </Typography>

//               <FormControl
//                 fullWidth
//                 size="small"
//                 sx={{ marginBottom: "0.8rem" }}
//               >
//                 <Select
//                   value={selectedCourse}
//                   onChange={handleChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select
//                   </MenuItem>
//                   {testimonialData.map((course, index) => (
//                     <MenuItem
//                       key={index}
//                       value={course.courseId._id}
//                       // onClick={(events)=>handleCouseClick(events, course.courseId._id)}
//                       name="courseId"
//                     >
//                       {course.courseId.title}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <br />

//               <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
//                 Add Video
//               </Typography>

//               <Box
//                 sx={{
//                   width: "100%",
//                   border: "1px solid #7c7c7c",
//                   borderRadius: "3px",
//                   color: "grey",
//                   padding: "0.5rem",
//                 }}
//               >
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={handleVideoChange}
//                 />
//               </Box>

//               <br />
//               <br />

//               <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleCancel}
//                   fullWidth
//                   sx={{
//                     borderRadius: "0px",
//                     padding: "0.7rem 0rem",
//                     textTransform: "none",
//                   }}
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{
//                     borderRadius: "0px",
//                     textTransform: "none",
//                     fontWeight: "400",
//                     padding: "0.7rem 0rem",
//                   }}
//                   onClick={handleSubmit}
//                 >
//                   Add
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default Testimonials;



import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useSnackbar } from "notistack";
import { getStudentEnrolledCourses, getStudentTestimonial } from "../../../store/actions/courseActions";
import AddTStudentTestimonial from "./AddStudentTestimonial"; // Import the new component
import { useNavigate } from "react-router";

const Testimonials = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false);
  const base = "https://khatribrothersacademy.com:4545";
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTestimonials, setAllTestimonials] = useState([]);

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await dispatch(getStudentTestimonial());
      setAllTestimonials(res.data.data);
    setLoading(false)

    } catch (error) {
      console.error("Failed to fetch all testimonial data", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getStudentEnrolledCourses());
        setTestimonialData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchData();
  }, [dispatch]);

  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

    // Fetch instructor data after coming back from AddInstructor
    useEffect(() => {
      if (!isAdding) {
        fetchData(); // Trigger the API call again
      }
    }, [isAdding]);


  return (
    <Box>
      {!isAdding ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: "550", fontSize: isMobile ? "1.5rem" : "2rem" }}>
              Testimonial
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} gap={3}>


        <Button sx={{ textTransform: "none" }} variant="outlined" onClick={() => navigate("/")}>
            Go to Website
          </Button>
          <Button
              variant="outlined"
              onClick={handleAddTestimonial}
              sx={{
                textTransform: "none",
                // borderRadius: "0px",
                fontWeight: 400,
                // fontSize: isMobile ? "0.8rem" : "1rem",
              }}
            >
              + Add Testimonial
            </Button>

        </Box>

          </Box>

          <br />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
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
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Course name</TableCell>
                      <TableCell>Video</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTestimonials.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          paddingBottom: "1rem",
                          alignItems: "start",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "grey" }}
                        >
                          {row.stuName}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          {row.courseId.title}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          <Box>
                            <video
                              src={`${base}${row.video.replace(/ /g, "%20")}`}
                              controls
                              width={"250px"}
                              height="100vh"
                            />
                          </Box>
                        </TableCell>

                        <TableCell
                          sx={{
                            color: row.status ? "green" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {row.status ? "Reviewed" : "Under-Review"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      ) : (
        <AddTStudentTestimonial testimonialData={testimonialData} handleCancel={handleCancel} />
      )}
    </Box>
  );
};

export default Testimonials;
