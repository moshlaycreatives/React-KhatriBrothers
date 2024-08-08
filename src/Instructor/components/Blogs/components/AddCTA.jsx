import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCTAData } from "../../../../../store/actions/blogsActions";

const initialValues = {
  cta_top_title: "",
  cta_top_description: "",
  cta_top_link: "",
  cta_top_image: null,
  cta_bottom_title: "",
  cta_bottom_description: "",
  cta_bottom_link: "",
  button_one_title:"",
  button_two_title:"",
  button_three_title:"",
  button_four_title:"",
};


const AddCTA = (props) => {


  const [formValues, setFormValues] = useState(initialValues);
const dispatch = useDispatch()
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "cta_top_image") {
      setFormValues((prevValues) => ({
        ...prevValues,
        cta_top_image: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!isValidURL(formValues.cta_top_link)) {
      alert("Please enter a valid URL for the CTA top link.");
      return;
    }
    if (!isValidURL(formValues.cta_bottom_link)) {
      alert("Please enter a valid URL for the CTA bottom link.");
      return;
    }
    const addCTA = new FormData();

    addCTA.append("cta_top_title", formValues.cta_top_title);
    addCTA.append("cta_top_description", formValues.cta_top_description);
    addCTA.append("cta_top_link", formValues.cta_top_link);
    addCTA.append("cta_top_image", formValues.cta_top_image); // Ensure cta_top_image is appended
    addCTA.append("button_one_title", formValues.button_one_title);
    addCTA.append("button_two_title", formValues.button_two_title);
    addCTA.append("button_three_title", formValues.button_three_title);
    addCTA.append("button_four_title", formValues.button_four_title);

    addCTA.append("blog_id", props.id); // Append blog_id

    addCTA.append("cta_bottom_title", formValues.cta_bottom_title);
    addCTA.append("cta_bottom_description", formValues.cta_bottom_description);
    addCTA.append("cta_bottom_link", formValues.cta_bottom_link);

    console.log(addCTA, "CTA data");

    dispatch(addCTAData(addCTA))
      .then((res) => {
        alert(res.data.message);
        setFormValues(initialValues);
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please try again.');
      });
  };

  const isValidURL = (url) => {

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };



  useEffect(() => {
    if (!props.open) {
      setFormValues(initialValues);
    }
  }, [props.open]);

  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add CTA</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography>Blog ID : {props.id}</Typography>
            <br/>


            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Title"
                  name="cta_top_title"
                  value={formValues.cta_top_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Description"
                  multiline
                  rows={4}
                  name="cta_top_description"
                  value={formValues.cta_top_description}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Top Button One Title"
                  name="button_one_title"
                  value={formValues.button_one_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Top Button Two Title"
                  name="button_two_title"
                  value={formValues.button_two_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Bottom Button One Title"
                  name="button_three_title"
                  value={formValues.button_three_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Bottom Button Two Title"
                  name="button_four_title"
                  value={formValues.button_four_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Link"
                  multiline
                  rows={4}
                  name="cta_top_link"
                  value={formValues.cta_top_link}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <input
                  type="file"
                  accept="image/*"
                  name="cta_top_image"
                  onChange={handleImageChange}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Bottom Title"
                  name="cta_bottom_title"
                  value={formValues.cta_bottom_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Bottom Description"
                  name="cta_bottom_description"
                  value={formValues.cta_bottom_description}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="CTA Bottom Link"
                  name="cta_bottom_link"
                  value={formValues.cta_bottom_link}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>


            </Grid>
            <br/>
            <Button type="submit" variant="contained">
            Add CTA
          </Button>
          </DialogContent>

        </form>
      </Dialog>
    </div>
  );
};

export default AddCTA;
