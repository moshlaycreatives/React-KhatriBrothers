import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, TextField, Typography, Button, Chip, useTheme, IconButton, CircularProgress } from "@mui/material";
import { addAdvance } from "../../../../store/actions/courseActions"; // Import the correct action
import { Cancel as CancelIcon } from '@mui/icons-material';
import { useSnackbar } from "notistack";

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

const chipDeleteIconStyles = {
  backgroundColor: 'transparent',
  borderRadius: "50%",
  padding: "1px",
  color: 'white'
};

const AddAdvanceCourse = () => {
  const initialValues = {
    courseName: '',
    courseOverview: '',
    prerequisites: '',
    topicsCovered: '',
    price: '',
    courseDuration: '',
    lectureDuration: '',
    courseImage: null,
  };
  const {enqueueSnackbar} = useSnackbar()
  const theme = useTheme();
  const [formValues, setFormValues] = useState(initialValues);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prev) => ({ ...prev, courseImage: file }));
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
  };

  const handleTopicChange = (e) => {
    setFormValues((prev) => ({ ...prev, topicsCovered: e.target.value }));
  };

  const handleTopicAdd = () => {
    if (formValues.topicsCovered && !topics.includes(formValues.topicsCovered)) {
      setTopics([...topics, formValues.topicsCovered]);
      setFormValues((prev) => ({ ...prev, topicsCovered: '' }));
    }
  };

  const handleTopicDelete = (topicToDelete) => () => {
    setTopics((prev) => prev.filter((topic) => topic !== topicToDelete));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', formValues.courseName);
    formData.append('overview', formValues.courseOverview);
    formData.append('prerequisites', formValues.prerequisites);
    formData.append('topics', topics.join(','));
    formData.append('courseDuration', formValues.courseDuration);
    formData.append('lectureDuration', formValues.lectureDuration);
    formData.append('price', formValues.price);
    formData.append('courseType', 'advanced');
    if (formValues.courseImage) {
      formData.append('image', formValues.courseImage);
    }

    dispatch(addAdvance(formData)).then((res) => {
      setFormValues(initialValues);
      setTopics([]);
      setImagePreview(null);
      setImageName("");
      setIsLoading(false);
      enqueueSnackbar(res.data.message, {variant :'success'})
    }).catch((err)=>{
      setIsLoading(false);
      enqueueSnackbar(err.response.data.message, {variant :'error'})
    });
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Card sx={cardStyles}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
          Add Details
        </Typography>

        <form onSubmit={handleSubmit}>
          {[
            { label: "Course Name", name: "courseName", type: 'text' },
            { label: "Course Overview", name: "courseOverview", type: 'text' },
            { label: "Prerequisites", name: "prerequisites", type: 'text' },
            { label: "Price", name: "price", type: 'number' },
            { label: "Course Duration", name: "courseDuration", type: 'number' },
            { label: "Lecture Duration", name: "lectureDuration", type: 'number' },
          ].map((field, index) => (
            <Box key={index} sx={inputStyles}>
              <Typography sx={labelStyles}>{field.label}</Typography>
              <TextField
                placeholder={`Enter ${field.label.toLowerCase()}`}
                fullWidth
                size="small"
                name={field.name}
                type={field.type}
                value={formValues[field.name]}
                onChange={handleChange}
              />
            </Box>
          ))}

          <Box sx={inputStyles}>
            <Typography sx={labelStyles}>Topics Covered <span style={{ fontSize: '0.7rem', color: theme.palette.primary.main }}>(Press enter to add new topic)</span></Typography>
            <Box sx={boxStyles}>
              <TextField
                placeholder="Enter topics"
                fullWidth
                size="small"
                name="topicsCovered"
                type="text"
                value={formValues.topicsCovered}
                onChange={handleTopicChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTopicAdd();
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5rem', color: 'white' }}>
              {topics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  onDelete={handleTopicDelete(topic)}
                  deleteIcon={
                    <IconButton size="small" sx={chipDeleteIconStyles}>
                      <CancelIcon sx={{ color: 'white' }} />
                    </IconButton>
                  }
                  sx={{ margin: '0.25rem', backgroundColor: theme.palette.primary.main, color: 'white' }}
                />
              ))}
            </Box>
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
                        name="courseImage"
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
            <Button variant="outlined" color="primary" fullWidth sx={{ fontWeight: 400, borderRadius: '0px' }} >
              Cancel
            </Button>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 400, borderRadius: '0px' }}>
              {isLoading ? <CircularProgress size={24} sx={{color:'white'}} /> : 'Add'}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddAdvanceCourse;
