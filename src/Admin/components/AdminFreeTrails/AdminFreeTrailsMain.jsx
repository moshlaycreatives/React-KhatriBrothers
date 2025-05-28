import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import AddTrailForStudent from './components/AddTrailForStudent';
import { getAdminFreeTrails } from '../../../store/actions/courseActions';

const AdminFreeTrailsMain = () => {
  const theme = useTheme();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAdminFreeTrails());
      const data = res.data.data;
      // Filter out rows that have an existing link
      const filteredData = data.filter(row => !row.link);
      setClassData(filteredData);

    } catch (err) {
      console.error("Failed to fetch advanced courses:", err);
    } finally {
      setLoading(false);
    }
  };


  console.log("this is class data", classData)


  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAddingCourse && !isScheduling) {
      fetchData();
    }
  }, [isAddingCourse, isScheduling]);



  const handleAddCourseClick = () => {
    setIsAddingCourse(true);
  };

  const handleBackClick = () => {
    setIsAddingCourse(false);
    setIsScheduling(false);
    setSelectedRow(null);
  };

  const handleScheduleClick = (row) => {
    setSelectedRow(row); // Set the selected row data
    setIsScheduling(true); // Switch to scheduling view
  };

  return (
    <Box>
      {isAddingCourse ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Courses
          </Button>
          <AddTrailForStudent />
        </>
      ) : isScheduling && selectedRow ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Classes
          </Button>
          <AddTrailForStudent rowData={selectedRow} />
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
              Pending Free Trials
            </Typography>
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
                    <TableCell>Student Name</TableCell>
                    <TableCell>Course Type</TableCell>
                    <TableCell>Learned</TableCell>
                    <TableCell>Years</TableCell>

                    <TableCell>Schedule</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData.reverse().map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
                        {row?.studentId?.firstName} {row?.studentId?.lastName}
                      </TableCell>
                      <TableCell sx={{ color: 'grey' }}>
                        {row.courseType}
                      </TableCell>

                      <TableCell sx={{ color: 'grey' }}>
                        {row.isExperienced === true ? 'Yes' : "No"}
                      </TableCell>


                      <TableCell sx={{ color: 'grey' }}>
                        {row.years}
                      </TableCell>


                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ borderRadius: '0px', textTransform: 'none' }}
                          onClick={() => handleScheduleClick(row)}
                        >
                          Schedule the Trial
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
}

export default AdminFreeTrailsMain;
