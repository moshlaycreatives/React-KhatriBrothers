import { useTheme } from "@emotion/react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { getStudentData } from "../../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
const RecentEnrollments = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [enrolledStudents, setEnrolledStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getStudentData());
        setEnrolledStudents(res.data.data);
        console.log("testtimonial  data:", res.data.data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchData();
  }, [dispatch]);


  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: "2rem",
          }}
        >
          Recent Enrollments
        </Typography>

        <br />

        <TableContainer
          component={Paper}
          sx={{
            padding: "1rem 1rem",
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table sx={{}} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Class Type</TableCell>
                <TableCell>Enrollment Date</TableCell>
                <TableCell>Fee Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledStudents.slice(0, 5).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                    {row.courseId.title}
                  </TableCell>
                  <TableCell sx={{ color: "grey" }}>
                    {row.studentId.firstName}
                  </TableCell>
                  {/* <TableCell sx={{color:'grey'}}>{row.classType}</TableCell> */}

                  <TableCell sx={{ color: "grey" }}>
                    {row.classType === "one2one" ? "One to One" : "Group"}
                  </TableCell>

                  <TableCell sx={{ color: "grey" }}>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                    {row.installment === true ? "Installment" : "Full Paid"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default RecentEnrollments;