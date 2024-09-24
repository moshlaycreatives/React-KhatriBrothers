
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GhazalCourseCard = () => {
  // const filteredCourses = useSelector((state) =>
  //   state?.courses?.allCourses?.filter(course => course.courseType === 'ghazal')
  // );




  const allCourse = useSelector((state) => state?.courses?.allCourses);

  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const courseAdded = useSelector(
    (state) => state?.courses?.allCourses?.addedById?._id
  );



  const filteredCourses = allCourse.filter((course) => {
    if (!auth) {
      return course.addedBy === "admin" && course.courseType === "ghazal";
    }

    if (
      course.addedBy === "user" &&
      course.addedById &&
      course.addedById._id === userId &&
      (course.indianPrice ||
        course.ukPrice ||
        course.usaPrice ||
        course.uaePrice ||
        course.australiaPrice ||
        course.kenyaPrice ||
        course.canadaPrice ||
        course.ugandaPrice)
    ) {
      return course.courseType === "ghazal";
    }

    if (course.addedBy === "admin") {
      return course.courseType === "ghazal";
    }

    return false;
  });



  console.log(filteredCourses, 'filteredCourses');


  const sortedCourses = filteredCourses.sort((a, b) => {
    if (a.addedBy === "admin" && b.addedBy !== "admin") {
      return -1;
    }
    if (a.addedBy !== "admin" && b.addedBy === "admin") {
      return 1;
    }
    return 0;
  });



  const theme = useTheme();
  const navigate = useNavigate();
  const base = "https://khatribrothersacademy.com:4545";

  const handleCardClick = (id) => {
    navigate(`/course-details/${id}`,  {
      state: { courseType: "ghazal" },
    });
  };


  return (
    <Box sx={{ padding: "3rem 10%" }}>
      <Grid container spacing={5}>
        {sortedCourses.map((course, index) => (
          <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
            <Box onClick={() => handleCardClick(course._id)} sx={{ cursor: 'pointer' }}>
              <img  src={`${base}${course?.image?.replace(/ /g, "%20")}`} alt="course image" width={"80%"} height={'250vh'} />
            </Box>
            <Box>
              <Typography sx={{ color: "grey" }}>{course.title}</Typography>
              <br />
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  borderRadius: '0px',
                  fontSize: '1.1rem'
                }}
                onClick={() => handleCardClick(course._id)}
              >
                Start Learning &rarr;
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GhazalCourseCard;
