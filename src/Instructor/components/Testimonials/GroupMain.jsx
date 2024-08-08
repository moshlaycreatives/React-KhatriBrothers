// import { useTheme } from "@emotion/react";

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
//   useTheme,
//   Pagination,
//   CircularProgress
// } from '@mui/material';
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
  Menu
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon
import { addStudentsTestimonial, getBeginnerCourse } from "../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useSnackbar } from "notistack";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CiSearch } from "react-icons/ci";
import {
  getSingleStudent,
  getStudentData,
  sendSearchTerm
} from '../../../store/actions/courseActions'; // Import sendSearchTerm
import GroupDetails from "./components/GroupDetails";


const GroupMain = () => {
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const initialValues ={
    title:'',
    courseId:'',
    video:null
  }



  
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages




  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAdding, setIsAdding] = useState(false); // State to toggle between form and table view
  const [viewDetails, setViewDetails] = useState(false);
  const [testimonialData ,setTestimonialData] = useState([]);
  const [currentCourseId ,setCurrentCourseId] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);
  const [loading ,setLoading]= useState(false);

  // const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];
 
  const handleFromData =(e)=>{
    const {name , value} = e.target;
    setFormValues((formValues)=>({...formValues, [name]: value})) 
    console.log('kkkkkkkk' ,formValues);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await dispatch(getBeginnerCourse());
        setTestimonialData(res.data.data);
        console.log('testtimonial  data:', res. data);
      } catch (error) {
        console.error('Failed to fetch student data', error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    // setSelectedCourse(event.target.value);
    const selectedId = event.target.value;
    setSelectedCourse(selectedId);
    setFormValues((formValues)=>({...formValues, courseId:selectedId}));
  };

  const handleVideoChange =(e)=>{
    const file = e.target.files[0];
    setFormValues((formValues)=>({...formValues , video : file}))
  }

  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = ()=>{

    const formData = new FormData();
  formData.append('stuName', formValues.title);
  formData.append('courseId', formValues.courseId)
  if (formValues.video) {
    formData.append('video', formValues.video)
  }

  dispatch(addStudentsTestimonial(formData)).then((res)=>{
    enqueueSnackbar(res.data.message,  {variant:'success'})
    setFormValues(initialValues);
  }).catch((error)=>{
    enqueueSnackbar(error.data.message, {varient:'error'})
  })
  }

  const handleMenuClick = ()=>{
    setViewDetails(!viewDetails);
  }
console.log('groups detail ', viewDetails);
  

  // const handleCouseClick  = (e , id)=>{
  //   setCurrentCourseId(id);

  //   const {name } = e.target;
  //   setFormValues((formValues)=>({...formValues, [name]: id}))
  //   console.log('kkkkkkkk' ,formValues);
    
  // }
  // console.log('course test id', currentCourseId);




  const rows = [
    {
      coursename: "Hindustani vocal advanced A series",
      teacher: "Faraz",
      image: "/ggg.png",
    },
  ];

  return (
    <>
    {viewDetails ? (
      <GroupDetails />
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
                fontSize: isMobile ? '1.5rem' : "2rem",
              }}
            >
            Group 
            </Typography>

            <Box>
              <Button
                variant="outlined"
                onClick={handleAddTestimonial}
                sx={{
                  textTransform: "none",
                  borderRadius: "0px",
                  fontWeight: 400,
                  fontSize: isMobile ? '0.8rem' : "1.2rem",
                }}
              >
                + Create Group
              </Button>
            </Box>
          </Box>

          <br />

          {loading ? (
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'50vh'}}>
              <CircularProgress/>
            </Box>
          ) : (
            <>
            <TableContainer
            component={Paper}
            sx={{
              padding: "1rem 1rem",
              boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
              width:'100%'
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
                  // onChange={handleChange}
                  // onKeyPress={handleKeyPress}
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
                  // onClick={handleSearch}
                  startIcon={<CiSearch />}
                >
                  Search
                </Button>
              </Box>

            <Table size='small' aria-label='a dense table' width={'100%'}>
                    <TableHead>
                      <TableRow sx={{display:'flex', jjustifyContent:'space-between'}}>
                        <TableCell sx={{flex:'1'}}>Group name</TableCell>
                        {/* <TableCell>Course Name</TableCell>
                        <TableCell>Course Type</TableCell>
                        <TableCell>Class Type</TableCell>
                        <TableCell>Course Fee</TableCell> */}
                        <TableCell sx={{flex:'0'}}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {studentData.map((row) => ( */}
                        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
                            {/* {`${row.studentId.firstName} ${row.studentId.lastName}`} */}
                            Group name
                          </TableCell>

                          {/* <TableCell sx={{ color: 'gray' }}>
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
                          </TableCell> */}

                          <TableCell>
                            <IconButton sx={{color:theme.palette.primary.main} }
                             onClick={handleMenuClick}
                             >
                              <FaEye />

                            </IconButton>
                            {/* <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              // onClose={handleMenuClose}
                            >
                              <MenuItem
                              //  onClick={handleEditClick}
                               >View</MenuItem>
                          
                            </Menu> */}
                          </TableCell>
                        </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
          </TableContainer>
            </>
          )}
          
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
              Create Group
            </Typography>
          </Box>
          <br /><br />

<Card
          sx={{
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            position: 'relative', // Position relative for the close button
          }}
        >
          <CloseIcon
            onClick={handleCancel}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
          />

          <Box sx={{ padding: "1.2rem" }}>
            <Typography sx={{ fontWeight: '600' }}>Add Details</Typography>
            <br />

            <form>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Group
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Enter group name"
                sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
                name="title"
                value={formValues.title}
                onChange={handleFromData}
              />

              <br />

              
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Select Student
              </Typography>

              <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem", }}>
              {/* <InputLabel >please select student</InputLabel> */}
              
                <Select
                  value={selectedCourse}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return <em style={{color:'#bcbcbc'}}>Please select course</em>;
                    }
                    return selected;
                  }}
                >
                  
                
                  <MenuItem value="" disabled>
                  </MenuItem>
                  {testimonialData.map((course, index) => (
                    <MenuItem key={index}
                     value={course._id}
                    // onClick={(events)=>handleCouseClick(events, course._id)}
                    placeholder="please select student"
                    name="courseId"
                    >
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  onClick={handleSubmit}
                >
                 Create Class
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
        </Box>
      )}
    </Box>
    )}
    </>
  );
};

export default GroupMain;
