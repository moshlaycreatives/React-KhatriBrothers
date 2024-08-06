import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon
import { addStudentsTestimonial, getBeginnerCourse } from "../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Testimonials = () => {
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const initialValues ={
    title:'',
    courseId:'',
    video:null
  }

  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAdding, setIsAdding] = useState(false); // State to toggle between form and table view
  const [testimonialData ,setTestimonialData] = useState('');
  const [currentCourseId ,setCurrentCourseId] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  // const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];
 
  const handleFromData =(e)=>{
    const {name , value} = e.target;
    setFormValues((formValues)=>({...formValues, [name]: value})) 
    console.log('kkkkkkkk' ,formValues);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getBeginnerCourse());
        setTestimonialData(res.data.data);
        console.log('testtimonial  data:', res. data);
      } catch (error) {
        console.error('Failed to fetch student data', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    // setSelectedCourse(event.target.value);
    const selectedId = event.target.value;
    setSelectedCourse(selectedId);
    setFormValues((formValues)=>({...formValues, courseId:selectedId}));
  };

  const handleVideoChange =(e)=>{
    const file = e.target.files[0];
    setFormValues((formValues)=>({...formValues , video : file}))
  }

  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSubmit = ()=>{

    const formData = new FormData();
  formData.append('stuName', formValues.title);
  formData.append('courseId', formValues.courseId)
  if (formValues.video) {
    formData.append('vidoe', formValues.video)
  }

  dispatch(addStudentsTestimonial(formData)).then((res)=>{
    enqueueSnackbar(res.data.message,  {variant:'success'})
  }).catch((error)=>{
    enqueueSnackbar(error.data.message, {varient:'error'})
  })
  }

  

  // const handleCouseClick  = (e , id)=>{
  //   setCurrentCourseId(id);

  //   const {name } = e.target;
  //   setFormValues((formValues)=>({...formValues, [name]: id}))
  //   console.log('kkkkkkkk' ,formValues);
    
  // }
  // console.log('course test id', currentCourseId);




  const rows = [
    {
      coursename: "Hindustani vocal advanced A series",
      teacher: "Faraz",
      image: "/ggg.png",
    },
  ];

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
              Testimonial
            </Typography>

            <Box>
              <Button
                variant="outlined"
                onClick={handleAddTestimonial}
                sx={{
                  textTransform: "none",
                  borderRadius: "0px",
                  fontWeight: 400,
                  fontSize: isMobile ? '0.8rem' : "1.2rem",
                }}
              >
                + Add Testimonial
              </Button>
            </Box>
          </Box>

          <br />

          <TableContainer
            component={Paper}
            sx={{
              padding: "1rem 1rem",
              boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Course name</TableCell>
                  <TableCell>Video</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      paddingBottom: "1rem",
                      alignItems: "start",
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                      {row.coursename}
                    </TableCell>
                    <TableCell sx={{ color: "grey" }}>{row.teacher}</TableCell>
                    <TableCell sx={{ color: "grey" }}>
                      <Box>
                        <img src={row.image} alt="" width={"50px"} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Card
          sx={{
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            position: 'relative', // Position relative for the close button
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
                onChange={handleFromData}
              />

              <br />

              
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Course Name
              </Typography>

              <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem" }}>
                <Select
                  value={selectedCourse}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  {testimonialData.map((course, index) => (
                    <MenuItem key={index}
                     value={course.title}
                    onClick={(events)=>handleCouseClick(events, course._id)}
                    name="courseId"
                    >
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Add Video
              </Typography>

              <Box sx={{ width: '100%', border: '1px solid #7c7c7c', borderRadius: '3px', color: 'grey', padding: '0.5rem' }}>
                <input type="file"  onChange={handleVideoChange}/>
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
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Testimonials;
