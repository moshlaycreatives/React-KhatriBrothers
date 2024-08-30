
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GhazalCourseCard = () => {
  const filteredCourses = useSelector((state) =>
    state?.courses?.allCourses?.filter(course => course.courseType === 'ghazal')
  );

  console.log(filteredCourses, 'filteredCourses');

  const theme = useTheme();
  const navigate = useNavigate();
  const base = "https://khatribrothersacademy.com:4545";

  const handleCardClick = (id) => {
    navigate(`/course-details/${id}`);
  };


  return (
    <Box sx={{ padding: "3rem 10%" }}>
      <Grid container spacing={5}>
        {filteredCourses.map((course, index) => (
          <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
            <Box onClick={() => handleCardClick(course._id)} sx={{ cursor: 'pointer' }}>
              <img  src={`${base}${course.image.replace(/ /g, "%20")}`} alt="course image" width={"80%"} height={'250vh'} />
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
                Learn More &rarr;
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GhazalCourseCard;
