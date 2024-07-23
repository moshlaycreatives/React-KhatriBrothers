import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { updateSinglePortfolio } from "../../../../../store/actions/PortfolioActions";
import { editCTA } from "../../../../../store/actions/blogsActions";
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


  const EditCTA = (props) => {

   

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initialValues);


    const handleFieldChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };


    const handleImageChange = (e, fieldName) => {
      const selectedImage = e.target.files[0];
      console.log("Selected Image:", selectedImage);

      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: selectedImage,
      }));

      console.log("Updated Form Values:", formValues);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const body = {
        ...formValues,

      };


      dispatch(editCTA(props.data.id, body))
        .then((res) => {

          console.log(res.data.payload, 'payloadedd')
          alert(res.data.message);


          setFormValues(initialValues);


          // props.close();
          // props.createSuccess()
        })
        .catch((err) => {
          console.error(err);
        });
    };


    useEffect(() => {
        // Initialize form values with CTA data
        setFormValues({
          ...formValues,
          cta_top_title: props.data ? props.data.cta_top_title : "",
          cta_top_description: props.data ? props.data.cta_top_description : "",
          cta_top_image: props.data ? props.data.cta_top_image : null,
          cta_top_link: props.data ? props.data.cta_top_link : "",
          cta_bottom_title: props.data ? props.data.cta_bottom_title : "",
          cta_bottom_description: props.data ? props.data.cta_bottom_description : "",
          cta_bottom_link: props.data ? props.data.cta_bottom_link : "",
          button_one_title: props.data ? props.data.button_one_title : "",
          button_two_title: props.data ? props.data.button_two_title : "",
          button_three_title: props.data ? props.data.button_three_title : "",
          button_four_title: props.data ? props.data.button_four_title : "",
        });
      }, [props.data]);


    return (
      <>
        <Dialog open={props.open} fullWidth onClose={props.close}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Edit CTA</DialogTitle>

            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="CTA top Title"
                    name="cta_top_title"
                    value={formValues.cta_top_title}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="CTA Top Description"
                    name="cta_top_description"
                    value={formValues.cta_top_description}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <input
                    type="file"
                    accept="image/*"
                    name="cta_top_image"
                    onChange={(e) => handleImageChange(e, "cta_top_image")}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="CTA Top Link"
                    name="cta_top_link"
                    value={formValues.cta_top_link}
                    onChange={handleFieldChange}
                    required
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

                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="button_one_title"
                    name="button_one_title"
                    value={formValues.button_one_title}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="button_two_title"
                    name="button_two_title"
                    value={formValues.button_two_title}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="button_three_title"
                    name="button_three_title"
                    value={formValues.button_three_title}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="button_four_title"
                    name="button_four_title"
                    value={formValues.button_four_title}
                    onChange={handleFieldChange}
                    required
                  />
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  };

  export default EditCTA;
