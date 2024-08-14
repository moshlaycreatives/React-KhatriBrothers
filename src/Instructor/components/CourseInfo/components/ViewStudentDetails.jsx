// import {
//   Box,
//   Button,
//   Card,
//   FormControl,
//   IconButton,
//   InputLabel,
//   Menu,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect } from "react";
// import {
//   assignInstructor,
//   getInstructors,
//   getSingleStudent,
// } from "../../../../store/actions/courseActions";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSnackbar } from "notistack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// const ViewStudentDetails = ({ student_Id }) => {
//   console.log("studen id on next page ", student_Id);

//   const { enqueueSnackbar } = useSnackbar();
//   const [studentData, setStudentData] = useState({});
//   const [courseData, setCourseData] = useState({});
//   const [anchorEl, setAnchorEl] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await dispatch(getSingleStudent(student_Id));

//         setStudentData(res.data.data.studentId);
//         setCourseData(res.data.data.courseId);
//       } catch (err) {
//         console.error("Failed to fetch student:", err);
//       } finally {
//         // setLoading(false); // Set loading to false after data is fetched or if an error occurs
//       }
//     };

//     fetchData();
//   }, [dispatch, student_Id]);

//   const [teachers, setTeachers] = useState([]); // State to store the list of teachers
//   const [selectedTeacher, setSelectedTeacher] = useState(""); // State to store selected teacher

//   useEffect(() => {
//     const fetchData = async () => {
//       // setLoading(true);
//       try {
//         const res = await dispatch(getInstructors());
//         setTeachers(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch beginner courses:", err);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleChange = (event) => {
//     setSelectedTeacher(event.target.value);
//   };

//   const handleAssign = () => {
//     dispatch(assignInstructor(selectedTeacher, student_Id))
//       .then((res) => {
//         enqueueSnackbar(res.data.message, { variant: "success" });
//       })
//       .catch((err) => {
//         enqueueSnackbar(err?.response?.data?.message, {
//           variant: "error",
//         });

//         console.log(err);
//       });
//   };

//   const handleMenuClick = (events) => {
//     setAnchorEl(events.currentTarget);
//     // setCurrentRowId(id);
//     // console.log('current student id:', currentRowId);
//   };

//   return (
//     <>
//       <Box>
//         <Card
//           sx={{
//             padding: "1rem",
//             marginBottom: "1rem",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "start",
//           }}
//         >
//           <Box>
//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Student Name
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {studentData.firstName}
//             </Typography>
//             <br />

//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Course Type
//             </Typography>

//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {courseData.title}
//               <br />
//             </Typography>

//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Age
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {studentData.learnerType}
//             </Typography>
//             <br />

//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Gender
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {studentData.gender}
//             </Typography>
//             <br />
//           </Box>

//           <Box>
//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Email
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {studentData.email}
//             </Typography>
//             <br />

//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Course Name
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {courseData.courseType}
//             </Typography>
//             <br />

//             <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
//               Country
//             </Typography>
//             <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
//               {studentData.country}
//             </Typography>
//           </Box>
//           {/* <Button>click</Button> */}
//           <div></div>
//         </Card>

//         {/* <TextField placeholder='Please select Teacher' fullWidth size='small'/> */}
//         {/* <Box sx={{width:'30%'}}>
//             <FormControl fullWidth size='small'>
//         <InputLabel>Select Teacher</InputLabel>
//         <Select
//           value={selectedTeacher}
//           onChange={handleChange}
//           label="Select Teacher"
//         >
//           {teachers.map((teacher) => (
//             <MenuItem key={teacher._id} value={teacher._id}>
//               {teacher.firstName}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//             <br/>
//             <br/>

//             <Button fullWidth variant='contained' onClick={()=>handleAssign()}>Assign</Button>
//         </Box> */}
//       </Box>
//     </>
//   );
// };

// export default ViewStudentDetails;




import { Box, Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { assignInstructor, getInstructors, getSingleStudent } from '../../../../store/actions/courseActions'

const ViewStudentDetails = ({ student_Id }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [studentData, setStudentData] = useState({})
    const [courseData, setCourseData] = useState({})

    console.log(courseData, 'data type')
    const [teachers, setTeachers] = useState([]) // State to store the list of teachers
    const [selectedTeacher, setSelectedTeacher] = useState('') // State to store selected teacher
    const [loading, setLoading] = useState(true) // Loading state
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await dispatch(getSingleStudent(student_Id))
                setStudentData(res.data.data.studentId)
                setCourseData(res.data.data.courseId)
            } catch (err) {
                console.error('Failed to fetch student:', err)
            } finally {
                setLoading(false) // Set loading to false after data is fetched or if an error occurs
            }
        }

        fetchData()
    }, [dispatch, student_Id])

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await dispatch(getInstructors())
                setTeachers(res.data.data)
            } catch (err) {
                console.error('Failed to fetch instructors:', err)
            }
        }

        fetchTeachers()
    }, [dispatch])

    const handleChange = (event) => {
        setSelectedTeacher(event.target.value)
    }

    const handleAssign = () => {
        dispatch(assignInstructor(selectedTeacher, student_Id))
            .then((res) => {
                enqueueSnackbar(res.data.message, { variant: 'success' })
            })
            .catch((err) => {
                enqueueSnackbar(err?.response?.data?.message, {
                    variant: 'error',
                })
                console.log(err)
            })
    }

    return (
        <Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Card sx={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Student Name</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{studentData.firstName}</Typography>
                        <br />
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Course Type</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{courseData.courseType}</Typography>
                        <br />
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Age</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{studentData.learnerType}</Typography>
                        <br />
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Gender</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{studentData.gender}</Typography>
                        <br />
                    </Box>

                    <Box>

                        
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Course Name</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{courseData.courseType}</Typography>
                        <br />
                        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Country</Typography>
                        <Typography sx={{ marginTop: '0.2rem', color: 'grey' }}>{studentData.country}</Typography>
                    </Box>
                </Card>
            )}
        </Box>
    )
}

export default ViewStudentDetails
