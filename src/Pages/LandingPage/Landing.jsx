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


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getAllCourse())
  }, [dispatch]);

  return (
    <>
      <Page title="Khatri Brothers">
      <Home />
        
      </Page>
    </>
  );
};

export default Landing;
