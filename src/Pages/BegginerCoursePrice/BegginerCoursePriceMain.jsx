import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { MdDateRange } from "react-icons/md";

const BegginerCoursePriceMain = () => {
  const theme = useTheme();
  const advanceData = [
    {
      image: "advancecourse.png",
      desc: "Lorem ipsum dolor sit amet.",
    },
    {
      image: "advancecourse.png",
      desc: "Lorem ipsum dolor sit amet.",
    },
    {
        image: "advancecourse.png",
        desc: "Lorem ipsum dolor sit amet.",
      },
  ];
  return (
    <>
      <Box
        sx={{
          padding: "0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h5" fontWeight="550" color="white">
            Hindustani Vocal Children A series
            For ages 6+ years
            </Typography>
            <Box>
              <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
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
                  padding: "0.6rem 2.3rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                Enroll Now
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: "5rem" }}>
              <img src="/AdvanceImage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={5}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Overview:{" "}
            </Typography>
            <Typography sx={{ color: "grey" }}>
              The development of each Raga learnt is detailed and the student is
              encouraged to sing extempore Swar Vistar and Aalap. Swar Sadhana
              is done with Aakar, Sakar. Raga Poorvi is the first Raga
              introduced in this course.
            </Typography>

            <br />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Prerequisites:
            </Typography>
            <Typography sx={{ color: "grey" }}>
              Our expert teachers will decide your eligibility in this course,
              by listening student’s vocals.
            </Typography>

            <Typography sx={{ color: "grey", marginTop: "0.5rem" }}>
              Tanpura app or Electronic Tanpura needed
            </Typography>

            <br />

            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Topic covered:{" "}
            </Typography>

            <Typography sx={{ color: "grey" }}>
              ● Thaat and Ragas
              <br />
              ● Gamak Ke Prakar
              <br />
              ● Raga Hameer
              <br />
              ● Raga Purvi
              <br />
              ● Raga Khamaj
              <br />● Carnatic and Hindustani Ragas
            </Typography>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box sx={{ border: "8px solid #961a56", padding: "2rem 1.5rem" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: "1.3rem",
                }}
              >
                Course Feature
              </Typography>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Enrolled : <span style={{ color: "grey" }}>240 Students</span>
                </Typography>
              </Box>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Course Duration :{" "}
                  <span style={{ color: "grey" }}>12 Weeks</span>
                </Typography>
              </Box>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Lectures : <span style={{ color: "grey" }}>1/ Per Week</span>
                </Typography>
              </Box>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Level :{" "}
                  <span style={{ color: "grey" }}>
                    Begginer to Professional
                  </span>
                </Typography>
              </Box>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Lecture Duration :{" "}
                  <span style={{ color: "grey" }}>1 Hour</span>
                </Typography>
              </Box>
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdDateRange
                  style={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={{ fontWeight: 600, marginLeft: "1rem" }}>
                  Max Class Size : <span style={{ color: "grey" }}>03</span>
                </Typography>
              </Box>
              <br />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                >
                  Price $100
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Convert to INR?
                </Typography>
              </Box>

              <br />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: "0px",
                }}
              >
                Enroll Course
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "1rem" }}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: theme.palette.primary.main,
            }}
          >
            Related Courses{" "}
          </Typography>
          <br />
          <Grid container spacing={5}>
            {advanceData.map((val, ind) => (
              <Grid key={ind} item lg={4} md={4} sm={12} xs={12}>
                <Box>
                  <img src={val.image} alt="alt image" width={"100%"} />
                </Box>
                <Box>
                  <Typography sx={{ color: "grey" }}>{val.desc}</Typography>
                  <br />
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.primary.main,
                      textTransform: "none",
                      borderRadius: "0px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Learn More &rarr;
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BegginerCoursePriceMain;
