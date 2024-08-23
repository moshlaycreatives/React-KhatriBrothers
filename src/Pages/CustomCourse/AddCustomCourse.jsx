import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, Typography, Button, Checkbox, FormControlLabel, CircularProgress, Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import { studentAddCourse } from "../../store/actions/courseActions";

const cardStyles = {
  padding: "1rem",
};

const checkboxContainerStyles = {
  display: 'block',
  gap: "1rem",
  marginTop: "1rem",
};

const AddCustomCourse = ({ courseType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Define different course lists based on courseType
  const coursesByType = {
    bhajjan: [
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
      "Yeh raatein yeh mausam"
    ],
    oldSongs: [] // No longer used
  };

  // Get the courses to display based on the courseType prop
  const courses = coursesByType[courseType] || [];

  // Separate old songs when courseType is bollywood
  const bollywoodCourses = courseType === 'bollywood'
    ? courses.filter(course => ![
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
        "Yeh raatein yeh mausam"
      ].includes(course))
    : courses;

  const oldSongs = courseType === 'bollywood'
    ? courses.filter(course => [
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
        "Yeh raatein yeh mausam"
      ].includes(course))
    : [];

  const handleCheckboxChange = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      customList: selectedCourses,
      courseType: courseType,
    };

    dispatch(studentAddCourse(formData))
      .then((res) => {
        setSelectedCourses([]);
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Card sx={cardStyles}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Select {courseType.charAt(0).toUpperCase() + courseType.slice(1)} Courses</Typography>
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
                sx={{ display: 'block', marginBottom: '0.5rem' }}
              />
            ))}
            {courseType === 'bollywood' && oldSongs.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ fontSize:'1.5rem',fontWeight:600, mt: 2, mb: 1 }}>
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
                    sx={{ display: 'block', marginBottom: '0.5rem' }}
                  />
                ))}
              </>
            )}
          </Box>
          <Box sx={{ marginTop: "1rem", display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 400 }}>
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddCustomCourse;