import React, { useEffect, useMemo, useState } from "react";
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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBlog, getAllCTA, getCategory, getSubCategory } from '../../../../../store/actions/blogsActions';
import { getAuths } from "../../../../../store/actions/authorActions";
// import { Editor } from "@tinymce/tinymce-react";
import JoditEditor from "jodit-react";
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
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



const AddBlog = (props) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [formValues, setFormValues] = useState(initialValues);
  const [author, setAuthors] = useState([])


  const [selectedSubCategories, setSelectedSubCategories] = useState([]);


  // console.log('selected',selectedSubCategories)

  // console.log(selectedSubCategories)
  // const [selectedBlogId, setSelectedBlogId] = useState(null);
  const dispatch = useDispatch()
  const getAuthors = async () => {
    dispatch(getAuths()).then((res) => {
      setAuthors(res.data.payload)
      // console.log(res.data.payload)

    }).catch((err) => {
      console.error(err);
    });

  }
  useEffect(() => {
    getAuthors()
  }, [])
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_ids") {
      // Ensure value is always an array
      const categoryIds = Array.isArray(value) ? value : [value];
      setFormValues((prevValues) => ({
        ...prevValues,
        category_id: categoryIds, // Always set as an array
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };


  const [category, setCategory] = useState([])

  // console.log('cateeeeee', category)
    const getAllCategory = () => {
      dispatch(getCategory()).then((res) => {
        // console.log(res.data.payload[0].name, 'this')
        setCategory(res.data.payload)

        // console.log(`response ${res.data.payload}`)


      }).catch((err) => {
        console.error(err);
      });
      // console.log(dispatch(get))

    }
    useEffect(() => {
      getAllCategory()
    }, [])




  const handleImageChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      img: e.target.files[0],
    }));
  };


  const [allCTA, setAllCTA] = useState([])




  useEffect(() => {
    dispatch(getAllCTA()).then((res) => {
      setAllCTA(res.data.payload);
    }).catch((err) => {
      console.error(err);
    });
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();



  const ctaExists = allCTA.some(cta => cta.id === formValues.cta_id);
  if (ctaExists) {
    alert('CTA already added.');
    return;
  }


    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('meta_title', formValues.meta_title);
    formData.append('meta_description', formValues.meta_description);
    formData.append('category_ids[]', formValues.category_id[0]);

    console.log('category_ids:', formValues.category_id[0]);

    formData.append('slug_url', formValues.slug_url);
    formData.append('schema', formValues.schema);
    formData.append('img_alt_text', formValues.img_alt_text);
    formData.append('img_caption', formValues.img_caption);
    formData.append('img_title', formValues.img_title);
    // formData.append('sub_category_ids[]', formValues.category_id[0]?.id);

    formData.append('img', formValues.img);
    formValues.author_ids.forEach((authorId) => {
      formData.append('author_ids[]', authorId.id);
    });

    dispatch(addBlog(formData))
      .then((res) => {
        alert(res.data.message);
        setFormValues(initialValues);

        props.close();
        props.createSuccess();
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred. Please try again.');
      });
  };
  // console.log(formValues.description, 'des')


  const [subCategory, setSubCategory] = useState()
  const getAllSubCategory = () => {
    dispatch(getSubCategory()).then((res) => {
      // console.log(res.data.payload, 'this is subbbbbbbbbbbbb')
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
  const handleDescriptionChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      description: value
    }));
  };
  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Blog</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="Blog Title"
                  name="title"
                  value={formValues.title}
                  onChange={handleFieldChange}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={12}>

                <ReactQuill

          value={formValues.description}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                      ['blockquote', 'code-block'],

                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                      [{ 'direction': 'rtl' }],                         // text direction

                      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                      [{ 'font': [] }],
                      [{ 'align': [] }],

                      ['clean'],                                         // remove formatting button

                      ['link', 'image', 'video'],
                      ['table']                        // link and image, video
                    ]
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                  placeholder="Write something..."


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
                <textarea
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="Schema"
                  name="schema"
                  rows={5}
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
                    name='category_ids'
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
{/*
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel>Select SubCategory</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={selectedSubCategories}
                    label="Select SubCategory"
                    name='sub_category_ids'
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
              </Grid> */}


            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddBlog;
