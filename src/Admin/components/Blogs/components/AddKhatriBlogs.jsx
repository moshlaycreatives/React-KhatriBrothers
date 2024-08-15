import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addBlogs } from "../../../../store/actions/courseActions";

const inputStyles = {
  marginBottom: "0.5rem",
  marginTop: "0.9rem",
};

const labelStyles = {
  fontSize: "1rem",
  fontWeight: "400",
};

const cardStyles = {
  padding: "1rem",
};

const boxStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "4px",
  width: "100%",
};

const fileInputStyles = {
  "& .MuiInputBase-root": {
    padding: "0",
  },
  "& input": {
    display: "none",
  },
};

const fileButtonStyles = {
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "0.5rem 1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f1f1f1",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
};

const AddKhatriBlogs = () => {
  const initialValues = {
    title: '',
    youtubeLink: '',

    description: '',
    content: '',
    readTime: '',
    images: null,
  };

  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormValues((prev) => ({ ...prev, content: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prev) => ({ ...prev, images: file }));
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('youtubeLink', formValues.youtubeLink);

    formData.append('description', formValues.description);
    formData.append('content', formValues.content);
    formData.append('readTime', formValues.readTime);

    if (formValues.images) {
      formData.append('images', formValues.images);
    }

    dispatch(addBlogs(formData)).then((res) => {
      setFormValues(initialValues);
      setImagePreview(null);
      setImageName("");
      setIsLoading(false);
      enqueueSnackbar(res.data.message, { variant: 'success' });
    }).catch((err) => {
      setIsLoading(false);
      enqueueSnackbar(err.response.data.message, { variant: 'error' });
    });
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Card sx={cardStyles}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
          Add Blog
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Title</Typography>
            <TextField
              placeholder="Enter blog title"
              fullWidth
              size="small"
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
          </Box>

          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Youtube Link</Typography>
            <TextField
              placeholder="Enter Youtube Link"
              fullWidth
              size="small"
              name="youtubeLink"
              value={formValues.youtubeLink}
              onChange={handleChange}
            />
          </Box>





          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Description</Typography>
            <TextField
              placeholder="Enter blog description"
              fullWidth
              size="small"
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </Box>

          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Content</Typography>
            <ReactQuill
              value={formValues.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              style={{ height: '200px', marginBottom: '1rem' }}
            />
          </Box>
<br/>
<br/>
<br/>

          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Read Time (in minutes)</Typography>
            <TextField
              placeholder="Enter read time"
              fullWidth
              size="small"
              name="readTime"
              type="number"
              value={formValues.readTime}
              onChange={handleChange}
            />
          </Box>

          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Add Image</Typography>
            <Box sx={boxStyles}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={fileInputStyles}
                InputProps={{
                  endAdornment: (
                    <Box component="label" sx={fileButtonStyles}>
                      <Typography variant="body2">Choose File</Typography>
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Box>
                  ),
                }}
              />
            </Box>
            {imagePreview && (
              <Box sx={{ marginTop: "1rem", textAlign: "start" }}>
                <img src={imagePreview} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100px", marginBottom: "0.5rem" }} />
                <Typography variant="body2">{imageName}</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ marginTop: "1rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={4}>
            <Button variant="outlined" color="primary" fullWidth sx={{ fontWeight: 400, borderRadius: '0px' }}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 400, borderRadius: '0px' }}>
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Add Blog'}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddKhatriBlogs;
