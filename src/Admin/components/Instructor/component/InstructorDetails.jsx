import { Box, Button, Card, IconButton, InputAdornment, Menu, MenuItem, Pagination, Paper, Table, TableBody,  TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { assignedStudents, getSingleInstructor, getSingleStudent, sendSearchTerm } from '../../../../store/actions/courseActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import MoreVertIcon from '@mui/icons-material/MoreVert';



const InstructorDetails = ({instructorId}) => {
  console.log(' new concsdafjh', instructorId)
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  // const dispatch = useDispatch();


// const row = [
//   {studentname:'patel' , studentCourse:'music', coursetype:'advance' , classtype:'group' , coursefee:'100'},
//   {studentname:'patel' , studentCourse:'music', coursetype:'advance' , classtype:'group' , coursefee:'100'},
//   {studentname:'patel' , studentCourse:'music', coursetype:'advance' , classtype:'group' , coursefee:'100'},
// ]

const handleMenuClose = ()=>{
  setAnchorEl(null)
}
const handleMenuClick = (events)=>{
  setAnchorEl(events.currentTarget);
}


const [instructorData , setInstructorData] = useState({})
    // const [courseData , setCourseData] = useState({})

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
        //   setLoading(true); // Set loading to true before fetching data
          try {
            const res = await dispatch(getSingleInstructor(instructorId));
            console.log(res.data.data, "hahahahhaaa");
            setInstructorData(res.data.data);
            // setCourseData(res.data.data.courseId);

          } catch (err) {
            console.error("Failed to fetch student:", err);
          } finally {
            // setLoading(false); // Set loading to false after data is fetched or if an error occurs
          }
        };

        fetchData();
      }, [dispatch,instructorId]);

      useEffect(() => {
        const fetchStudentData = async () => {
          try {
            const res = await dispatch(assignedStudents(instructorId));
            console.log(res.data.data, "hahahahhaaa");
            setStudentData(res.data.data);
            console.log('new stuent data ', studentData)
            // setCourseData(res.data.data.courseId);

          } catch (err) {
            console.error("Failed to fetch student:", err);
          } finally {
            // setLoading(false); // Set loading to false after data is fetched or if an error occurs
          }
        };

        fetchStudentData();
      }, [dispatch,instructorId]);


      const handleSearch = () => {
        const userType = 'student'
    
        if (!searchTerm.trim()) {
          console.log('Search cannot be empty');
          return;
        }

        console.log('Searching for:', searchTerm);

        dispatch(sendSearchTerm(searchTerm, userType))
          .then((res) => {
            setStudentData(res?.data?.data);
            setTotalPages(res?.data?.totalPages); // Update total pages based on search results
          })
          .catch((error) => {
            console.error('Failed to send searchTerm', error);
          });
      };

      const handleKeyPress = (e)=>{
        if (e.key === 'Enter') {
          handleSearch();
        }
      }

      const handlePageChange = (events,value)=>{
        setCurrentPage(value)
      }

  return (
    <>
    <Box>
        <Card sx={{ padding: "1rem", marginBottom: "1rem",
        width:'100%'
        }}>

      <Box sx={{
        display:'flex',
        justifyContent:'space-between', 
        alignItems:'start'
      }}>
       <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Instructor Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {`${instructorData.firstName} ${instructorData.lastName} `}
          </Typography>
          <br/>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Instructor Role
          </Typography>

          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {instructorData.role}
          </Typography>
          <br/>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Gender
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {instructorData.gender}
          </Typography>

          </Box>

          <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Country
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {instructorData.country}
          </Typography>
          <br/>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Email
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {instructorData.email}
          </Typography>
<br/>
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Phone
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {instructorData.phone}
          </Typography>

          </Box>
          {/* <Button>click</Button> */}
          <div></div>
       </Box>

       <Box paddingTop={'3rem'}>
            {/* <TableContainer component={Paper} sx={{ padding: '1rem', backgroundColor:'transparent',
              border:'none', outline:'none'
            }} > */}
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
                  size='small'
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // onChange={handleChange}
                  onKeyPress={handleKeyPress}
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
                  {studentData.map((row,ind) => (
                    <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row ' sx={{ color: 'gray' }}>
                        {/* {`${row.studentId.firstName} ${row.studentId.lastName}`} */}
                        {`${row.studentId.firstName} ${row.studentId.lastName}`}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {/* {row.courseId.title} */}
                        {row.courseId.title}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {/* {row.courseId.courseType} */}
                        {row.courseId.courseType}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        Group
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }}>
                        {/* {row.courseId.price} */}
                        {row.courseId.price}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(events) => handleMenuClick(events)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem >View</MenuItem>
                          <MenuItem>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            {/* </TableContainer> */}
          </Box>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
    </Box>
    </>
  )
}

export default InstructorDetails