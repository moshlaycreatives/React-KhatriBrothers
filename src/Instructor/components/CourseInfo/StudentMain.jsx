
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
  Pagination,
  CircularProgress // Import CircularProgress
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import {
  getAssignedStudents,
  getSingleStudent,
  getStudentData,
  searchStudentsOfInstructor,
  sendSearchTerm
} from '../../../store/actions/courseActions'; // Import sendSearchTerm
// import ViewStudent from './component/ViewStudent';
import { FaEye } from "react-icons/fa";
import ViewStudentDetails from './components/ViewStudentDetails';


const StudentMain = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);

  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(true); // State for loading status
  const dispatch = useDispatch();

  const InstructorId = useSelector((state)=>state?.auth?.user?._id)
  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const res = await dispatch(getAssignedStudents(InstructorId));
      setStudentData(res.data.data);
      // Assuming totalPages is returned from the API
      console.log('Student data:', res.data);
    } catch (error) {
      console.error('Failed to fetch student data', error);
    } finally {
      setLoading(false); // End loading
    }
  };
  useEffect(() => {


    fetchData();
  }, []);

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

    dispatch(searchStudentsOfInstructor(searchTerm, InstructorId))
      .then((res) => {
        setStudentData(res?.data?.data);
        setTotalPages(Math.ceil(res?.data?.total / ITEMS_PER_PAGE)); // Update total pages based on search results

      })
      .catch((error) => {
        console.error("Failed to send searchTerm", error);
      });
  };
  const handleChange = (e) => {



setSearchTerm(e.target.value);


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

  const handleEditClick = (id) => {
    setIsEdited(true);
    setCurrentRowId(id);

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
          <ViewStudentDetails student_Id={currentRowId} />
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
                        <TableCell>Course Name</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Class Type</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Status</TableCell>

                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentData.map((row) => {
                        return (
                          <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                          <TableCell sx={{ color: 'gray' }}>
                              {row.courseId.title}
                            </TableCell>


                            <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
                              {`${row.studentId.firstName} ${row.studentId.lastName}`}
                            </TableCell>

                            <TableCell sx={{ color: 'gray' }}>
                              {row.classType}
                            </TableCell>

                            <TableCell sx={{ color: 'gray' }}>
                              {row.studentId.gender}
                            </TableCell>

                            <TableCell sx={{ color: 'gray' }}>
                              {row.studentId.country}
                            </TableCell>

                            <TableCell sx={{ color:row.payment ? 'green': 'red' }}>
                              {row.payment ? 'Paid':'Unpaid'}
                            </TableCell>
                            <TableCell>
                              <IconButton

                              // onClick={(events) => handleEditClick(events, row._id)}

// onClick={handleEditClick}
                            onClick={() => handleEditClick(row._id)}

                               sx={{color:theme.palette.primary.main}}>

                                <FaEye />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                              >
                                <MenuItem onClick={handleEditClick}>View</MenuItem>

                              </Menu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}

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

export default  StudentMain;
