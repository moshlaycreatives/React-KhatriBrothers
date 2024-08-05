// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   Menu,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   useTheme
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { CiSearch } from "react-icons/ci";
// import { useDispatch } from 'react-redux';
// import {
//   getSingleStudent,
//   getStudentData,
//   sendSearchTerm
// } from '../../../store/actions/courseActions'; // Import sendSearchTerm
// import ViewStudent from './component/ViewStudent';

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
//       .then((res) => {
//         setStudentData(res?.data?.data);
//       })
//       .catch((error) => {
//         console.error('Failed to send searchTerm', error);
//       });
//   };

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

//   const handleMenuClick = (events, id) => {
//     setAnchorEl(events.currentTarget);
//     setCurrentRowId(id);
//     console.log('current student id:', currentRowId);
//   };

//   const handleEditClick = () => {
//     setIsEdited(true);
//     handleMenuClose();


//   };

//   const handleBackClick = () => {
//     setIsEdited(false);
//     setCurrentRowId(null);
//   };

//   return (
//     <>
//       {isEdited && currentRowId ? (
//         <>
//           <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
//             &lt; Back to Students
//           </Button>
//           <ViewStudent studentId={currentRowId} />
//         </>
//       ) : (
//         <Box>
//           <Box>
//             <Typography
//               sx={{
//                 color: theme.palette.primary.main,
//                 fontSize: '2rem',
//                 fontWeight: 550
//               }}
//             >
//               Students
//             </Typography>
//           </Box>
//           <Box>
//             <TableContainer component={Paper} sx={{ padding: '1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '2rem'
//                 }}
//               >
//                 <TextField
//                   variant='outlined'
//                   placeholder='Search...'
//                   value={searchTerm}
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                   size='small'

//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position='start'>
//                         <CiSearch />
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSearch}
//                   startIcon={<CiSearch />}
//                 >
//                   Search
//                 </Button>
//               </Box>
//               <Table size='small' aria-label='a dense table'>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Student Name</TableCell>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Course Type</TableCell>
//                     <TableCell>Class Type</TableCell>
//                     <TableCell>Course Fee</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {studentData.map((row) => (
//                     <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
//                         {`${row.studentId.firstName} ${row.studentId.lastName}`}
//                       </TableCell>
//                       <TableCell sx={{ color: 'gray' }}>
//                         {row.courseId.title}
//                       </TableCell>
//                       <TableCell sx={{ color: 'gray' }}>
//                         {row.courseId.courseType}
//                       </TableCell>
//                       <TableCell sx={{ color: 'gray' }}>
//                         Group
//                       </TableCell>
//                       <TableCell sx={{ color: 'gray' }}>
//                         {row.courseId.price}
//                       </TableCell>
//                       <TableCell>
//                         <IconButton onClick={(events) => handleMenuClick(events, row._id)}>
//                           <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={Boolean(anchorEl)}
//                           onClose={handleMenuClose}
//                         >
//                           <MenuItem onClick={handleEditClick}>View</MenuItem>
//                           <MenuItem>Delete</MenuItem>
//                         </Menu>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default StudentMain;




import {
  Box,
  Button,
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
  useTheme,
  Pagination
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleStudent,
  getStudentData,
  sendSearchTerm
} from '../../../store/actions/courseActions'; // Import sendSearchTerm
import ViewStudent from './component/ViewStudent';

const StudentMain = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getStudentData(currentPage));
        setStudentData(res.data.data);
        setTotalPages(res.data.totalPages); // Assuming totalPages is returned from the API
        console.log('Student data:', res.data);
      } catch (error) {
        console.error('Failed to fetch student data', error);
      }
    };

    fetchData();
  }, [dispatch, currentPage]);

  const handleSearch = () => {
    const userType = 'student'

    if (!searchTerm.trim()) {
      console.log('Search cannot be empty');
      return;
    }

    dispatch(sendSearchTerm(searchTerm, userType))
      .then((res) => {
        setStudentData(res?.data?.data);
        setTotalPages(res?.data?.totalPages); // Update total pages based on search results
      })
      .catch((error) => {
        console.error('Failed to send searchTerm', error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
    console.log('current student id:', currentRowId);
  };

  const handleEditClick = () => {
    setIsEdited(true);
    handleMenuClose();
  };

  const handleBackClick = () => {
    setIsEdited(false);
    setCurrentRowId(null);
  };

  return (
    <>
      {isEdited && currentRowId ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Students
          </Button>
          <ViewStudent student_Id={currentRowId} />
        </>
      ) : (
        <Box>
          <Box>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: '2rem',
                fontWeight: 550
              }}
            >
              Students
            </Typography>
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
              <Table size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Course Type</TableCell>
                    <TableCell>Class Type</TableCell>
                    <TableCell>Course Fee</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.map((row) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
                        {`${row.studentId.firstName} ${row.studentId.lastName}`}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {row.courseId.title}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {row.courseId.courseType}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        Group
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {row.courseId.price}
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
                          <MenuItem>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StudentMain;
