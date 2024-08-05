import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { getSingleStudent } from '../../../../store/actions/courseActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const InstructorDetails = (studentId) => {
  return (
    <>
    <Box>
        <Card sx={{ padding: "1rem", marginBottom: "1rem", display:'flex', justifyContent:'space-between'}}>

       <Box>
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
       </Box>
        </Card>
        <Box>
            <TextField placeholder='Please select Teacher'/>
            <Button>Assign</Button>
        </Box>
    </Box>
    </>
  )
}

export default InstructorDetails