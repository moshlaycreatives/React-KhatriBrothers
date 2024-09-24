import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Hindustani Vocal Courses",
    path: "/hindi-vocal-course",
    imageSrc: "/advancecourse.png",
  },
  {
    id: 2,
    title: "Tabla Courses",
    path: "/tabla-course",
    imageSrc: "/TablaCourseLogo.JPG",
  },
  {
    id: 3,
    title: "Bhajan Courses",
    path: "/bhajan-course",
    imageSrc: "/BhajanCourseLogo.JPG",
  },
  {
    id: 4,
    title: "Ghazal Courses",
    path: "/ghazal-course",
    imageSrc: "/GhazalCourseLogo.JPG",
  },

  {
    id: 5,
    title: "Guitar Courses",
    path: "/guitar-courses",
    imageSrc: "/GuitarCourse.jpg",
  },{
    id: 6,
    title: "Keyboard Courses",
    path: "/keyboard-courses",
    imageSrc: "/KeyboardCourse.jpg",
  },
  {
    id: 7,
    title: "Bollywood Courses",
    path: "/bollywood-course",
    imageSrc: "/bollywoodcourse.jpeg",
  },
];

const CategoryBasedCoursesHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", padding:'0rem 10%' }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Courses We Offer
        </Typography>
        <Typography>
        Discover your musical passion at our academy! We offer a wide range of courses to suit every taste and skill level.
        </Typography>
      </Box>

      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={5}>
          {courses.map((course) => (
            <Grid key={course.id} item lg={4} md={4} sm={12} xs={12}>
              <Box
                onClick={() => handleCardClick(course.path)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  src={course.imageSrc}
                  alt={course.title}
                  width="100%"
                  height="300vh"
                />
              </Box>
              <Box>
                <Typography sx={{ color: "grey", mt:1, fontSize:'1.2rem' }}>{course.title}</Typography>
                <br />
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.primary.main,
                    textTransform: "none",
                    borderRadius: "0px",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => handleCardClick(course.path)}
                >
                  View More &rarr;
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CategoryBasedCoursesHome;
