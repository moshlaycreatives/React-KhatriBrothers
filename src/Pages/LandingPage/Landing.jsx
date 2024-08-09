import {
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./home/Home";
import Page from "../../components/page";
import { getAllCourse } from "../../store/actions/courseActions";

const Landing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllCourse()).then(() => {
      setLoading(false); // Stop the loader when the API call is successful
    }).catch((err)=>{
setLoading(false)
    })
  }, [dispatch]);

  return (
    <>
      <Page title="Khatri Brothers">
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Home />
        )}
      </Page>
    </>
  );
};

export default Landing;
