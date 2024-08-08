import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import {
  deleteInstructor,
  getInstructors,
  getSingleStudent,
  sendSearchTerm
} from '../../../store/actions/courseActions';
import InstructorDetails from './component/InstructorDetails';
import AddInstructor from './component/AddInstructor';

const ITEMS_PER_PAGE = 10; // Define the number of items per page

const InstructorMain = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [InstructorData, setInstructorData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddInstructorClick = () => {
    setIsAddingInstructor(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getInstructors(currentPage));
        setInstructorData(res.data.data);

        // Calculate total pages based on the total number of records
        const totalRecords = res.data.total; // Assuming `total` is the total number of records
        const totalPagesCalculated = Math.ceil(totalRecords / ITEMS_PER_PAGE);
        setTotalPages(totalPagesCalculated);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch instructor data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage]);

  const handleSearch = () => {
    const userType = 'instructor';
    if (!searchTerm.trim()) {
      console.log('Search cannot be empty');
      return;
    }

    dispatch(sendSearchTerm(searchTerm, userType))
      .then((res) => {
        setInstructorData(res?.data?.data);
      })
      .catch((error) => {
        console.error('Failed to send searchTerm', error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(sendSearchTerm(e.target.value))
      .then((res) => {
        setInstructorData(res?.data?.data);
      })
      .catch((error) => {
        console.error('Failed to send searchTerm', error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpenMenu = (events) => {
    setAnchorEl(events.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (events, id) => {
    setAnchorEl(events.currentTarget);
    setCurrentRowId(id);
  };

  const handleEditClick = () => {
    setIsEdited(true);
    handleMenuClose();

    if (currentRowId) {
      dispatch(getSingleStudent(currentRowId))
        .then((res) => {
          console.log('Single student data:', res.data);
        })
        .catch((error) => {
          console.error('Failed to fetch student data:', error);
        });
    }
  };

  const handleBackClick = () => {
    setIsEdited(false);
    setIsAddingInstructor(false);
    setCurrentRowId(null);
  };

  const handleDeleteInstructor = (id) => {
    dispatch(deleteInstructor(id))
      .then(() => {
        dispatch(getInstructors(currentPage))
          .then((res) => {
            setInstructorData(res.data.data);
          })
          .catch((error) => {
            console.error('Failed to fetch instructor data after deletion', error);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {isAddingInstructor ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Courses
          </Button>
          <AddInstructor />
        </>
      ) : isEdited && currentRowId ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Instructor
          </Button>
          <InstructorDetails instructorId={currentRowId} />
        </>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: '550',
                fontSize: '2rem',
              }}
            >
              Instructor
            </Typography>
            <Button variant='outlined' onClick={handleAddInstructorClick}>
              + Add Instructor
            </Button>
          </Box>
          <Box>
            <TableContainer component={Paper} sx={{ padding: '1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
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
                  onKeyPress={handleKeyPress}
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

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                <Table size='small' aria-label='a dense table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Instructor Name</TableCell>
                      <TableCell>Instructor Role</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {InstructorData?.map((row) => (
                      <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
                          {`${row.firstName} ${row.lastName}`}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }}>
                          {row.instructorRole}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }}>
                          {row.gender}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }}>
                          {row.country}
                        </TableCell>
                        <TableCell sx={{ color: 'gray' }}>
                          {row.phone}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={(events) => handleMenuClick(events, row._id)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleEditClick}>View</MenuItem>
                            <MenuItem onClick={() => handleDeleteInstructor(row._id)}>Delete</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>

                </>
              )}
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default InstructorMain;
























  // import { Box, Button, IconButton, InputAdornment, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
  // import React, { useEffect, useState } from 'react';
  // import MoreVertIcon from '@mui/icons-material/MoreVert';
  // import { CiSearch } from "react-icons/ci";
  // import { useDispatch } from 'react-redux';
  // import { getSingleCourse, getSingleStudent, getStudentData, sendSearchTerm } from '../../../store/actions/courseActions'; // Import sendSearchTerm
  // import { useAsyncError } from 'react-router';

  // const StudentMain = () => {
  //   const theme = useTheme();
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [studentData, setStudentData] = useState([]);
  //   const [currentRowId, setCurrentRowId] = useState(null);
  //   const [isEdited, setIsEdited] = useState(false);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await dispatch(getStudentData());
  //         setStudentData(res.data.data);
  //         console.log('Student data:', res.data);
  //       } catch (error) {
  //         console.error('Failed to fetch student data', error);
  //       }
  //     };

  //     fetchData();
  //   }, [dispatch]);

  //   const handleSearch = () => {
  //     if (!searchTerm.trim()) {
  //       console.log('Search cannot be empty');
  //       return;
  //     }

  //     dispatch(sendSearchTerm(searchTerm))
  //       .then((res) => {
  //         setStudentData(res?.data?.data);
  //       })
  //       .catch((error) => {
  //         console.error('Failed to send searchTerm', error);
  //       });
  //   };

  //   const handleChange = (e) => {
  //     setSearchTerm(e.target.value);
  //     dispatch(sendSearchTerm(searchTerm))
  //     .then((res) => {
  //       setStudentData(res?.data?.data);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to send searchTerm', error);
  //     });
  //     // console.log(searchTerm)
  //   };
  // //   console.log(searchTerm);

  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') {
  //       handleSearch();
  //     }
  //   };

  //   const handleOpenMenu = (events) => {
  //     setAnchorEl(events.currentTarget);
  //   };

  //   const handleMenuClose = () => {
  //     setAnchorEl(null);
  //   };

  //   const handleMenuClick =(events, id)=>{
  //     setAnchorEl(events.currentTarget)
  //     setCurrentRowId(id)
  //     console.log('cureent id student ',currentRowId);
  //   }

  //   const handleEditClick = () => {
  //     setIsEdited(true);
  //     handleMenuClose();

  //     if (currentRowId) {
  //       dispatch(getSingleStudent(currentRowId))
  //         .then((res) => {
  //           console.log('Single student data:', res.data); // Process the data as needed
  //         })
  //         .catch((error) => {
  //           console.error('Failed to fetch student data:', error);
  //         });
  //     }

  //     }


  //   return (
  //     <>
  //       <Box>
  //         <Box>
  //           <Typography sx={{
  //             color: theme.palette.primary.main,
  //             fontSize: '2rem',
  //             fontWeight: 550
  //           }}>
  //             Students
  //           </Typography>
  //         </Box>
  //         <Box>
  //           <TableContainer component={Paper} sx={{ padding: '1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
  //             <Box sx={{
  //               display: 'flex',
  //               justifyContent: 'space-between',
  //               marginBottom: '2rem'
  //             }}>
  //               <TextField
  //                 variant='outlined'
  //                 placeholder='Search...'
  //                 value={searchTerm}
  //                 onChange={handleChange}
  //                 onKeyPress={handleKeyPress}
  //                 InputProps={{
  //                   startAdornment: (
  //                     <InputAdornment position='start'>
  //                       <CiSearch />
  //                     </InputAdornment>
  //                   )
  //                 }}
  //               />
  //               <Button
  //                 variant="contained"
  //                 color="primary"
  //                 onClick={handleSearch}
  //                 startIcon={<CiSearch />}
  //               >
  //                 Search
  //               </Button>
  //             </Box>
  //             <Table size='small' aria-label='a dense table'>
  //               <TableHead>
  //                 <TableRow>
  //                   <TableCell>Student Name</TableCell>
  //                   <TableCell>Course Name</TableCell>
  //                   <TableCell>Course Type</TableCell>
  //                   <TableCell>Class Type</TableCell>
  //                   <TableCell>Course Fee</TableCell>
  //                   <TableCell>Action</TableCell>
  //                 </TableRow>
  //               </TableHead>
  //               <TableBody>
  //                 {studentData.map((row) => (
  //                   <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
  //                     <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
  //                       {`${row.studentId.firstName} ${row.studentId.lastName}`}
  //                     </TableCell>
  //                     <TableCell sx={{ color: 'gray' }}>
  //                       {row.courseId.title}
  //                     </TableCell>
  //                     <TableCell sx={{ color: 'gray' }}>
  //                       {row.courseId.courseType}
  //                     </TableCell>
  //                     <TableCell sx={{ color: 'gray' }}>
  //                       Group
  //                     </TableCell>
  //                     <TableCell sx={{ color: 'gray' }}>
  //                       {row.courseId.price}
  //                     </TableCell>
  //                     <IconButton  onClick={(events)=>handleMenuClick(events,row._id)}>
  //                       <MoreVertIcon />
  //                     </IconButton>
  //                     <Menu
  //                       anchorEl={anchorEl}
  //                       open={Boolean(anchorEl)}
  //                       onClose={handleMenuClose}
  //                     >
  //                       <MenuItem onClick={handleEditClick}>View</MenuItem>
  //                       <MenuItem>Delete</MenuItem>
  //                     </Menu>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // };

  // export default StudentMain;
