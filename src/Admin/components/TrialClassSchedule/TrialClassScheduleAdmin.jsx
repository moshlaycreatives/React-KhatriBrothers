// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import AddTrialSchedule from "./AddTrialSchedule";
// import { getAdminTime } from "../../../store/actions/courseActions";

// const TrialClassScheduleAdmin = () => {
//   const theme = useTheme();
//   const [isAddingInstructor, setIsAddingInstructor] = useState(false);
//   const [InstructorData, setInstructorData] = useState([]); // Data state
//   const [loading, setLoading] = useState(true); // Set initial loading state
//   const dispatch = useDispatch();

//   const handleAddInstructorClick = () => {
//     setIsAddingInstructor(true);
//   };

//   const fetchTime = () => {
//     setLoading(true);
//     dispatch(getAdminTime())
//       .then((res) => {
//         setInstructorData(res.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchTime();
//   }, []);

//   const handleBackClick = () => {
//     setIsAddingInstructor(false);
//   };

//   useEffect(() => {
//     if (!isAddingInstructor) {
//       fetchTime();
//     }
//   }, [isAddingInstructor]);

//   // Group by date
//   const groupedData = InstructorData.reduce((acc, curr) => {
//     const date = new Date(curr.time).toLocaleDateString();
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(curr);
//     return acc;
//   }, {});

//   // Check if a time is expired
//   const isExpired = (time) => {
//     return new Date(time) < new Date();
//   };

//   return (
//     <>
//       {isAddingInstructor ? (
//         <>
//           <Button
//             variant="outlined"
//             onClick={handleBackClick}
//             sx={{ marginBottom: "1rem" }}
//           >
//             &lt; Back to Schedule
//           </Button>
//           <AddTrialSchedule />
//         </>
//       ) : (
//         <Box>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: theme.palette.primary.main,
//                 fontWeight: "550",
//                 fontSize: "2rem",
//               }}
//             >
//               Admin Availability for Trial Class
//             </Typography>
//             <Button variant="outlined" onClick={handleAddInstructorClick}>
//               + Add Schedule
//             </Button>
//           </Box>
//           <Box>
//             <TableContainer
//               component={Paper}
//               sx={{
//                 padding: "1rem",
//                 boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {loading ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "60vh",
//                   }}
//                 >
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 <Table size="small" aria-label="a dense table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Time</TableCell>
//                       <TableCell>Status</TableCell> {/* New column for status */}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {Object.keys(groupedData).map((date, index) => (
//                       <React.Fragment key={date}>
//                         <TableRow>
//                           <TableCell rowSpan={groupedData[date].length}>
//                             {date}
//                           </TableCell>
//                           {groupedData[date].length > 0 && (
//                            <>
//                            <TableCell>
//                               {new Date(groupedData[date][0].time).toLocaleTimeString()}
//                             </TableCell>
//                             <TableCell sx={{color: isExpired(groupedData[date][0].time) ? 'red' : 'green'}}>
//                               {isExpired(groupedData[date][0].time) ? 'Expired' : 'Active'}
//                             </TableCell>
//                            </>
//                           )}
//                         </TableRow>
//                         {groupedData[date].slice(1).map((timeSlot, timeIndex) => (
//                           <TableRow key={timeIndex}>
//                             <TableCell >
//                               {new Date(timeSlot.time).toLocaleTimeString()}
//                             </TableCell>
//                             <TableCell sx={{color: isExpired(timeSlot.time) ? 'red' : 'green'}}>
//                               {isExpired(timeSlot.time) ? 'Expired' : 'Active'}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </React.Fragment>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </TableContainer>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default TrialClassScheduleAdmin;




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
import AddTrialSchedule from "./AddTrialSchedule";
import { getAdminTime } from "../../../store/actions/courseActions";

const TrialClassScheduleAdmin = () => {
  const theme = useTheme();
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [InstructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddInstructorClick = () => {
    setIsAddingInstructor(true);
  };

  const fetchTime = () => {
    setLoading(true);
    dispatch(getAdminTime())
      .then((res) => {
        setInstructorData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTime();
  }, []);

  const handleBackClick = () => {
    setIsAddingInstructor(false);
  };

  useEffect(() => {
    if (!isAddingInstructor) {
      fetchTime();
    }
  }, [isAddingInstructor]);

  // Get today's date and the next two days
  const getDateString = (offset = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    return today.toLocaleDateString();
  };

  const today = getDateString();
  const tomorrow = getDateString(1);
  const nextDay = getDateString(2);

  
  const filteredData = InstructorData.filter((item) => {
    const date = new Date(item.time).toLocaleDateString();
    return [today, tomorrow, nextDay].includes(date);
  });


  const groupedData = filteredData.reduce((acc, curr) => {
    const date = new Date(curr.time).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const isExpired = (time) => {
    return new Date(time) < new Date();
  };

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
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(groupedData).map((date, index) => (
                      <React.Fragment key={date}>
                        <TableRow>
                          <TableCell rowSpan={groupedData[date].length}>
                            {date}
                          </TableCell>
                          {groupedData[date].length > 0 && (
                           <>
                           <TableCell>
                              {new Date(groupedData[date][0].time).toLocaleTimeString()}
                            </TableCell>
                            <TableCell sx={{color: isExpired(groupedData[date][0].time) ? 'red' : 'green'}}>
                              {isExpired(groupedData[date][0].time) ? 'Expired' : 'Active'}
                            </TableCell>
                           </>
                          )}
                        </TableRow>
                        {groupedData[date].slice(1).map((timeSlot, timeIndex) => (
                          <TableRow key={timeIndex}>
                            <TableCell >
                              {new Date(timeSlot.time).toLocaleTimeString()}
                            </TableCell>
                            <TableCell sx={{color: isExpired(timeSlot.time) ? 'red' : 'green'}}>
                              {isExpired(timeSlot.time) ? 'Expired' : 'Active'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
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
