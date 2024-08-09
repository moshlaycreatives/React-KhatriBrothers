


import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  TableContainer
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { createClass, getAllCourse } from "../../../../store/actions/courseActions";

const ClassesMain = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const initialValues = {
    title: '',
    courseId: '7777777',
    video: null,
    classType: '',
    group: '',
    student: '',
    date: '',
    startTime: '',
    endTime: ''
  };

  const [isAdding, setIsAdding] = useState(false);
  const [testimonialData, setTestimonialData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getAllCourse());
        setCoursesData(res.data.data);
        console.log('courses data:', res.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleClassTypeChange = (event) => {
    const selectedType = event.target.value;
    setFormValues((formValues) => ({ ...formValues, classType: selectedType }));
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = async () => {
    const formData = {
      courseType: formValues.classType,
      group: formValues.classType === 'group' ? formValues.group : undefined,
      studentId: formValues.classType === 'one2one' ? formValues.student : undefined,
      courseId: formValues.courseId,
      zoomLink: formValues.video,
      date: formValues.date,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      courseId: formValues.courseId,
      zoomLink:'https://example.com'
    };

    // Remove undefined properties
    Object.keys(formData).forEach(key => formData[key] === undefined && delete formData[key]);

    try {
      await dispatch(createClass(formData));
      enqueueSnackbar('Class created successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to create class.', { variant: 'error' });
      console.error('Error creating class:', error);
    }
  };

  return (
    <Box>
      {!isAdding ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "550",
                fontSize: isMobile ? '1.5rem' : "2rem",
              }}
            >
              Create Class
            </Typography>
          </Box>

          <br />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  padding: "1rem 1rem",
                  boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '1.1rem' }}>
                  Add Details
                </Typography>
                <br /><br />

                <FormControl fullWidth>
  <InputLabel id="course-select-label">Select Course</InputLabel>
  <Select
    labelId="course-select-label"
    id="course-select"
    name="courseId"
    value={formValues.courseId}
    onChange={handleFormData}
  >
    {coursesData.map((course) => (
      <MenuItem key={course._id} value={course._id}>
        {course.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>





                <Box>
                  <Typography>Class Type</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="class-type-select-label">Please select class type</InputLabel>
                    <Select
                      labelId="class-type-select-label"
                      id="class-type-select"
                      name="classType"
                      value={formValues.classType}
                      label="Please select class type"
                      onChange={handleClassTypeChange}
                    >
                      <MenuItem value={'group'}>Group</MenuItem>
                      <MenuItem value={'one2one'}>One to One</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <br />

                {formValues.classType === 'group' && (
                  <Box>
                    <Typography>Select Group</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="group-select-label">Please select group</InputLabel>
                      <Select
                        labelId="group-select-label"
                        id="group-select"
                        name="group"
                        value={formValues.group}
                        label="Please select group"
                        onChange={handleFormData}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}

                {formValues.classType === 'one2one' && (
                  <Box>
                    <Typography>Select Student</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="student-select-label">Please select student</InputLabel>
                      <Select
                        labelId="student-select-label"
                        id="student-select"
                        name="student"
                        value={formValues.student}
                        label="Please select student"
                        onChange={handleFormData}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <br />

                <Box>
                  <Typography variant="subtitle1">Date</Typography>
                  <TextField
                    type="date"
                    variant="outlined"
                    fullWidth
                    name="date"
                    value={formValues.date}
                    onChange={handleFormData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <br />

                <Box>
                  <Typography variant="subtitle1">Start Time</Typography>
                  <TextField
                    type="time"
                    variant="outlined"
                    fullWidth
                    name="startTime"
                    value={formValues.startTime}
                    onChange={handleFormData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <br />

                <Box>
                  <Typography variant="subtitle1">End Time</Typography>
                  <TextField
                    type="time"
                    variant="outlined"
                    fullWidth
                    name="endTime"
                    value={formValues.endTime}
                    onChange={handleFormData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <br />

                <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                  <Box sx={{ width: '50%' }}>
                    <Button variant="outlined" onClick={handleCancel} sx={{ width: '100%' }}>Cancel</Button>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%' }}>Create</Button>
                  </Box>
                </Box>
              </TableContainer>
            </>
          )}

        </>
      ) : (
        <Card
          sx={{
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            position: 'relative',
          }}
        >
          <CloseIcon
            onClick={handleCancel}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
          />

          <Box sx={{ padding: "1.2rem" }}>
            <Typography sx={{ fontWeight: '600' }}>Add Details</Typography>
            <br />

            <form>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Title
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Enter your title"
                sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
                name="title"
                value={formValues.title}
                onChange={handleFormData}
              />

              <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                <Button variant="outlined" sx={{ width: '100%' }} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" sx={{ width: '100%' }} onClick={handleSubmit}>
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ClassesMain;
