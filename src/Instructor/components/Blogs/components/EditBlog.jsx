import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Autocomplete,
  Avatar,
  Chip,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateBlog, getCategory, getSubCategory } from '../../../../../store/actions/blogsActions';
import { getAuths } from "../../../../../store/actions/authorActions";
import { Helmet } from "react-helmet";

const initialValues = {
  title: "",
  description: "",
  author_ids: [],
  meta_title: "",
  meta_description: "",
  img: null,
  img_title: "",
  img_caption: "",
  img_alt_text: "",
  schema: "",
  slug_url: "",
  category_id: []
};

const EditBlog = (props) => {
  // console.log(props, 'blogdata')
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [formValues, setFormValues] = useState(initialValues);
  const [author, setAuthors] = useState([])
  const dispatch = useDispatch()
  const [category, setCategory] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // console.log(`cat on update ${category}`)

  const getAllCategory = () => {
    dispatch(getCategory()).then((res) => {
      // console.log(res.data.payload[0].name, 'this')
      setCategory(res.data.payload)
    }).catch((err) => {
      console.error(err);
    });
    // console.log(dispatch(get))

  }
  useEffect(() => {
    getAllCategory()
  }, [])



  const [subCategory, setSubCategory] = useState()

  // console.log(subCategory)
  const getAllSubCategory = () => {
    dispatch(getSubCategory()).then((res) => {
      console.log(res.data.payload, 'this is subbbbbbbbbbbbb')
      setSubCategory(res.data.payload)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getAllSubCategory()
  }, [])

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategories(e.target.value);
    setFormValues((prevValues) => ({
      ...prevValues,
      subcategories: e.target.value,
    }));
  };

  const getAuthors = async () => {
    dispatch(getAuths()).then((res) => {
      setAuthors(res.data.payload)
    }).catch((err) => {
      console.error(err);
    });
  }
  useEffect(() => {
    getAuthors()
  }, [])


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      setFormValues((prevValues) => ({
        ...prevValues,
        category_id: [{ id: value }],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  const handleImageChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      img: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...formValues,
      title: formValues.blogTitle,
      author_ids: formValues.author_ids.map((id) => id.id),


    }
    console.log("Submitted body:", body);

    dispatch(updateBlog(props.data.id, body)).then((res) => {
      alert(res.data.message);

      setFormValues(initialValues);
      props.close();
      props.createSuccess()
    }).catch((err) => {
      console.error(err);
    });
  };
  useEffect(() => {
    setFormValues({
      ...formValues,
      blogTitle: props.data ? props.data.title : '',
      description: props.data ? props.data.description : '',
      author_ids: props.data ? props.data.authors : [],
      meta_title: props.data ? props.data.meta_title : "",
      meta_description: props.data ? props.data.meta_description : "",
      img: props.data ? props.data.img : "",
      img_title: props.data ? props.data.img_title : "",
      img_caption: props.data ? props.data.img_caption : "",
      img_alt_text: props.data ? props.data.img_alt_text : "",
      schema: props.data ? props.data.schema : "",
      slug_url: props.data ? props.data.slug_url : "",

    })
  }, [props.data])


  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Blog</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Blog Title"
                  name="blogTitle"
                  value={formValues.blogTitle}
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
                  name="description"
                  value={formValues.description}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Autocomplete
                  multiple
                  id="authors"
                  options={author}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) =>
                    formValues.author_ids.some(
                      (author) => author.name === option.name
                    )
                  }
                  onChange={(_, newValue) =>
                    setFormValues((prevValues) => (
                      {
                        ...prevValues,
                        author_ids: newValue,
                      }))
                  }
                  value={formValues.author_ids}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Authors"
                      variant="outlined"
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Avatar src={`${apiUrl}/${option.img}`} alt={option.name} sx={{ mr: 2 }} />
                      {option.name}
                    </li>
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        avatar={<Avatar src={`${apiUrl}/${option.img}`} alt={option.name} />}
                        label={option.name}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />

                {/* <Autocomplete
  multiple
  id="authors"
  options={author}
  getOptionLabel={(option) => option.name}
  getOptionDisabled={(option) =>
    formValues.author_ids.some(
      (author) => author.name === option.name
    )
  }
  onChange={(event, newValue) => {
    console.log("Selected authors:", newValue);
    setFormValues((prevValues) => ({
      ...prevValues,
      author_ids: newValue,
    }));
  }}
  value={formValues.author_ids}
  renderInput={(params) => (
    <TextField
      {...params}
      fullWidth
      label="Authors"
      variant="outlined"
    />
  )}
/> */}

              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Meta Title"
                  name="meta_title"
                  value={formValues.meta_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Meta Description"
                  name="meta_description"
                  value={formValues.meta_description}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="image Title"
                  name="img_title"
                  value={formValues.img_title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="image Description"
                  name="img_caption"
                  value={formValues.img_caption}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="image alt Text"
                  name="img_alt_text"
                  value={formValues.img_alt_text}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Schema"
                  name="schema"
                  value={formValues.schema}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Slug url"
                  name="slug_url"
                  value={formValues.slug_url}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues.category_id[0]?.id}
                    label="Select Category"
                    onChange={(e) => handleFieldChange(e)}
                  >
                    {category?.map((val, ind) => (
                      <MenuItem key={ind} value={val.id}>
                        {val.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel>Select SubCategory</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedSubCategories}
                    label="Select SubCategory"
                    onChange={handleSubCategoryChange}
                    renderValue={(selected) => (
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                          <Chip key={value.id} label={value.name} style={{ margin: '2px' }} />
                        ))}
                      </div>
                    )}
                  >
                    {subCategory?.map((val) => (
                      <MenuItem key={val.id} value={val}>
                        {val.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
    </div>
  );
};

export default EditBlog;
