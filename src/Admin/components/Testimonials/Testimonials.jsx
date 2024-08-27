// import { useTheme } from "@emotion/react";
// import {
//   Box,
//   Button,
//   Card,
//   CircularProgress,
//   FormControl,
//   IconButton,
//   InputLabel,
//   Menu,
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
// import { IoIosArrowDown } from "react-icons/io";
// import {
//   acceptTestimonial,
//   getAllTestimonial,
// } from "../../../store/actions/courseActions";
// import { useDispatch } from "react-redux";
// import { enqueueSnackbar } from "notistack";

// const Testimonials = () => {
//   const base = "http://16.171.98.198:4545";
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [isAdding, setIsAdding] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [allTestimonial, setAllTestimonial] = useState([]);
//   const [testimonialStatus, setTestimonialStatus] = useState("");

//   const courses = ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"];

//   const handleChange = (event) => {
//     setSelectedCourse(event.target.value);
//   };

//   const handleAddTestimonial = () => {
//     setIsAdding(true);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//   };

//   const handlePendingClose = () => {
//     setAnchorEl(null);
//   };
//   const handleMenuClick = (event) => [setAnchorEl(event.currentTarget)];

//   const fetchData = async () => {
//     try {
//       const res = await dispatch(getAllTestimonial());
//       setAllTestimonial(res.data.data);
//       console.log("testtimonial  data:", res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch all testimonial data", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log("nenwnewnn", allTestimonial);

//   const handleTestimonialStatus = (events, id) => {
//     setAnchorEl(null);

//     dispatch(acceptTestimonial(id))
//       .then((res) => {
//         enqueueSnackbar(res.data.message, { variant: "success" });
//         fetchData();
//       })
//       .catch((err) => {
//         enqueueSnackbar(err.data.message, { variant: "Error" });
//       });
//   };

//   if (loading) {
//     return (
//       <>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "80vh",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       </>
//     );
//   }

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
//               Students Testimonial
//             </Typography>

//             <Box></Box>
//           </Box>

//           <br />

//           <TableContainer
//             component={Paper}
//             sx={{
//               padding: "1rem 1rem",
//               boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Table
//               sx={{ minWidth: 650 }}
//               size="small"
//               aria-label="a dense table"
//             >
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Student Name</TableCell>
//                   <TableCell>Course name</TableCell>
//                   <TableCell>Attachment</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {allTestimonial.map((row) => (
//                   <TableRow
//                     key={row._id}
//                     sx={{
//                       "&:last-child td, &:last-child th": { border: 0 },
//                       paddingBottom: "1rem",
//                       alignItems: "start",
//                     }}
//                   >
//                     <TableCell
//                       component="th"
//                       scope="row"
//                       sx={{ color: "grey" }}
//                     >
//                       {row.stuName}
//                     </TableCell>
//                     <TableCell sx={{ color: "grey" }}>
//                       {row.courseId.title}
//                     </TableCell>
//                     <TableCell sx={{ color: "grey" }}>
//                       <Box>
//                         <video
//                           src={`${base}${row.video.replace(/ /g, "%20")}`}
//                           alt=""
//                           width={"200px"}
//                           style={{ height: "100px" }}
//                           controls
//                         />
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {row.status ? (
//                         <Typography sx={{ color: "green" }}>
//                           Approved
//                         </Typography>
//                       ) : (
//                         <>
//                           <Button
//                             sx={{ color: "grey", textTransform: "none" }}
//                             onClick={(event) => handleMenuClick(event)}
//                           >
//                             pending
//                             <IconButton
//                               sx={{
//                                 fontSize: "1rem",
//                               }}
//                             >
//                               <IoIosArrowDown />
//                             </IconButton>
//                           </Button>
//                           <Menu
//                             anchorEl={anchorEl}
//                             open={Boolean(anchorEl)}
//                             onClose={handlePendingClose}
//                           >
//                             <MenuItem
//                               onClick={(events) =>
//                                 handleTestimonialStatus(events, row._id)
//                               }
//                             >
//                               Approve
//                             </MenuItem>
//                           </Menu>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
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
//                 Title
//               </Typography>

//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Enter your title"
//                 sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
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
//                   {courses.map((course, index) => (
//                     <MenuItem key={index} value={course}>
//                       {course}
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
//                 <input type="file" accept="video/*" />
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

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { IoIosArrowDown } from "react-icons/io";
import {
  acceptTestimonial,
  getAllTestimonial,
} from "../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

const Testimonials = () => {
  const base = "http://16.171.98.198:4545";
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedCourse, setSelectedCourse] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allTestimonial, setAllTestimonial] = useState([]);
  const [testimonialStatus, setTestimonialStatus] = useState("");

  const courses = ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"];

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handlePendingClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setTestimonialStatus(id); // Set the ID of the testimonial to be approved
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await dispatch(getAllTestimonial());
      setAllTestimonial(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch all testimonial data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTestimonialStatus = () => {
    setAnchorEl(null);

    dispatch(acceptTestimonial(testimonialStatus))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        fetchData();
      })
      .catch((err) => {
        enqueueSnackbar(err.data.message, { variant: "error" });
      });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
              Students Testimonial
            </Typography>
          </Box>

          <br />

          <TableContainer
            component={Paper}
            sx={{
              padding: "1rem 1rem",
              boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Course name</TableCell>
                  <TableCell>Attachment</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTestimonial.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      paddingBottom: "1rem",
                      alignItems: "start",
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                      {row.stuName}
                    </TableCell>
                    <TableCell sx={{ color: "grey" }}>
                      {row.courseId.title}
                    </TableCell>
                    <TableCell sx={{ color: "grey" }}>
                      <Box>
                        <video
                          src={`${base}${row.video.replace(/ /g, "%20")}`}
                          alt=""
                          width={"200px"}
                          style={{ height: "100px" }}
                          controls
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      {row.status ? (
                        <Typography sx={{ color: "green" }}>
                          Approved
                        </Typography>
                      ) : (
                        <>
                          <Button
                            sx={{ color: "grey", textTransform: "none" }}
                            onClick={(event) => handleMenuClick(event, row._id)}
                          >
                            pending
                            <IconButton sx={{ fontSize: "1rem" }}>
                              <IoIosArrowDown />
                            </IconButton>
                          </Button>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handlePendingClose}
                          >
                            <MenuItem onClick={handleTestimonialStatus}>
                              Approve
                            </MenuItem>
                          </Menu>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
              />

              <br />

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Course Name
              </Typography>

              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "0.8rem" }}
              >
                <Select
                  value={selectedCourse}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  {courses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Add Video
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #7c7c7c",
                  borderRadius: "3px",
                  color: "grey",
                  padding: "0.5rem",
                }}
              >
                <input type="file" accept="video/*" />
              </Box>

              <br />
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    padding: "0.7rem 0rem",
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    textTransform: "none",
                    fontWeight: "400",
                    padding: "0.7rem 0rem",
                  }}
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Testimonials;
