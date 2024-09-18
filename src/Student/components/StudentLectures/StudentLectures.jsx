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
// import {
//   getInstructorClass,
//   getStudentClass,
// } from "../../../store/actions/courseActions";
// import { useNavigate } from "react-router";

// const StudentLectures = () => {
//   const theme = useTheme();
//   const [isAddingCourse, setIsAddingCourse] = useState(false);
//   const [classData, setClassData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await dispatch(getStudentClass());
//         const data = res.data.data;
//         setClassData(data);
//       } catch (err) {
//         console.error("Failed to fetch advanced courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleAddCourseClick = () => {
//     setIsAddingCourse(true);
//   };

//   const handleBackClick = () => {
//     setIsAddingCourse(false);
//   };


//   const formatDateAndTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const formattedDate = date.toLocaleDateString();

//     const formattedTime = date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return { formattedDate, formattedTime };
//   };


//   const isJoinable = (startTime, endTime) => {
//     const now = new Date();
//     const start = new Date(startTime);

//     const end = new Date(endTime);

//     return now >= start && now <= end;
//   };



//   const handleRedirect = (url) => {
//     try {
//       new URL(url);
//       window.open(url, "_blank");
//     } catch (err) {
//       console.error("Invalid URL:", url);
//     }
//   };

//   return (
//     <Box>
//       {isAddingCourse ? (
//         <></>
//       ) : (
//         <>
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
//               All Classes
//             </Typography>

//             <Button
//               sx={{ textTransform: "none" }}
//               variant="outlined"
//               onClick={() => navigate("/")}
//             >
//               Go to Website
//             </Button>
//           </Box>
//           <br />
//           {loading ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "50vh",
//               }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 padding: "1rem 1rem",
//                 boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <Table size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Class Name</TableCell>

//                     <TableCell>Instructor</TableCell>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Time</TableCell>
//                     <TableCell>Lecture</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {classData.map((row) => {
//                     const { formattedDate, formattedTime: formattedStartTime } =
//                       formatDateAndTime(row.startTime);
//                     const { formattedTime: formattedEndTime } =
//                       formatDateAndTime(row.endTime);





//                     const joinable = isJoinable(row.startTime, row.endTime);

//                     return (
//                       <TableRow
//                         key={row._id}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                         }}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ color: "grey" }}
//                         >
//                           {row.courseId.title}
//                         </TableCell>
//                         <TableCell sx={{ color: "grey" }}>
//                           {row.title}
//                         </TableCell>

//                         <TableCell sx={{ color: "grey" }}>
//                           {`${row.instructorId.firstName} ${row.instructorId.lastName}`}
//                         </TableCell>
//                         <TableCell sx={{ color: "grey" }}>
//                           {formattedDate}
//                         </TableCell>
//                         <TableCell sx={{ color: "grey" }}>
//                           {formattedStartTime} - {formattedEndTime}
//                         </TableCell>

//                         <TableCell>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             sx={{ borderRadius: "0px", textTransform: "none" }}
//                             onClick={() =>
//                               joinable && handleRedirect(row.zoomLink)
//                             }
//                             disabled={!joinable}
//                           >
//                             Join
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default StudentLectures;




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
import { getStudentClass } from "../../../store/actions/courseActions";
import { useNavigate } from "react-router";

const StudentLectures = () => {
  const theme = useTheme();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getStudentClass());
        const data = res.data.data;
        setClassData(data);
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
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

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Calculate end time by adding 2 hours to start time
    const endTime = new Date(date.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime, formattedEndTime };
  };

  const isJoinable = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Calculate end time

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

  return (
    <Box>
      {isAddingCourse ? (
        <></>
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
              All Classes
            </Typography>

            <Button
              sx={{ textTransform: "none" }}
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Go to Website
            </Button>
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
                    <TableCell>Course Name</TableCell>
                    <TableCell>Class Name</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Lecture</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {classData.map((row) => {
    const { formattedDate, formattedTime: formattedStartTime, formattedEndTime } =
      formatDateAndTime(row.startTime);

    const now = new Date();
    const start = new Date(row.startTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Calculate end time

    const isPastEndTime = now > end;
    const joinable = now >= start && now <= end;

                    return (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "grey" }}
                        >
                          {row.courseId.title}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          {row.title}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          {`${row.instructorId.firstName} ${row.instructorId.lastName}`}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          {formattedDate}
                        </TableCell>
                        <TableCell sx={{ color: "grey" }}>
                          {formattedStartTime} - {formattedEndTime}
                        </TableCell>
                        <TableCell>
          {isPastEndTime ? (
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "0px", textTransform: "none" }}

              disabled={!joinable}
            >
              Finished
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "0px", textTransform: "none" }}
              onClick={() => joinable && handleRedirect(row.zoomLink)}
              disabled={!joinable}
            >
              Join
            </Button>
          )}
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

export default StudentLectures;
