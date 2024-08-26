import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import AddTrialSchedule from "./AddTrialSchedule";
import { getAdminTime } from "../../../store/actions/courseActions";

const TrialClassScheduleAdmin = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [InstructorData, setInstructorData] = useState([]); // Data state
  const [currentRowId, setCurrentRowId] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state
  const dispatch = useDispatch();

  const handleAddInstructorClick = () => {
    setIsAddingInstructor(true);
  };

  const fetchTime = () => {
    dispatch(getAdminTime())
      .then((res) => {
        console.log(res, "res");
        setInstructorData(res.data.data); // Store response data
        setLoading(false); // Update loading state
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Ensure loading state is updated even on error
      });
  };

  useEffect(() => {
    fetchTime();
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (events, id) => {
    setAnchorEl(events.currentTarget);
    setCurrentRowId(id);
  };

  const handleEditClick = () => {
    // handle edit logic
  };

  const handleBackClick = () => {
    setIsAddingInstructor(false);
    setCurrentRowId(null);

  };


    // Fetch instructor data after coming back from AddInstructor
    useEffect(() => {
      if (!isAddingInstructor) {
        fetchTime(); // Trigger the API call again
      }
    }, [isAddingInstructor]);


  return (
    <>
      {isAddingInstructor ? (
        <>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            sx={{ marginBottom: "1rem" }}
          >
            &lt; Back to Schedule
          </Button>
          <AddTrialSchedule />
        </>
      ) : (
        <Box>
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
              Admin Availability for Trial Class
            </Typography>
            <Button variant="outlined" onClick={handleAddInstructorClick}>
              + Add Schedule
            </Button>
          </Box>
          <Box>
            <TableContainer
              component={Paper}
              sx={{
                padding: "1rem",
                boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                      <TableCell>Date</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell>Time</TableCell>
                      <TableCell></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {InstructorData.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                        <TableCell>{new Date(row.time).toLocaleDateString()}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                        <TableCell>{new Date(row.time).toLocaleTimeString()}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TrialClassScheduleAdmin;
