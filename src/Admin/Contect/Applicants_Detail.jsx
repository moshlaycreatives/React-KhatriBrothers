import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteCandidate,
  getAppliedCandidates,
  getJobs,
} from "../../../store/actions/jobsActions";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { useSnackbar } from "notistack";
import { Delete } from "@mui/icons-material";

const AppDetail = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from the hook
const [jobs, setjobs]= useState([])
  const [candidates, setCandidates] = useState([]);


  const getAllJobs = () => {
    dispatch(getJobs()).then((result) => {
      setjobs(result.data.payload)
    //   setLoading(false)
    }).catch((err) => {
    //   setLoading(false)
      console.log(err)
    });
  }
  useEffect(()=> {
    getAllJobs()
  }, [])



  const getAllApplicants = () => {
    dispatch(getAppliedCandidates())
      .then((result) => {
        // yaha payload ki jagah jobs likhna h backend sy response m jobs a rha is liye

        setCandidates(result.data.jobs);
        //   setLoading(false)
      })
      .catch((err) => {
        //   setLoading(false)
        console.log(err);
      });
  };
  useEffect(() => {
    getAllApplicants();
  }, []);

  const handleDelete = (val) => {
    confirmAlert({
      title: "Delete?",
      message: `Are you sure to delete ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteCandidate(val.id))
              .then((result) => {
                // alert(result.data.message)
                enqueueSnackbar("Candidate Deleted successfully!", {
                  variant: "success",
                });

                getAllApplicants();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
        All Job Applicants Data
      </Typography>




      <Grid container spacing={3}>
        {candidates?.map((candidate, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
              <Typography variant="h6" >
                  Job Applied for : {candidate.job_post_id}
                </Typography>
                <Typography variant="h6" sx={{fontSize:'1.3rem'}}>
                  Name: {candidate.name}
                </Typography>
                {/* <Divider sx={{ my: 2 }} /> */}
                <Typography color="textSecondary" gutterBottom>
                  Email: {candidate.email}
                </Typography>
                <Typography color="textSecondary" paragraph>
                  Phone # : {candidate.phone}
                </Typography>
                <Typography color="textSecondary" paragraph>
                  LinkedIn: {candidate.linkedin}
                </Typography>






                <Typography color="textSecondary" paragraph>
  Resume:
  {candidate.resume && (
    <a href={`https://test.saeedantechpvt.com/${candidate.resume}`} download target="_blank">
      Download Resume
    </a>
  )}
</Typography>


                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  endIcon={<Delete />}
                  onClick={() => handleDelete(candidate)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AppDetail;
