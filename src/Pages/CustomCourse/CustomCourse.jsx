import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCustomCourse from "./AddCustomCourse";
import Page from "../../components/page";

const CustomCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const courseType = location.state?.courseType;


  // if (courseType === "bhajjan") {
  //   courseType = "bhajan";
  // }
  const originalCourseType = location.state?.courseType;

  // Determine the display text
  const displayCourseType = originalCourseType === "bhajjan" ? "bhajan" : originalCourseType;
  const theme = useTheme();


  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
    <Page title= {`customized ${displayCourseType}`}>

      <Box
        sx={{
          padding: "5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Customized {displayCourseType}
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Tailor your musical journey with our personalized courses! Explore a world of options, Choose whatever you want to learn that ignite your passion. Discover your unique sound and achieve your musical goals with our expert guidance.
              </Typography>

            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box sx={{ padding: "4rem" }}>
  <img
    src={
      displayCourseType === 'bhajan' ? '/BhajanCourseLogo.JPG' :
      displayCourseType === 'bollywood' ? '/BhajanCourseLogo.JPG' :
      displayCourseType === 'ghazal' ? '/GhazalCourseLogo.JPG' :
      '/defaultImage.png' // fallback image if none match
    }
    alt="course type"
    width={"100%"}
    height={'300rem'}
  />
</Box>

          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          padding: isSmall ? "3rem 3%" : "3rem 10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "2rem",
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            Select From list Given for {displayCourseType}
          </Typography>

          <AddCustomCourse courseType={originalCourseType} bhajjanType= {displayCourseType}/>
        </Box>
      </Box>
    </Page>
    </>
  );
};

export default CustomCourse;
