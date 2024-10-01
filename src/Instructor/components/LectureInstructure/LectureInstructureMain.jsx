import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import AddClass from '../Classes/components/AddClass';
import { getInstructorClass } from '../../../store/actions/courseActions';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddLecture from './AddLecture';
import ViewInstructorLecture from './ViewInstructorLecture';

const LectureInstructureMain = () => {
  const theme = useTheme();
  const [isEdited, setIsEdited] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const handleViewClick = (courseId) => {
    setSelectedCourseId(courseId); // Set the selected course ID
    setIsEdited(true); // Set the state to indicate that a course is selected
  };


  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getInstructorClass());
        const data = res.data.data;
        setClassData(data);
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddCourseClick = () => {
    setIsAddingCourse(true);

  };

  const handleBackClick = () => {
    setIsAddingCourse(false);
    setIsEdited(false);
  };

  // Function to format date and time
  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Customize date format as needed

    // Format time as 'h:mm AM/PM'
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', hour12: true });

    return { formattedDate, formattedTime };
  };


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Customize date format as needed
  };


  return (
    <Box>
      {isAddingCourse ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Lectures
          </Button>
          <AddLecture />

        </>
      ) : isEdited ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Lectures
          </Button>

          <ViewInstructorLecture courseId={selectedCourseId}/>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: '550',
                fontSize: '2rem',
              }}
            >
              All Lectures
            </Typography>
            <Button variant='outlined' onClick={handleAddCourseClick}>
              + Add Lecture
            </Button>
          </Box>
          <br />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
              <Table size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Class Name</TableCell>

                    <TableCell>Group/Student</TableCell>
                    <TableCell>Created Date</TableCell>


                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData.map((row) => {

                    return (
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
                          {row.courseId.title}
                        </TableCell>
                        <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
                          {row.title}
                        </TableCell>
                        <TableCell sx={{ color: 'grey' }}>
                          {row.courseType === 'group' ? row?.group?.name : `${row?.studentId?.firstName} ${row?.studentId?.lastName}`}
                        </TableCell>

                        <TableCell>
                        {formatDate(row.createdAt)} {/* Apply the formatDate function here */}
                      </TableCell>


                        <TableCell >

                  <FaEye
                    style={{ fontSize: '1.3rem', color:theme.palette.primary.main, cursor: 'pointer' }}
                    onClick={() => handleViewClick(row._id)} // Pass the course ID to the handler
                  />
{/*
                  <FaRegEdit style={{ fontSize: '1.5rem', cursor: 'pointer',color:'green', marginRight:'.5rem' }} />
                  <RiDeleteBin6Line style={{ fontSize: '1.5rem', cursor: 'pointer', color:'red' }}/> */}
                </TableCell>








                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
}

export default LectureInstructureMain;
