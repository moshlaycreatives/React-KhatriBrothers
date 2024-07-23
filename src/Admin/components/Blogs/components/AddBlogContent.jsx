import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { addBContent } from '../../../../../store/actions/blogsActions';
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import JoditEditor from "jodit-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Helmet } from "react-helmet";
const AddBlogContent = (props) => {
  const dispatch = useDispatch();

  const [blogContent, setBlogContent] = useState({
    title: "",
    description: "",
    imgs: [],
    link: '',
  });

  useEffect(() => {
    if (!props.open) {
      // Reset form fields when dialog is closed
      setBlogContent({
        title: "",
        description: "",
        imgs: [],
        link: '',
      });
    }
  }, [props.open]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setBlogContent((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setBlogContent((prevValues) => ({
      ...prevValues,
      imgs: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blog_id", props.id);
    formData.append("title", blogContent.title);
    formData.append("description", blogContent.description);
    formData.append("link", blogContent.link);

    for (let i = 0; i < blogContent.imgs.length; i++) {
      formData.append("imgs[]", blogContent.imgs[i]);
    }

    try {
      await dispatch(addBContent(formData, blogContent));
      setBlogContent({
        title: "",
        description: "",
        imgs: [],
        link: '',
      });
      props.close();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'table', 'video',],
      ['clean']
    ],
  };

  const handleDescriptionChange = (value) => {
    setBlogContent((prevValues) => ({
      ...prevValues,
      description: value,
    }));
  };

  const handleTitleChange = (value) => {
    setBlogContent((prevValues) => ({
      ...prevValues,
      title: value,
    }));
  };

  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Blog Content</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <ReactQuill
                  value={blogContent.title}
                  onChange={handleTitleChange}
                  theme="snow"
                  modules={modules}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <ReactQuill
                  value={blogContent.description}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  modules={modules}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="alt text"
                  name="link"
                  value={blogContent.link}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddBlogContent;
