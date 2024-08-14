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

const ITEMS_PER_PAGE = 10;

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getInstructors(currentPage));
      setInstructorData(res.data.data);

      const totalRecords = res.data.total;
      const totalPagesCalculated = Math.ceil(totalRecords / ITEMS_PER_PAGE);
      setTotalPages(totalPagesCalculated);

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch instructor data', error);
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
    const userType = "instructor";
setLoading(true)
    if (!searchTerm.trim()) {
      return fetchData();
    }

    dispatch(sendSearchTerm(searchTerm, userType))
      .then((res) => {
        setInstructorData(res?.data?.data);
        setTotalPages(Math.ceil(res?.data?.total / ITEMS_PER_PAGE)); // Update total pages based on search results
setLoading(false)

      })
      .catch((error) => {
        console.error("Failed to send searchTerm", error);
      });
  };
  const handleChange = (e) => {



setSearchTerm(e.target.value);


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


  console.log(currentRowId, 'current id')


  const handleDeleteInstructor = () => {

    if (currentRowId) {
      dispatch(deleteInstructor(currentRowId))
      .then(() => {
        handleMenuClose();
        setLoading(true)
        dispatch(getInstructors(currentPage))
          .then((res) => {
            setInstructorData(res.data.data);
setLoading(false)
          })
          .catch((error) => {
            console.error('Failed to fetch instructor data after deletion', error);
          setLoading(false)
          });
      })
      .catch((err) => {
        console.error(err);
      });
    }




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
                            <MenuItem onClick={handleDeleteInstructor}>Delete</MenuItem>
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