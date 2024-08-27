import { Box, Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import PrevLectures from "./components/PrevLectures";
import { useDispatch } from "react-redux";
import { getStudentDashboardDetail, getStudentEnrolledCourses } from "../../../store/actions/courseActions";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const res = await dispatch(getStudentEnrolledCourses());
        const data = res.data.data;
        setCourseData(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getStudentDashboardDetail());
        const data = res.data;
        setDetail(data);
      } catch (err) {
        console.error("Failed to fetch dashboard details:", err);
      } finally {
        setLoading(false); // Stop loading after both requests are done
      }
    };

    fetchData();
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         width: "100%",
  //         height: "80vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: theme.palette.background.default,
  //       }}
  //     >
  //     <CircularProgress/>
  //     </Box>
  //   );
  // }

  {loading && (
    <Box
       sx={{
        position: "fixed",
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         backgroundColor: "rgba(255, 255, 255, 0.8)",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         zIndex: theme.zIndex.modal + 1, // Ensure it is above other components
       }}
     >
       <CircularProgress />
     </Box>
    )}

  const duration = courseData.length === 0 ? 0 : detail.duration;
  const lectureRem = courseData.length === 0 ? 0 : detail.lectureRem;
  const totalEnrollment = courseData.length === 0 ? 0 : detail.totalEnrollment;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "550",
              fontSize: "2rem",
            }}
          >
           Student Dashboard
          </Typography>
          <Button sx={{ textTransform: "none" }} variant="outlined" onClick={() => navigate("/")}>
            Go to Website
          </Button>
        </Box>
        <br />

        <Box>
          <Grid container spacing={5}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  padding: "2rem",
                  color: "white",
                  background: "linear-gradient(to bottom, #901953, #35041f)",
                  width: "100%",
                  borderRadius: "5px",
                  minHeight: "20vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                    Recent Enrolled Course Duration
                  </Typography>
                  <FaCalendarAlt style={{ fontSize: "1.6rem" }} />
                </Box>

                <br />

                <Typography sx={{ fontSize: "2rem", fontWeight: 400 }}>{duration} {" "} <span style={{fontSize:'1rem'}}>weeks</span></Typography>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  padding: "2rem",
                  color: "white",
                  background: "linear-gradient(to bottom, #901953, #35041f)",
                  width: "100%",
                  borderRadius: "5px",
                  minHeight: "20vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                    Recent Course Remaining Lectures
                  </Typography>
                  <BsDatabase style={{ fontSize: "1.6rem" }} />
                </Box>

                <br />

                <Typography sx={{ fontSize: "2rem", fontWeight: 400 }}>{lectureRem}</Typography>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  padding: "2rem",
                  color: "white",
                  background: "linear-gradient(to bottom, #901953, #35041f)",
                  width: "100%",
                  borderRadius: "5px",
                  minHeight: "20vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                    Total Enrolled Courses
                  </Typography>
                  <BsDatabase style={{ fontSize: "1.6rem" }} />
                </Box>

                <br />

                <Typography sx={{ fontSize: "2rem", fontWeight: 400 }}>{totalEnrollment}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <PrevLectures />
      </Box>
    </>
  );
};

export default Dashboard;
