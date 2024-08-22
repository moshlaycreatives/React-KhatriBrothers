import React, { useState } from "react";
import { Box, Button, Card, CircularProgress, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { addStudentsTestimonial } from "../../../store/actions/courseActions";

const AddStudentTestimonial = ({ testimonialData, handleCancel }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    courseId: "",
    video: null,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCourse(selectedId);
    setFormValues((formValues) => ({ ...formValues, courseId: selectedId }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormValues((formValues) => ({ ...formValues, video: file }));
  };

  const validateForm = () => {
    const { title, courseId, video } = formValues;
    if (!title || !courseId || !video) {
      enqueueSnackbar("Please fill all fields", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setLoading(true); // Set loading to true
    const formData = new FormData();
    formData.append("stuName", formValues.title);
    formData.append("courseId", formValues.courseId);
    if (formValues.video) {
      formData.append("video", formValues.video);
    }

    dispatch(addStudentsTestimonial(formData))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        setFormValues(initialValues);
        handleCancel(); // Hide the form after submission
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
      });
  };

  return (
    <Card sx={{ boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)", position: "relative" }}>
      <CloseIcon
        onClick={handleCancel}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "pointer",
        }}
      />

      <Box sx={{ padding: "1.2rem" }}>
        <Typography sx={{ fontWeight: "600" }}>Add Details</Typography>
        <br />

        <form>
          <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>Student Name</Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Enter your title"
            sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
            name="title"
            value={formValues.title}
            onChange={handleFormData}
          />

          <br />

          <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>Course Name</Typography>

          <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem" }}>
            <Select value={selectedCourse} onChange={handleChange} displayEmpty>
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {testimonialData.map((course, index) => (
                <MenuItem key={index} value={course.courseId._id} name="courseId">
                  {course.courseId.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />

          <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>Add Video</Typography>

          <Box
            sx={{
              width: "100%",
              border: "1px solid #7c7c7c",
              borderRadius: "3px",
              color: "grey",
              padding: "0.5rem",
            }}
          >
            <input type="file" accept="video/*" onChange={handleVideoChange} />
          </Box>

          <br />
          <br />

          <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              fullWidth
              sx={{
                borderRadius: "0px",
                padding: "0.7rem 0rem",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "0px",
                textTransform: "none",
                fontWeight: "400",
                padding: "0.7rem 0rem",
              }}
              onClick={handleSubmit}
              disabled={loading} // Disable the button while loading
            >
              {loading ? <CircularProgress size={24} /> : "Add"} {/* Show loader or "Add" */}
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export default AddStudentTestimonial;
