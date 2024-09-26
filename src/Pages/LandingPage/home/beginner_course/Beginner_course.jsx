import React, { useEffect, useState } from "react";
import "./Beginner_course.css";
import Beginner_course_card from "./Beginner.course-card.jsx";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import BegginerCourseCard from "../../../BegginerCoursesPage/BegginerCourseCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getBeginnerCourse } from "../../../../store/actions/courseActions.js";
import { useNavigate } from "react-router";

function Beginner_course() {
  const theme = useTheme();

  const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";

  const course = useSelector((state) => state?.courses?.allCourses);
  const navigate = useNavigate();

  const beginnerCourses = course?.filter(
    (val) => val.courseType === "beginner"
  );

  const handleOpenCourse = (id) => {
    navigate(`/course-details/${id}`);
  };

  const handleViewAll = () => {
    navigate("/beginner-course");
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Beginner Level Courses
        </Typography>
        <Typography>
        The beginner course is designed for beginners who have a passion for music and want to improve their music skills.

        </Typography>
      </Box>

      <Box sx={{ padding: "3rem 10%" }}>
        <Grid container spacing={3}>
          {beginnerCourses?.slice(0, 4).map((val, ind) => (
            <Grid
              key={ind}
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              onClick={() => handleOpenCourse(val._id)}
            >
              <Box>
                <img
                  src={`${base}${val.image.replace(/ /g, "%20")}`}
                  alt="alt image"
                  width={"100%"}
                  height={"250vh"}
                />
              </Box>
              <Box>
                <Typography sx={{ color: "grey" }}>{val.title}</Typography>
                <br />
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.primary.main,
                    textTransform: "none",
                    borderRadius: "0px",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => handleOpenCourse(val._id)}
                >
                  Start Learning &rarr;
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "0px",
              padding: "0.5rem 3rem",
              textTransform: "none",
            }}
            onClick={handleViewAll}
          >
            View All
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Beginner_course;
