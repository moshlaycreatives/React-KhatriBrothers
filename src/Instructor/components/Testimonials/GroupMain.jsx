// import {
//   InputAdornment,
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
//   useTheme,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon
// import {
//   addStudentsTestimonial,
//   getAllGroups,
//   getAssignedStudents,
//   getBeginnerCourse,
// } from "../../../store/actions/courseActions";
// import { useDispatch, useSelector } from "react-redux";
// import { FaEye } from "react-icons/fa";
// import { useSnackbar } from "notistack";

// import { CiSearch } from "react-icons/ci";
// import {
//   getSingleStudent,
//   getStudentData,
//   sendSearchTerm,
// } from "../../../store/actions/courseActions"; // Import sendSearchTerm
// import GroupDetails from "./components/GroupDetails";
// import CreateGroup from "./components/CreateGroup";

// const GroupMain = () => {
//   const theme = useTheme();
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const initialValues = {
//     title: "",
//     courseId: "",
//     video: null,
//   };

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [studentData, setStudentData] = useState([]);
//   const [currentRowId, setCurrentRowId] = useState(null);
//   const [isEdited, setIsEdited] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const [totalPages, setTotalPages] = useState(1); // State for total pages

//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [isAdding, setIsAdding] = useState(false); // State to toggle between form and table view
//   const [viewDetails, setViewDetails] = useState(false);
//   const [testimonialData, setTestimonialData] = useState([]);
//   const [currentCourseId, setCurrentCourseId] = useState(null);
//   const [formValues, setFormValues] = useState(initialValues);
//   const [loading, setLoading] = useState(false);
//   const [selectedGroupData, setSelectedGroupData] = useState(null); // State to hold the selected group data

//   const InstructorId = useSelector((state) => state?.auth?.user?._id);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await dispatch(getAllGroups(currentPage));
//         setTestimonialData(res.data.data);
//         console.log("testtimonial  data:", res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch student data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, currentPage]);

//   const handleAddTestimonial = () => {
//     setIsAdding(true);
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//   };

//   const handleRowIconClick = (groupData) => {
//     setSelectedGroupData(groupData);
//     setViewDetails(true); // Set to true to show GroupDetails
//   };

//   const handleMenuClick = () => {
//     setViewDetails(!viewDetails);
//   };

//   console.log(testimonialData, 'data ')

//   return (
//     <>
//       {viewDetails ? (
//         <GroupDetails groupdata={selectedGroupData}  />
//       ) : (
//         <Box>
//           {!isAdding ? (
//             <>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: theme.palette.primary.main,
//                     fontWeight: "550",
//                     fontSize: isMobile ? "1.5rem" : "2rem",
//                   }}
//                 >
//                   Group
//                 </Typography>

//                 <Box>
//                   <Button
//                     variant="outlined"
//                     onClick={handleAddTestimonial}
//                     sx={{
//                       textTransform: "none",
//                       borderRadius: "0px",
//                       fontWeight: 400,
//                       fontSize: isMobile ? "0.8rem" : "1.2rem",
//                     }}
//                   >
//                     + Create Group
//                   </Button>
//                 </Box>
//               </Box>

//               <br />

//               {loading ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "50vh",
//                   }}
//                 >
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <>
//                   <TableContainer
//                     component={Paper}
//                     sx={{
//                       padding: "1rem 1rem",
//                       boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//                       width: "100%",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         marginBottom: "2rem",
//                       }}
//                     >
//                       <TextField
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         // onChange={handleChange}
//                         // onKeyPress={handleKeyPress}
//                         size="small"
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <CiSearch />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         // onClick={handleSearch}
//                         startIcon={<CiSearch />}
//                       >
//                         Search
//                       </Button>
//                     </Box>

//                     <Table
//                       size="small"
//                       aria-label="a dense table"
//                       width={"100%"}
//                     >
//                        <TableHead backgroundColor={'red'}  >
//                     <TableRow sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width:'137%'  }}>
//                     <TableCell sx={{ justifyContent: 'start',  }}>Group name</TableCell>
//                    <TableCell sx={{ display:'flex', justifyContent: 'end',  }}>Action</TableCell>
//                     </TableRow>
//                     </TableHead>

//                       <TableBody>
//                         {testimonialData.map((val, ind) => (
//                           <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 }, width:'100%' }}>
//                           <TableCell component='th' scope='row ' sx={{ color: 'gray', justifyContent: 'start' }}>

//                               {val.name}
//                             </TableCell>

//                             <TableCell  sx={{ display:'flex', justifyContent: 'end',   }}>

//                               <IconButton
//                                sx={{color:theme.palette.primary.main,  justifyContent:'start', marginRight:'1rem'} }

//                                 onClick={() => handleRowIconClick(val)}
//                               >
//                                 <FaEye />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </>
//               )}
//             </>
//           ) : (
//             <>
//               <CreateGroup />
//             </>
//           )}
//         </Box>
//       )}
//     </>
//   );
// };

// export default GroupMain;




import {
  InputAdornment,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
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
  useTheme,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FaEye } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  getAllGroups,
  groupSearch,
} from "../../../store/actions/courseActions";
import GroupDetails from "./components/GroupDetails";
import CreateGroup from "./components/CreateGroup";

const GroupMain = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState("");
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [selectedGroupData, setSelectedGroupData] = useState(null);




  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllGroups(currentPage));
      setTestimonialData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, [dispatch, currentPage]);




  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        fetchData();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);




  const handleSearch = () => {
    const userType = "user";
    if (!searchTerm.trim()) {
      return fetchData();
    }

    dispatch(groupSearch(searchTerm))
      .then((res) => {
        setTestimonialData(res?.data?.data);
        // setTotalPages(Math.ceil(res?.data?.total / ITEMS_PER_PAGE)); // Update total pages based on search results

      })
      .catch((error) => {
        console.error("Failed to send searchTerm", error);
      });
  };
  const handleChange = (e) => {



setSearchTerm(e.target.value);


  };















  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleRowIconClick = (groupData) => {
    setSelectedGroupData(groupData);
    setViewDetails(true);
  };

  const handleBackClick = () => {
    setViewDetails(false);
    setSelectedGroupData(null);
  };

  return (
    <>
      {viewDetails ? (
        <GroupDetails groupdata={selectedGroupData} onBackClick={handleBackClick} />
      ) : (
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
                  Groups
                </Typography>

                <Box>
                  <Button
                    variant="outlined"
                    onClick={handleAddTestimonial}
                    sx={{
                      textTransform: "none",
                      borderRadius: "0px",
                      fontWeight: 400,
                      fontSize: isMobile ? "0.8rem" : "1rem",
                    }}
                  >
                    + Create Group
                  </Button>
                </Box>
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
                      width: "100%",
                    }}
                  >
                   <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '2rem'
                }}
              >
                <TextField
                  variant='outlined'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={handleChange}

                  size='small'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CiSearch />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  startIcon={<CiSearch />}
                >
                  Search
                </Button>
              </Box>

                    <Table
                      size="small"
                      aria-label="a dense table"
                      width={"100%"}
                    >
                       <TableHead backgroundColor={'red'}  >
                    <TableRow sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width:'137%'  }}>
                    <TableCell sx={{ justifyContent: 'start',  }}>Group name</TableCell>
                   <TableCell sx={{ display:'flex', justifyContent: 'end',  }}>Action</TableCell>
                    </TableRow>
                    </TableHead>

                      <TableBody>
                        {testimonialData.map((val, ind) => (
                          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 }, width:'100%' }}>
                          <TableCell component='th' scope='row ' sx={{ color: 'gray', justifyContent: 'start' }}>

                              {val.name}
                            </TableCell>

                            <TableCell  sx={{ display:'flex', justifyContent: 'end',   }}>

                              <IconButton
                               sx={{color:theme.palette.primary.main,  justifyContent:'start', marginRight:'1rem'} }

                                onClick={() => handleRowIconClick(val)}
                              >
                                <FaEye />
                              </IconButton>
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
            <CreateGroup onBackClick={handleBackClick} />
          )}
        </Box>
      )}
    </>
  );
};

export default GroupMain;
