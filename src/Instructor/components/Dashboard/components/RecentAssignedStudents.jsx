import { useTheme } from '@emotion/react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getAssignedStudents } from '../../../../store/actions/courseActions';
import ViewStudentDetails from '../../CourseInfo/components/ViewStudentDetails';
 // Import the ViewStudentDetails component

const RecentAssignedStudents = () => {
  const theme = useTheme();
  const InstructorId = useSelector((state) => state?.auth?.user?._id);
  const [assignedStudent, setAssignedStudent] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(null); // State for selected student ID
  const [isViewing, setIsViewing] = useState(false); // State for view mode

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignedStudents(InstructorId))
      .then((response) => {
        console.log(response.data.data, 'ressssss');
        setAssignedStudent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching assigned students:', error);
      });
  }, [dispatch, InstructorId]);

  const handleViewClick = (id) => {
    console.log(id, 'id')
    setCurrentStudentId(id); // Set the selected student ID
    setIsViewing(true); // Switch to viewing mode
  };

  const handleBackClick = () => {
    setIsViewing(false); // Go back to the student list
    setCurrentStudentId(null); // Clear the selected student ID
  };

  return (
    <>
      {isViewing && currentStudentId ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Students
          </Button>
          <ViewStudentDetails student_Id={currentStudentId} />
        </>
      ) : (
        <Box>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "550",
              fontSize: "2rem",
              mt:2
            }}
          >
            Recent Assigned Students
          </Typography>

          <br />

          <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)" }}>
            <Table sx={{ }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Course Type</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Country</TableCell>
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedStudent.map((row) => (
                  <TableRow
                    key={row._id} // Use row._id as the key
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: 'grey' }}>
                      {row.courseId.title}
                    </TableCell>
                    <TableCell sx={{ color: 'grey' }}>{row.studentId.firstName}</TableCell>
                    <TableCell sx={{ color: 'grey' }}>{row.courseId.courseType}</TableCell>
                    <TableCell sx={{ color: 'grey' }}>{row.studentId.gender}</TableCell>
                    <TableCell sx={{ color: 'grey' }}>{row.studentId.country}</TableCell>
                    {/* <TableCell sx={{ color: theme.palette.primary.main }}>
                      <FaEye
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={() => handleViewClick(row.studentId._id)} // Pass the student ID to the handler
                      />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default RecentAssignedStudents;
