import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJob } from "../../../../../store/actions/jobsActions";
import { Helmet } from "react-helmet";

const initialValues = {
  type: '',
  title: '',
  desc: '',
  req: '',
  loc: '',
}

const AddJob = (props) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData()
    formData.append('job_type', formValues.type)

    dispatch(addJob(formData)).then((result) => {
      setLoading(false)
      alert(result.data.message);
      setFormValues(initialValues);
      props.close();
      props.createSuccess()
    }).catch((err) => {
      setLoading(false)
      console.error(err);
    });

  }

  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Job</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues.type}
                    label="Job Type"
                    onChange={handleFieldChange}
                    name="type"
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={formValues.title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  name="desc"
                  value={formValues.desc}
                  onChange={handleFieldChange}
                  required

                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Requirements"
                  multiline
                  rows={2}
                  name="req"
                  value={formValues.req}
                  onChange={handleFieldChange}
                  required

                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="loc"
                  value={formValues.loc}
                  onChange={handleFieldChange}
                  required

                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant={loading ? 'disbaled' : 'contained'}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AddJob;
