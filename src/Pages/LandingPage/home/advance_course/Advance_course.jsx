import React, { useEffect, useState } from "react";
import "./Advance_course.css";
import Advance_course_card from "./Advance_course_card";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import AdvanceCoursesCard from "../../../AdvanceCoursePage/AdvanceCoursesCard";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceCourse } from "../../../../store/actions/courseActions";
import { useNavigate } from "react-router";

function Advance_course() {

  const course = useSelector((state)=>state?.courses?.allCourses)

  const AdvanceCourses = course?.filter(val => val.courseType === 'advanced')

  console.log(course, 'all course on advance code ')
  const theme = useTheme();
  const base = 'http://16.171.98.198:4545'

const navigate = useNavigate()

  const handleViewAll = () => {
    navigate("/advanced-course");
  };

  const handleOpenCourse = (id) => {
    navigate(`/course-details/${id}`);
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
          Advance Level Courses
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          distinctio maiores minus velit saepe.
        </Typography>
      </Box>
      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={4}>
          {AdvanceCourses?.slice(0, 3).map((val, ind) => (
            <Grid
              key={ind}
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              onClick={()=>handleOpenCourse(val._id)}
            >
              <Box>
                <img  src={`${base}${val.image.replace(/ /g, "%20")}`} alt="alt image" width={"100%"} height='250vh' />
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
                  onClick={()=>handleOpenCourse(val._id)}
                >
                  Learn More &rarr;
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

export default Advance_course;
