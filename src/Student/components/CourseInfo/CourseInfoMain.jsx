// import { useTheme } from '@emotion/react';
// import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Paper from '@mui/material/Paper';
// import { FaEye } from "react-icons/fa";
// import ViewLecturesMain from './components/ViewLecturesMain';
// import { useDispatch } from 'react-redux';
// import { getStudentEnrolledCourses } from '../../../store/actions/courseActions';

// const CourseInfoMain = () => {
//   const theme = useTheme();
//   const [selectedCourseId, setSelectedCourseId] = useState(null); // State to track the selected course
//   const [isEdited, setIsEdited] = useState(false);
//   const [courseData, setCourseData] = useState([]);

//   const dispatch = useDispatch();


//   useEffect(() => {
//     const fetchData = async () => {

//       try {
//         const res = await dispatch(getStudentEnrolledCourses());
//         const data = res.data.data;
//         setCourseData(data);
//       } catch (err) {
//         console.error("Failed to fetch advanced courses:", err);
//       }
//     };

//     fetchData();
//   }, []);








// console.log(courseData, 'courseInfdo')
//   const rows = [
//     { coursename: 'Hindustani vocal advanced A series', teacher: 'Faraz', fee: '500$', duration: '12 weeks', _id: 1 },
//     { coursename: 'Hindustani vocal advanced A series', teacher: 'Faraz', fee: '500$', duration: '12 weeks', _id: 2 },
//     { coursename: 'Hindustani vocal advanced A series', teacher: 'Faraz', fee: '500$', duration: '12 weeks', _id: 3 },
//     { coursename: 'Hindustani vocal advanced A series', teacher: 'Faraz', fee: '500$', duration: '12 weeks', _id: 4 }
//   ];

//   const handleViewClick = (courseId) => {
//     setSelectedCourseId(courseId); // Set the selected course ID
//     setIsEdited(true); // Set the state to indicate that a course is selected
//   };

//   const handleBackClick = () => {
//     setIsEdited(false);
//     setSelectedCourseId(null); // Clear the selected course ID when going back
//   };

//   if (isEdited) {
//     return (
//       <>
//         <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
//           &lt; Back to Courses
//         </Button>
//         <ViewLecturesMain courseId={selectedCourseId} /> {/* Pass the selected course ID to the next component */}
//       </>
//     );
//   }

//   return (
//     <Box>
//       <Typography
//         sx={{
//           color: theme.palette.primary.main,
//           fontWeight: "550",
//           fontSize: "2rem",
//         }}
//       >
//         Course Info
//       </Typography>

//       <br />

//       <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)" }}>
//         <Table size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Course Name</TableCell>
//               <TableCell>Instructor</TableCell>
//               <TableCell>Course Fee</TableCell>
//               <TableCell>Duration</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {courseData?.map((row) => (
//               <TableRow
//                 key={row.courseId._id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row" sx={{ color: 'grey' }}>
//                   {row.courseId.title}
//                 </TableCell>
//                 <TableCell sx={{ color: 'grey' }}>{row.instructorId.firstName}</TableCell>
//                 <TableCell sx={{ color: 'grey' }}>{row.courseId.australiaPrice}</TableCell>
//                 <TableCell sx={{ color: 'grey' }}>{row.courseId.courseDuration}</TableCell>
//                 <TableCell sx={{ color: 'grey' }}>
//                   <FaEye
//                     style={{ fontSize: '2rem', cursor: 'pointer' }}
//                     onClick={() => handleViewClick(row.courseId._id)} // Pass the course ID to the handler
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default CourseInfoMain;



import { useTheme } from '@emotion/react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { FaEye } from "react-icons/fa";
import ViewLecturesMain from './components/ViewLecturesMain';
import { useDispatch } from 'react-redux';
import { getStudentEnrolledCourses } from '../../../store/actions/courseActions';

const CourseInfoMain = () => {
  const theme = useTheme();
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State to track the selected course
  const [isEdited, setIsEdited] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getStudentEnrolledCourses());
        const data = res.data.data;
        setCourseData(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(courseData, 'courseInfdo');

  const handleViewClick = (courseId) => {
    setSelectedCourseId(courseId); // Set the selected course ID
    setIsEdited(true); // Set the state to indicate that a course is selected
  };

  const handleBackClick = () => {
    setIsEdited(false);
    setSelectedCourseId(null); // Clear the selected course ID when going back
  };

  if (isEdited) {
    return (
      <>
        <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
          &lt; Back to Courses
        </Button>
        <ViewLecturesMain courseId={selectedCourseId} /> {/* Pass the selected course ID to the next component */}
      </>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    ); // Show loader while fetching data
  }

  return (
    <Box>
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "550",
          fontSize: "2rem",
        }}
      >
        Course Info
      </Typography>

      <br />

      <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Course Fee</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseData?.map((row) => (
              <TableRow
                key={row.courseId._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: 'grey' }}>
                  {row.courseId.title}
                </TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.instructorId.firstName}</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.courseId.australiaPrice}</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.courseId.courseDuration}</TableCell>
                <TableCell sx={{ color: 'grey' }}>
                  <FaEye
                    style={{ fontSize: '1.5rem', color:theme.palette.primary.main, cursor: 'pointer' }}
                    onClick={() => handleViewClick(row.courseId._id)} // Pass the course ID to the handler
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseInfoMain;
