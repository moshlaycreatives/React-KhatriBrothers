import { useTheme } from '@emotion/react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useSnackbar } from 'notistack'; // Import useSnackbar
import { deleteGroupMember } from '../../../../store/actions/courseActions';

const GroupDetails = ({ groupdata }) => {
  const theme = useTheme();


  const dispatch = useDispatch(); // Initialize dispatch
  const { enqueueSnackbar } = useSnackbar(); // Initialize Snackbar


const groupId = groupdata._id
  const handleDelete = async (index) => {
    try {
      const studentId = groupdata.students[index]; // Assuming each student has an _id field
      await dispatch(deleteGroupMember(groupId, studentId));
      enqueueSnackbar('Student deleted successfully', { variant: 'success' });
      
    } catch (error) {
      enqueueSnackbar('Failed to delete student', { variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "550",
          fontSize: "2rem",
        }}
      >
        Group Details
      </Typography>
      <br />
      <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)", }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupdata.students.map((row, index) => (
              <TableRow
                key={row._id} // Use unique ID for key
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: 'grey' }}>
                  {groupdata.course}
                </TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.firstName}</TableCell>
                <TableCell sx={{ color: 'grey' }}>Group</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.gender}</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.country}</TableCell>
                <TableCell sx={{ }}>
                  <FaRegEdit style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'green', marginRight: '.5rem' }} />
                  <RiDeleteBin6Line
                    style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                    onClick={() => handleDelete(index)} // Handle delete click
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GroupDetails;
