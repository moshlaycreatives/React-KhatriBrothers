import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const AdvanceCourseHeroSection = () => {
const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Box
        sx={{
          padding:isSmall ? "6rem 10% 0rem 10% " :"3rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              Advanced{" "}
              <span style={{ fontSize: "2rem", fontWeight: "500" }}>Level</span>
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Series of advanced courses aimed at enhancing the musical skills of students in various categories. The academy provides professional guidance and instruction in techniques and notations for students from diverse backgrounds.
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
                }}
              >
                Start Learning
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding:isSmall ? "2rem": "5rem" }}>
              <img src="/AdvanceImage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdvanceCourseHeroSection;
