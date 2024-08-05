import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { assignInstructor, getInstructors, getSingleStudent } from '../../../../store/actions/courseActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const ViewStudent = ({student_Id}) => {


    console.log('studen id on next page ',student_Id)

const {enqueueSnackbar} = useSnackbar()
    const [studentData , setStudentData] = useState({})
    const [courseData , setCourseData] = useState({})

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
        //   setLoading(true); // Set loading to true before fetching data
          try {
            const res = await dispatch(getSingleStudent(student_Id));
            console.log(res.data.data.studentId, "hahahahhaaa");
            setStudentData(res.data.data.studentId);
            setCourseData(res.data.data.courseId);

          } catch (err) {
            console.error("Failed to fetch student:", err);
          } finally {
            // setLoading(false); // Set loading to false after data is fetched or if an error occurs
          }
        };

        fetchData();
      }, [dispatch,student_Id]);






      const [teachers, setTeachers] = useState([]); // State to store the list of teachers
      const [selectedTeacher, setSelectedTeacher] = useState(''); // State to store selected teacher


  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await dispatch(getInstructors());
        setTeachers(res.data.data);

      } catch (err) {
        console.error("Failed to fetch beginner courses:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);


      const handleChange = (event) => {
        setSelectedTeacher(event.target.value);
      };

      const handleAssign = () => {
        // Handle the assign logic here
        console.log('Assigned Teacher:', selectedTeacher);


        dispatch(assignInstructor(selectedTeacher, student_Id))
        .then((res) => {

          enqueueSnackbar(res.data.message, { variant: "success" });


          // setFormValues(initialValues);
          // navigate(from)
        })
        .catch((err) => {
          enqueueSnackbar(err?.response?.data?.message, {
            variant: "error",
          });

          console.log(err);
        });





      };


      console.log('teacher data',selectedTeacher);









  return (
    <>
    <Box>
        <Card sx={{ padding: "1rem", marginBottom: "1rem", display:'flex', justifyContent:'space-between'}}>

        <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Student Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {studentData.firstName}

 </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          {courseData.title}

          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Age
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {studentData.learnerType}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Gender
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {studentData.gender}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Fee
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.price}
          </Typography>
          </Box>

          <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Email
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {studentData.email}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Phone
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          {studentData.phone}

          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Type
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.courseType}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Class Type
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            Group
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Country
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {studentData.country}
          </Typography>
          </Box>
          <Button>click</Button>
        </Card>
        <Box sx={{width:'50%'}}>
            {/* <TextField placeholder='Please select Teacher' fullWidth size='small'/> */}
            <FormControl fullWidth size='small'>
        <InputLabel>Select Teacher</InputLabel>
        <Select
          value={selectedTeacher}
          onChange={handleChange}
          label="Select Teacher"
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.firstName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <br/>
            <br/>

            <Button fullWidth variant='contained' onClick={()=>handleAssign()}>Assign</Button>
        </Box>
    </Box>
    </>
  )
}

export default ViewStudent