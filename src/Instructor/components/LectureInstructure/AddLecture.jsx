import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Backdrop,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  createLectureContent,
  getInstructorClass,
} from "../../../store/actions/courseActions";

const inputStyles = {
  marginBottom: "0.5rem",
  marginTop: "1.1rem",
};

const labelStyles = {
  fontSize: "1rem",
  fontWeight: "400",
};

const cardStyles = {
  padding: "1rem",
};

const AddLecture = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    classContent: [], // Initialize as an empty array to store the file
    classId: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");

  const [fileType, setFileType] = useState(""); // Added state to keep track of file type
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getInstructorClass());
        const data = res.data.data;
        setClassData(data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if changing the student selection to combine first and last name
    if (name === "classId") {
      const selectedStudent = classData.find(
        (student) => student.studentId._id === value
      );
      if (selectedStudent) {
        const fullName = `${selectedStudent.studentId.firstName} ${selectedStudent.studentId.lastName}`;
        setFormValues((prev) => ({ ...prev, name: fullName, classId: value }));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      setFormValues((prev) => ({
        ...prev,
        classContent: [file], // Store the file in an array
      }));
      setFileName(file.name);
      setFileType(fileType);

      if (fileType.includes("video")) {
        setFilePreview(URL.createObjectURL(file));
      } else if (fileType.includes("pdf")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("classContent", formValues.classContent[0]); // Append the file directly from the array
    formData.append("classId", formValues.classId);
    formData.append("name", formValues.name); // This now contains the full name (first + last)

    dispatch(createLectureContent(formData))
      .then((res) => {
        setFormValues({ classContent: [], classId: "", name: "" }); // Reset to an empty array
        setFilePreview(null);
        setFileName("");
        setName("");

        setFileType("");
        setIsLoading(false);
        setIsUploading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsUploading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Card sx={cardStyles}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
          Add Lecture
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={inputStyles}>
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              Select Student
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="dropdown-label"
                id="title"
                name="classId"
                size="small"
                value={formValues.classId}
                onChange={handleChange}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  [
                    ...new Map(
                      classData.map((student) => [
                        student.studentId._id,
                        student,
                      ])
                    ).values(),
                  ].map((student) => (
                    <MenuItem
                      key={student.studentId._id}
                      value={student.studentId._id}
                    >
                      {student.studentId.firstName} {student.studentId.lastName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>

          <Box sx={inputStyles}>
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              Select Class
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="dropdown-label"
                id="title"
                name="classId"
                size="small"
                value={formValues.classId}
                onChange={handleChange}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  classData.map((classItem) => (
                    <MenuItem key={classItem._id} value={classItem._id}>
                      {classItem.title}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>

          <Box sx={inputStyles}>
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              Upload File
            </Typography>

            <Box>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="file"
                inputProps={{ accept: "video/*,application/pdf" }} // Accept both video and pdf
                onChange={handleFileChange}
              />
            </Box>
            {filePreview && (
              <Box sx={{ marginTop: "1rem", textAlign: "start" }}>
                {fileType.includes("video") && (
                  <video
                    src={filePreview}
                    controls
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                {fileType.includes("pdf") && (
                  <iframe
                    src={filePreview}
                    style={{
                      width: "100%",
                      height: "400px",
                      border: "none",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                <Typography variant="body2">{fileName}</Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            gap={4}
          >
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ fontWeight: 400, borderRadius: "0px" }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ fontWeight: 400, borderRadius: "0px" }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Add"
              )}
            </Button>
          </Box>
        </form>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
<Box sx={{textAlign:'center'}}>
<CircularProgress
          sx={{ fontSize: "6rem", color: theme.palette.primary.main }}
        />
        <br/>
        <Typography sx={{color:'white', fontSize:'1.2rem'}}>Please Wait, Lecture is uploading.</Typography>
        <Typography sx={{color:'white',  fontSize:'1.2rem'}}>Uploading time depends on your Internet speed.</Typography>

</Box>
      </Backdrop>
    </Box>
  );
};

export default AddLecture;
