import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getStudentJoinFreeTrails } from '../../../store/actions/courseActions';
import { useNavigate } from 'react-router';

const StudentTrailJoin = () => {
  const theme = useTheme();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [classData, setClassData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getStudentJoinFreeTrails());
        const data = res.data.data;

        setClassData(data);
      } catch (err) {
        console.error("Failed to fetch free trails:", err);
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

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return { formattedDate, formattedTime };
  };

  // Function to check if current time is within the 15-minute window after the start time
  const isJoinable = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 15 * 60 * 1000); // Add 15 minutes to start time
    return now >= start && now <= end;
  };

  const handleRedirect = (url) => {
    try {
      new URL(url); // Validate URL
      window.open(url, '_blank'); // Open the URL in a new tab
    } catch (err) {
      console.error('Invalid URL:', url);
    }
  };


  const { formattedDate, formattedTime: formattedStartTime } = formatDateAndTime(classData?.startTime);
  const joinable = isJoinable(classData?.startTime);




  return (
    <Box>
<Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
<Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: '550',
          fontSize: '2rem',
        }}
      >
        Join Free Trials
      </Typography>


      <Button sx={{ textTransform: "none" }} variant="outlined" onClick={() => navigate("/")}>
            Go to Website
          </Button>


</Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
 <>
 <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
          <Table size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Admin</TableCell>
                <TableCell>Course Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

      <TableRow key={classData._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={{ color: 'grey' }}>
          {/* {classData.studentId.firstName} {classData.studentId.lastName} */}
          Anmol Khatri
        </TableCell>
        <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
          {classData.courseType}
        </TableCell>
        <TableCell sx={{ color: 'grey' }}>{formattedDate}</TableCell>
        <TableCell sx={{ color: 'grey' }}>{formattedStartTime}</TableCell>
        <TableCell>


        {!classData.link ? (
          <>
            <Typography sx={{fontSize:'0.9rem', color:'red'}}>Pending</Typography>
          </>
        ):(

          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '0px', textTransform: 'none' }}
            onClick={() => handleRedirect(classData.link)}
            disabled={!joinable}
          >
            Join
          </Button>
        )}

        </TableCell>
      </TableRow>

</TableBody>
          </Table>
        </TableContainer>
<br/>
        {
  !classData.link ? null
  :(
    <Box sx={{dispay:'flex', justifyContent:'center', alignItems:'center', height:'10vh'}}>
      <Typography sx={{color:'grey', fontSize:'0.9rem'}}>
        Please wait while admin add the Trial Class Link.
        <br/>
         You can join it after the admin approval.
      </Typography>

      </Box>

  )
}
 </>
      )}

       </Box>
  );
}

export default StudentTrailJoin;
