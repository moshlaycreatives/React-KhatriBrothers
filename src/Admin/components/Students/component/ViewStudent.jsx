import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { getSingleStudent } from '../../../../store/actions/courseActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ViewStudent = (studentId) => {
    // console.log('jjj',studentId)
    // const [studentData , setStudentData] = useState({})
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchData = async () => {
    //     //   setLoading(true); // Set loading to true before fetching data
    //       try {
    //         const res = await dispatch(getSingleStudent(studentId));
    //         console.log(res.data.data, "hahahahhaaa");
    //         setStudentData(res.data.data);
    //       } catch (err) {
    //         console.error("Failed to fetch student:", err);
    //       } finally {
    //         // setLoading(false); // Set loading to false after data is fetched or if an error occurs
    //       }
    //     };
    
    //     fetchData();
    //   }, [dispatch,studentId]);
    //   console.log('studentdata',studentData);
  return (
    <>
    <Box>
        <Card sx={{ padding: "1rem", marginBottom: "1rem", display:'flex', justifyContent:'space-between'}}>

        <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Student Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>, 

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Age
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Gender
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Fee
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>
          </Box>

          <Box >
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Email
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad@dahfj
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Phone
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            736182332432
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Type
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            Course Type
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Class Type
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Country 
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            ahmad
          </Typography>
          </Box>
          <Button>click</Button>
        </Card>
        <Box>
            <TextField placeholder='Please select Teacher'/>
            <Button>Assign</Button>
        </Box>
    </Box>
    </>
  )
}

export default ViewStudent