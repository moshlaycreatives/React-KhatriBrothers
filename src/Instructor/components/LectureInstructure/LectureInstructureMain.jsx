import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import AddClass from '../Classes/components/AddClass';
import { getInstructorClass } from '../../../store/actions/courseActions';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddLecture from './AddLecture';

const LectureInstructureMain = () => {
  const theme = useTheme();
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
  };

  // Function to format date and time
  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Customize date format as needed

    // Format time as 'h:mm AM/PM'
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', hour12: true });

    return { formattedDate, formattedTime };
  };

  // Function to check if current time is within class start and end times
  const isJoinable = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    return now >= start && now <= end;
  };

  // Function to handle redirection with URL validation
  const handleRedirect = (url) => {
    try {
      new URL(url); // Validate URL
      window.location.href = url;
    } catch (err) {
      console.error('Invalid URL:', url);
    }
  };

  return (
    <Box>
      {isAddingCourse ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Courses
          </Button>
          <AddLecture />
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
                    <TableCell>Group/Student</TableCell>

                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData.map((row) => {
                    const { formattedDate, formattedTime: formattedStartTime } = formatDateAndTime(row.startTime);
                    const { formattedTime: formattedEndTime } = formatDateAndTime(row.endTime);

                    const joinable = isJoinable(row.startTime, row.endTime);

                    return (
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
                          {row.courseId.title}
                        </TableCell>
                        <TableCell sx={{ color: 'grey' }}>
                          {row.courseType === 'group' ? row.group.name : `${row.studentId.firstName} ${row.studentId.lastName}`}
                        </TableCell>




                        <TableCell sx={{ }}>

                  <FaRegEdit style={{ fontSize: '1.5rem', cursor: 'pointer',color:'green', marginRight:'.5rem' }} />
                  <RiDeleteBin6Line style={{ fontSize: '1.5rem', cursor: 'pointer', color:'red' }}/>
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
