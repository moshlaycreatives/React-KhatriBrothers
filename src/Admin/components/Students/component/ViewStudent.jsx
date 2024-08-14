import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  assignInstructor,
  getInstructors,
  getSingleStudent,
} from "../../../../store/actions/courseActions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ViewStudent = ({ student_Id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
const [instructorId, setInstructorId] = useState('')
const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getSingleStudent(student_Id));

        setStudentData(res.data.data.studentId);
        setCourseData(res.data.data.courseId);
        setInstructorId(res.data.data.instructorId)
setLoading(false)
      } catch (err) {
        console.error("Failed to fetch student:", err);
      setLoading(false)
      } finally {

        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };

    fetchData();
  }, [dispatch, student_Id]);

  const [teachers, setTeachers] = useState([]); // State to store the list of teachers
  const [selectedTeacher, setSelectedTeacher] = useState(""); // State to store selected teacher

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await dispatch(getInstructors());
        setTeachers(res.data.data);
        console.log(res.data.data, 'haha data')

      } catch (err) {
        console.error("Failed to fetch beginner courses:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAssign = () => {
    dispatch(assignInstructor(selectedTeacher, student_Id))
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err?.response?.data?.message, {
          variant: "error",
        });

        console.log(err);
      });
  };

  const handleMenuClick = (events) => {
    setAnchorEl(events.currentTarget);
  };

  const instructor1 = teachers.filter(
    (teacher) => teacher._id === instructorId
  );

const data = instructor1.map((teacher) => teacher.firstName)
console.log(data, 'id')

console.log(instructor1.firstName, 'name')

  const instructorExists = teachers.some(
    (teacher) => teacher._id === instructorId
  );

  console.log(instructorExists,'existssss');

  if(loading){
    return(
      <>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
          <CircularProgress/>
        </Box>
      </>
    )
  }

  return (
    <>
      <Box>
        <Card
          sx={{
            padding: "1rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Student Name
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.firstName}
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Course Name
            </Typography>

            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {courseData.title}
              <br />
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Age
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.learnerType}
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Gender
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.gender}
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Course Fee
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {courseData.price}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Email
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.email}
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Phone
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.phone}
              <br />
            </Typography>

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Course Type
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {courseData.courseType}
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Class Type
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              Group
            </Typography>
            <br />

            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Country
            </Typography>
            <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
              {studentData.country}
            </Typography>
          </Box>
          {/* <Button>click</Button> */}
          <div></div>
        </Card>




        {instructorExists ? <Typography>Assigned Teacher : {data}</Typography>
:null
}

        <Box sx={{ width: "30%" }}>
          {/* <TextField placeholder='Please select Teacher' fullWidth size='small'/> */}
          <FormControl fullWidth size="small">
            <InputLabel>Select Teacher</InputLabel>
            <Select
              value={selectedTeacher}
              onChange={handleChange}
              label="Select Teacher"
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />


{instructorExists ? <Button fullWidth variant="contained" onClick={() => handleAssign()}>
            Re-Assign
          </Button>
:<Button fullWidth variant="contained" onClick={() => handleAssign()}>
            Assign
          </Button>
}


        </Box>
      </Box>
    </>
  );
};

export default ViewStudent;
