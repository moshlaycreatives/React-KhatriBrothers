import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress, // Import CircularProgress for loader
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { deleteGroupMember } from "../../../../store/actions/courseActions";

const GroupDetails = ({ groupdata, onBackClick }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState(groupdata.students);
  const [loading, setLoading] = useState(false); // State to manage loader

  const handleDelete = async (index) => {
    setLoading(true); // Show loader
    try {
      const studentId = students[index]._id;
      await dispatch(deleteGroupMember(groupdata._id, studentId));
      setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
      enqueueSnackbar("Student deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete student", { variant: "error" });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <Box>
      <Button onClick={onBackClick} variant="outlined">
        Back to Group
      </Button>

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

      <TableContainer
        component={Paper}
        sx={{
          padding: "1rem 1rem",
          boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
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
            {students.map((row, index) => (
              <TableRow
                key={row._id} // Use unique ID for key
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                  {groupdata.course}
                </TableCell>
                <TableCell sx={{ color: "grey" }}>{row.firstName}</TableCell>
                <TableCell sx={{ color: "grey" }}>Group</TableCell>
                <TableCell sx={{ color: "grey" }}>{row.gender}</TableCell>
                <TableCell sx={{ color: "grey" }}>{row.country}</TableCell>
                <TableCell sx={{}}>
                  {/* <FaRegEdit
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "green",
                      marginRight: ".5rem",
                    }}
                  /> */}
                  <RiDeleteBin6Line
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => handleDelete(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Loader component */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default GroupDetails;
