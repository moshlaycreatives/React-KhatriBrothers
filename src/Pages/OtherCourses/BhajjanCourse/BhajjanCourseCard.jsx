import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BhajjanCoursesCard = () => {
  const allCourse = useSelector((state) => state?.courses?.allCourses
  );

  const auth = useSelector((state)=>state?.auth?.isAuthenticated)
  const userId = useSelector((state)=>state?.auth?.user?._id)
  const courseAdded = useSelector((state)=>state?.courses?.allCourses?.addedById?._id)


  // const filteredCourses = allCourse.filter((course) => {
  //   if (auth && userId === courseAdded) {
  //     return course.courseType === "bhajjan" && course.addedBy === "user" && course.addedById._id === userId;
  //   } else if (auth && userId === courseAdded ) {
  //     return course.courseType === "bhajjan" && course.addedBy === "user" && course.addedById._id === userId;
  //   }else {
  //     return course.courseType === "bhajjan" && course.addedBy === "admin";
  //   }
  // });



  const filteredCourses = allCourse.filter((course) => {

    if (!auth) {
      return course.addedBy === "admin" && course.courseType === "bhajjan";
    }

    if (course.addedBy === "user" && course.addedById && course.addedById._id === userId) {
      return course.courseType === "bhajjan";
    }


    if (course.addedBy === "admin") {
      return course.courseType === "bhajjan";
    }


    return false;
  });


  console.log(filteredCourses, "filteredCourses");

  const theme = useTheme();
  const navigate = useNavigate();
  const base = "http://16.171.98.198:4545";

  // const handleCardClick = (id) => {
  //   navigate(`/course-details/${id}`);
  // };

  const handleCardClick = (id) => {
    navigate(`/course-details/${id}`, {
      state: { courseType: "bhajjan" },
    });
  };

  return (
    <Box sx={{ padding: "3rem 10%" }}>
      <Grid container spacing={5}>
        {filteredCourses.map((course, index) => (
          <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
            <Box
              onClick={() => handleCardClick(course._id)}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={`${base}${course?.image?.replace(/ /g, "%20")}`}
                alt="course image"
                width={"80%"}
                height={"250vh"}
              />
            </Box>
            <Box>
              <Typography sx={{ color: "grey" }}>{course.title}</Typography>
              <br />
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  borderRadius: "0px",
                  fontSize: "1.1rem",
                }}
                onClick={() => handleCardClick(course._id)}
              >
                Learn More &rarr;
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BhajjanCoursesCard;
