import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import {
  getStudentJoinFreeTrails,
  studentApplyFreeTrails,
} from "../../../../store/actions/courseActions";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
function Hero() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const [trailData, setTrialData] = useState({});
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  useEffect(() => {
    if (auth === true) {
      const fetchTrialData = async () => {
        try {
          const res = await dispatch(getStudentJoinFreeTrails());
          const data = res.data.data;
          setTrialData(data);
        } catch (err) {
          console.error("Failed to fetch free trails:", err);
        }
      };
      fetchTrialData();
    }
  }, []);

  const handleFreeTrail = () => {
    // console.log(courseType, 'courseType for trails')
    if (auth === true) {
      setLoadingEnroll(true);
      dispatch(studentApplyFreeTrails())
        .then((res) => {
          console.log(res.data.message, "snackbar messg");
          enqueueSnackbar(res.data.message, { variant: "success" });
          setLoadingEnroll(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingEnroll(false);

          enqueueSnackbar(err.response.data.message, { variant: "error" });
        });
    }
    // else {
    //   navigate("/sign-in", { state: { from: location.pathname } });
    // }
  };

  return (
    <>
      <section className="hero-section">
        {/* <Navbar/> */}
        <div className="hero-section-text">
          <Typography
            sx={{ color: "white", fontSize: "3rem", fontWeight: "500" }}
          >
            Music For <br /> Everyone
          </Typography>

          {/* <h1>Music <samp className='hero-section-text-spam' >For</samp> Everyone</h1> */}
          {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none'}}>Start learning</Button> */}

          <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
            Which course is suitable for me?
          </Typography>
          <br />
          {/* <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none', padding:'0.6rem', width:'50%'}}>Book 15 Minutes Free Trial</Button> */}

          <Box>
            {!auth ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: "0px",
                  position: "relative",
                }}
                onClick={() => navigate("/sign-in")}
              >
                {loadingEnroll ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "15 Minutes free trial with Admin"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={trailData && trailData?.studentId?.trial === true}
                sx={{

                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: "0px",
                  position: "relative",
                }}
                onClick={() => {
                  if (!trailData || !trailData?.studentId?.trial) {
                    handleFreeTrail();
                  }
                }}
              >
                {loadingEnroll ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "15 Minutes free trial with Admin"
                )}
              </Button>
            )}
          </Box>
        </div>
      </section>
    </>
  );
}

export default Hero;
