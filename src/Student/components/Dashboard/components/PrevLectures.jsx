import { useTheme } from '@emotion/react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { getPrevClass } from '../../../../store/actions/courseActions';
const PrevLectures = () => {
  const theme = useTheme()


  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getPrevClass());
        const data = res.data.data;
        setClassData(data);
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <>

<Box>


<Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: "2rem",
          }}
        >
          Previous Lectures
        </Typography>

<br/>



<TableContainer component={Paper} sx={{padding:'1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",}}>
      <Table sx={{ }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell >Teacher</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Time</TableCell>
            <TableCell >Lecture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {classData.map((row, index) => {
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
                          {`${row.instructorId.firstName} ${row.instructorId.lastName}`}
                        </TableCell>
                        <TableCell sx={{ color: 'grey' }}>{formattedDate}</TableCell>
                        <TableCell sx={{ color: 'grey' }}>{formattedStartTime} - {formattedEndTime}</TableCell>

                        <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
                          {index + 1}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
      </Table>
    </TableContainer>


</Box>



    </>
  )
}

export default PrevLectures