import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import AddTrailForStudent from "./components/AddTrailForStudent";
import {
  adminChangeTrailStatus,
  getAdminFreeTrails,
} from "../../../store/actions/courseActions"; // Import your actions
import { enqueueSnackbar } from "notistack";

const AdminJoinFreeTrails = () => {
  const theme = useTheme();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAdminFreeTrails());
      const data = res.data.data;


      data.sort((a, b) => {
        const now = new Date();
        const startA = new Date(a.startTime);
        const startB = new Date(b.startTime);

        // Compare by date
        if (startA.toDateString() !== startB.toDateString()) {
          return startA - startB; // Ascending order by date
        }

        // Compare by time if dates are the same
        return Math.abs(startA - now) - Math.abs(startB - now); // Ascending order by proximity to current time
      });

      setClassData(data);
    } catch (err) {
      console.error("Failed to fetch free trails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCourseClick = () => {
    setIsAddingCourse(true);
  };

  const handleBackClick = () => {
    setIsAddingCourse(false);
  };

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { formattedDate, formattedTime };
  };

  const isJoinable = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);

    console.log(start, "start");

    const end = new Date(start.getTime() + 15 * 60 * 1000);
    return now >= start && now <= end;
  };

  const handleRedirect = (url) => {
    try {
      new URL(url);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Invalid URL:", url);
    }
  };

  const handleStatusChange = (userId) => {
    dispatch(adminChangeTrailStatus(userId))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        fetchData();

        console.log("Trail status changed successfully.");
      })
      .catch((err) => {
        // Handle error if needed
        enqueueSnackbar(err.response.data.message, { variant: "error" });

        console.error("Failed to change trail status:", err);
      });
  };

  return (
    <Box>
      {isAddingCourse ? (
        <>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            sx={{ marginBottom: "1rem" }}
          >
            &lt; Back to Courses
          </Button>
          <AddTrailForStudent />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "550",
                fontSize: "2rem",
              }}
            >
              Join Free Trials
            </Typography>
          </Box>
          <br />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                    <TableCell>Student Name</TableCell>
                    <TableCell>Course Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Free Trial</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classData
                    .filter((row) => row.link).reverse()
                    .map((row) => {
                      const {
                        formattedDate,
                        formattedTime: formattedStartTime,
                      } = formatDateAndTime(row.startTime);

                      const joinable = isJoinable(row.startTime);

                      return (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ color: "grey" }}>
                            {row.studentId.firstName} {row.studentId.lastName}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ color: "grey" }}
                          >
                            {row.courseType}
                          </TableCell>
                          <TableCell sx={{ color: "grey" }}>
                            {formattedDate}
                          </TableCell>
                          <TableCell sx={{ color: "grey" }}>
                            {formattedStartTime}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                borderRadius: "0px",
                                textTransform: "none",
                              }}
                              onClick={() => handleRedirect(row.link)}
                              disabled={!joinable}
                            >
                              Join
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                borderRadius: "0px",
                                textTransform: "none",
                              }}
                              onClick={() =>
                                handleStatusChange(row.studentId._id)
                              }
                              disabled={row.studentId.trial === true}
                            >
                              Finish
                            </Button>
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
};

export default AdminJoinFreeTrails;
