import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Button, Divider, Box } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import AddJob from './components/AddJob';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UpdateJob from './components/UpdateJob';
import { api } from '../../../../utils/api';
import { useDispatch } from 'react-redux';
import { deleteJob, getJobs } from '../../../../store/actions/jobsActions';
import { Helmet } from 'react-helmet';
import { ThemeContext } from '@emotion/react';
const Jobs = () => {
    const [open , setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateData, setUpdateData] = useState('')
    const [jobs, setjobs] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = import.meta.env.VITE_REACT_APP_URL;
    const dispatch = useDispatch()
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpenUpdate = (data) => {
      setUpdateData(data)
      setUpdateOpen(true)
  }
  const handleCloseUpdate = () => {
    setUpdateData('')
    setUpdateOpen(false)
  }


    const getAllJobs = () => {
      dispatch(getJobs()).then((result) => {
        setjobs(result.data.payload)
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        console.log(err)
      });
    }
    useEffect(()=> {
      getAllJobs()
    }, [])


    const handleDelete = (val) => {
        confirmAlert({
          title: 'Delete?',
          message: `Are you sure to delete ?`,
          buttons:[
            {
              label: 'Yes',
              onClick: () =>{
               dispatch(deleteJob(val.id)).then((result) => {
                alert(result.data.message)
                getAllJobs()
               }).catch((err) => {
                console.log(err)
               });
              }
            },
           {
            label: 'No',
           }

          ]
        })


      }
  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>


        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <Typography variant="h2" fontWeight="bold" mb={3}>
        Manage Categories
      </Typography>
      <Button variant='outlined' endIcon={<Add />} onClick={handleOpen}>
        Add Category
      </Button>
        </Box>
        {
          loading ?
          <Typography variant='h3' textAlign="center">Please Wait</Typography>
        :
      <Grid container spacing={3} >
        {jobs?.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index} height={'80vh'} >
            <Card sx={{ height: '100%', overflow:'auto' }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                 {job.job_title}
                </Typography>
                <Divider sx={{my:2}} />
                <Typography color="textSecondary" gutterBottom>
                <span style={{fontWeight:'600'}}>Job Type : </span> {job.job_type}
                </Typography>
                <Typography color="textSecondary" paragraph>
                <span style={{fontWeight:'600'}}>Job Description : </span> <br/> {job.job_description}
                </Typography>
                <Typography color="textSecondary" paragraph>

                  <span style={{fontWeight:'600'}}>Requirements: </span> <br/>
                   {job.job_requirements}
                </Typography>
                <Typography color="textSecondary">

                  <span style={{fontWeight:'600'}}>Location: </span> <br/>

                  {job.job_location}
                </Typography>
                {/* <Typography color="primary" sx={{ cursor: 'pointer', fontSize:'15px', mt:2 }}>
                    <i>
                        <b>
                        Read More...
                        </b>
                    </i>
                </Typography> */}
                <Divider sx={{ my: 2 }} />
                <Button variant="outlined" color="primary" sx={{ mt: 2, mr: 2 }}
                onClick={()=>handleOpenUpdate(job)}
                >
                  Update
                </Button>
                <Button variant="contained" color="error" sx={{ mt: 2 }}
                endIcon={
                    <Delete />
                }
                onClick={()=>handleDelete(job)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

        }
      <AddJob
      open={open}
      close={handleClose}
      createSuccess = {getAllJobs}
      />
      <UpdateJob
      open={updateOpen}
      close={handleCloseUpdate}
      data={updateData}
      createSuccess = {getAllJobs}

      />
    </div>
  );
}

export default Jobs;
