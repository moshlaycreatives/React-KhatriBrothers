import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const AboutSection1 = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          padding: isSmall ? "10rem 10%" : "5rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              About{" "}
              <span style={{ fontSize: "2rem", fontWeight: "500" }}>Us</span>
            </Typography>
            <Box>
              <Typography  sx={{ color: "white",  }}>
                Khatri brothers Academy is dedicated to the cause of promoting
                and preserving India’s rich music and culture. Anmol khatri,
                Shivam khatri (Khatri brothers) and Shyamal Patel are the
                founder, creative director, and principal vocal instructor of
                Khatri Brothers Academy of Music. The Academy teaches many
                genres of Indian vocal music such as Hindustani
                classical,Bhajans, Ghazals, Old and New Bollywood music.
              </Typography>
              {/* <Button
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
              </Button> */}
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: isSmall ? "4rem 0rem 0rem 0rem" : "3rem" }}>
              <img src="/aboutimage.svg" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AboutSection1;
