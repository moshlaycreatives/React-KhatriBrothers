import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  getRelatedCourses,
  getSingleCourse,
} from "../../store/actions/courseActions";

const AdvanceCoursePriceHeroSection = () => {
  const theme = useTheme();

  const base = "https://wv9pfwh9-4545.inc1.devtunnels.ms";

 

  const { id } = useParams();

  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await dispatch(getSingleCourse(id));

        setCourseData(res.data.data);
        dispatch(getRelatedCourses(res.data.data.courseType))
        .then((res) => {
          setRelated(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });

      } catch (err) {
        console.error("Failed to fetch advance courses:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);



  const [related, setRelated] = useState([]);


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          padding: "2rem 10% 0rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h5" fontWeight="550" color="white">
              {courseData.title}
            </Typography>
            <Box>
              <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                {courseData.overview}
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
              <img
                src={`${base}${courseData.image.replace(/ /g, "%20")}`}
                alt="image"
                width={"100%"}
              />
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
              {courseData.overview}
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
              {courseData.prerequisites}
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

            {courseData.topics.map((topic, index) => (
              <>
                <Typography sx={{ color: "grey", mb: 1 }}>● {topic}</Typography>
              </>
            ))}
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
                  <span style={{ color: "grey" }}>
                    {courseData.courseDuration} Weeks
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
                  <span style={{ color: "grey" }}>
                    {courseData.lectureDuration} Hour
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
                  Price ${courseData.price}
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
            {related.slice(0, 3).map((val, ind) => (
              <Grid key={ind} item lg={4} md={4} sm={12} xs={12}>
                <Box>
                  <img
                    src={`${base}${val.image.replace(/ /g, "%20")}`}
                    alt="alt image"
                    width={"100%"}
                    height={"200vh"}
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

export default AdvanceCoursePriceHeroSection;
