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
      <Box
        sx={{
          padding: "5rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Customized Course
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a gal
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  mt: 4,
                  color: "#8d1851",
                  borderRadius: "0px",
                  padding: "0.8rem 2rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                  ":hover": {
                    color: "white",
                  },
                }}
              >
                Start Learning
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: "4rem" }}>
              <img src="/BegginerImage.png" alt="image" width={"100%"} />
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

          <AddCustomCourse courseType={originalCourseType} />
        </Box>
      </Box>
    </>
  );
};

export default CustomCourse;
