import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip,
  Snackbar,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  createGroup,
  getAssignedStudents,
} from "../../../../store/actions/courseActions";

const CreateGroup = ({ onBackClick }) => {

  console.log(onBackClick, 'back click')
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const InstructorId = useSelector((state) => state?.auth?.user?._id);

  const initialValues = {
    title: "",
    course: "",
  };

  const courses = [
    { id: 'course1', name: 'Hindustani Vocal Beginner' },
    { id: 'course2', name: 'Hindustani Vocal Intermediate' },
    { id: 'course3', name: 'Hindustani Vocal Advance' },
    { id: 'course4', name: 'Ghazal' },
    { id: 'course5', name: 'Bhajan' },
    { id: 'course6', name: 'Tabla' },
    { id: 'course7', name: 'Bollywood' },
  ];

  const chipDeleteIconStyles = {
    backgroundColor: "transparent",
    borderRadius: "50%",
    padding: "1px",
    color: "white",
  };
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getAssignedStudents(InstructorId));
        setTestimonialData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, InstructorId]);

  const handleFromData = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedStudent = testimonialData.find(
      (student) => student.studentId._id === selectedId
    );

    if (selectedStudents.length >= 3) {
      enqueueSnackbar("You can only select up to 3 students.", {
        variant: "warning",
      });
      return;
    }

    if (
      selectedStudent &&
      !selectedStudents.some((student) => student.studentId._id === selectedId)
    ) {
      setSelectedStudents((prevStudents) => [...prevStudents, selectedStudent]);
      setSelectedCourse(""); // Clear the dropdown after selection
    }
  };

  const handleDelete = (studentId) => {
    setSelectedStudents((prevStudents) =>
      prevStudents.filter((student) => student.studentId._id !== studentId)
    );
  };

  const studentsId = selectedStudents.map((student) => student.studentId._id);
  const dataok = studentsId;

  const handleSubmit = () => {
    const data = {
      name: formValues.title,
      students: dataok,
      course: selectedCourseName,
    };

    dispatch(createGroup(data))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        setFormValues(initialValues);
        setSelectedCourseName('');
        setSelectedStudents([]);
        onBackClick(); // Trigger back click after successful submission
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message || 'Something went wrong', { variant: "error" });
      });
  };

  return (
    <Box>
      <Button onClick={onBackClick} variant="outlined">
        Back to Groups
      </Button>

      <Box>
        <Typography
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontSize: "2rem",
            fontWeight: 550,
          }}
        >
          Create Group
        </Typography>
      </Box>
      <br />
      <br />
      <Card
        sx={{
          boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
          position: "relative", // Position relative for the close button
        }}
      >
        <CloseIcon
          onClick={onBackClick}
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
            <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              Group
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter group name"
              sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
              name="title"
              value={formValues.title}
              onChange={handleFromData}
            />
            <br />

            <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              Select Course
            </Typography>
            <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem" }}>
              <Select
                value={selectedCourseName}
                onChange={(e) => setSelectedCourseName(e.target.value)}
              >
                <MenuItem value="" disabled>Select a course</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />
            <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              Select Student
            </Typography>
            <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem" }}>
              <Select
                value={selectedCourse}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "") {
                    return (
                      <em style={{ color: "#bcbcbc" }}>
                        Please select students
                      </em>
                    );
                  }
                  return selected;
                }}
              >
                <MenuItem value="" disabled></MenuItem>
                {testimonialData.map((student, index) => (
                  <MenuItem
                    key={index}
                    value={student.studentId._id}
                    name="studentId"
                  >
                    {student.studentId.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            {selectedStudents.length > 0 && (
              <Box sx={{ marginBottom: "0.8rem" }}>
                {selectedStudents.map((student) => (
                  <Chip
                    key={student.studentId._id}
                    label={student.studentId.firstName}
                    onDelete={() => handleDelete(student.studentId._id)}
                    deleteIcon={
                      <IconButton size="small" sx={chipDeleteIconStyles}>
                        <DeleteIcon
                          sx={{ fontSize: "1.1rem", color: "white" }}
                        />
                      </IconButton>
                    }
                    sx={{
                      marginRight: 1,
                      marginBottom: 1,
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    }}
                  />
                ))}
              </Box>
            )}
            <br />
            <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
              <Button
                variant="outlined"
                onClick={() => setIsAdding(false)}
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
                onClick={handleSubmit}
                sx={{
                  borderRadius: "0px",
                  padding: "0.7rem 0rem",
                  textTransform: "none",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Your group was created successfully!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default CreateGroup;
