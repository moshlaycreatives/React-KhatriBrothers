

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Divider,
  Chip,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { studentAddCourse } from "../../store/actions/courseActions";
import CancelIcon from "@mui/icons-material/Cancel";

const cardStyles = {
  padding: "1rem",
};

const checkboxContainerStyles = {
  display: "block",
  gap: "1rem",
  marginTop: "1rem",
};

const chipDeleteIconStyles = {
  color: 'white',
};

const AddCustomCourse = ({ courseType }) => {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const coursesByType = {
    bhajjan: [
      "Lord Swaminarayan bhajan - Swaminarayan naam mane vahlu lage",
      "Lord Swaminarayan bhajan - Tari murti lage che mune pyari",
      "Lord Swaminarayan bhajan - Vala ramjam karta kaan",
      "Shiv Ji Bhajan - Adiyogi",
      "Other Bhajan - Bhagwan Hai Kaha Re Tu",
      "Shree Krishna Bhajan - Ek Radha Ek Meera",
      "Other Bhajan - Ek Tu Hi Bharosa",
      "Hanuman bhajan - Hey Dukh Bhanjan",
      "Shree Ram - Shri Ram Chandra Krupalu Bhajman",
      "Other Bhajan - Itni Shakti Hame De Na Data",
      "Shree Krishna Bhajan - Chhoti Chhoti gaiya",
      "Shree Krishna Bhajan - Kanha Aan Padi Mai Tere Dwar",
      "Other Bhajan - Man Tadpat Hari Darshan Ko Aaj",
      "Shree Krishna Bhajan - Mere Toh Girdhar Gopal",
      "Other Bhajan - Mohe Rang Do Laal",
      "Shree Krishna Bhajan - O Paalan Haare",
      "Other Bhajan - Sukh ke Sab Saathi",
      "Shree Krishna Bhajan - Tara Vina Shyam Mane Ekaldu Lage",
      "Shree Ram - Thumak Chalat Ram Chandra",
      "Other Bhajan - Tum Hi Ho Mata",
    ],
    bollywood: [
      "Tum Hi Aana - Jubin Nautiya",
      "Tera yaar hu mai - Arijit Singh,Neha Kakkar",
      "Jab Tak - Armaan malik",
      "Kaun Tujhe - Palak Muchhal",
      "Khairiyat - Arijit Singh",
      "Dekhte Dekhte - Atif Aslam",
      "Humnava Mere - Jubin Nautiyal",
      "0 Saathi - Atif Aslam",
      "Pal Pal Dil Ke Paas - Arijit Singh & Parampara Thakur",
      "Dil Mein Ho Tum - Armaan Malik",
      "Jitni Dafa - Yasser Desai & Jeet Ganguli",
      "Tera Hua - Atif Aslam",
      "Lo Safar - Baaghi 2",
      "Pachtaoge - Arijit Singh",
      "Lut Gaye - Female Version",
      "Filhall - Akshay Kumar",
      "Zara Zara - Bombay Jayashrec",
      "Kinna Sona - Marjaavaan",
      "Soch Na Sake - Amaal Mallik, Arijit Singh & Tulsi Kumar",
      "Thodi Jagah - Arijit Singh",
      // Old Songs
      "Aap ki aankhon me kuch",
      "Mere mehboob qayamat hogi",
      "Lag ja gale",
      "Kya hua tera vada",
      "Aanewala pal jaane vala hai",
      "Gaata rahe mera dill",
      "Kahin door jab din dhal jaye",
      "Do lafzo ki hai dil ki kahani",
      "Aapki nazro ne samjha",
      "Ehsaan tera hoga mujh par",
      "Tu is tarah se meri zindagi",
      "Maine tere liye hi saat rang",
      "Tere bina zindagi se",
      "Ek ajnabi hasina se",
      "Dekha ek khwaab",
      "Tum ko dekha",
      "Bade acche lagte hain",
      "Gaata rahe mera dil",
      "Hai apna dil to awara",
      "Yeh raatein yeh mausam",
    ],

    ghazal: [
      "Lord Swaminarayan bhajan - Swaminarayan naam mane vahlu lage",
      "Lord Swaminarayan bhajan - Tari murti lage che mune pyari",

    ],

    oldSongs: [],
  };

  const courses = coursesByType[courseType] || [];

  const bollywoodCourses =
    courseType === "bollywood"
      ? courses.filter(
          (course) =>
            ![
              // old songs to filter out
            ].includes(course)
        )
      : courses;

  const oldSongs =
    courseType === "bollywood"
      ? courses.filter((course) =>
          [
            // old songs to include
          ].includes(course)
        )
      : [];

  const handleCheckboxChange = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleTopicDelete = (topicToDelete) => () => {
    setTopics((prev) => prev.filter((topic) => topic !== topicToDelete));
  };

  const handleAddTopic = () => {
    if (newTopic && !topics.includes(newTopic)) {
      setTopics((prev) => [...prev, newTopic]);
      setNewTopic("");
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setIsLoading(true);

    const combinedList = [...selectedCourses, ...topics];

    const formData = {
      customList: combinedList,
      courseType: courseType,
    };

    dispatch(studentAddCourse(formData))
      .then((res) => {
        setSelectedCourses([]);
        setTopics([]);
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setOpenModal(true);
    
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key press
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Card sx={cardStyles}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            {bollywoodCourses.map((course, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedCourses.includes(course)}
                    onChange={() => handleCheckboxChange(course)}
                    color="primary"
                  />
                }
                label={course}
                sx={{ display: "block", marginBottom: "0.5rem" }}
              />
            ))}
            {courseType === "bollywood" && oldSongs.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "1.5rem", fontWeight: 600, mt: 2, mb: 1 }}
                >
                  Old Songs
                </Typography>
                {oldSongs.map((course, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCheckboxChange(course)}
                        color="primary"
                      />
                    }
                    label={course}
                    sx={{ display: "block", marginBottom: "0.5rem" }}
                  />
                ))}
              </>
            )}
          </Box>

          {/* Topics Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 1 }}>
              Enter your choice
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
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
                  sx={{ margin: '0.25rem', backgroundColor: 'primary.main', color: 'white' }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your choice"
                style={{ flex: 1, padding: '0.5rem', marginRight: '0.5rem' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTopic}
              >
                Add
              </Button>
            </Box>
            <span style={{ fontSize: '0.7rem', color: theme.palette.primary.main }}>(Click add button to add a multiple topics)</span>
          </Box>

          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 400 }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Card>


      <Dialog open={openModal} onClose={handleModalClose}>
        {/* <DialogTitle>Success</DialogTitle> */}
        <DialogContent>

        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src='/loginlogo.svg' width='30%'/>
        </Box>
        <br/>
        <br/>
        <br/>
          <Typography sx={{textAlign:'center', fontSize:'1.5rem', }}>Your request is submitted, You will get notify by email from admin when course approved</Typography>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleModalClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCustomCourse;
