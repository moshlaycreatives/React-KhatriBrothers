import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HomeProducts from "../ShopPage/HomeProducts";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../store/actions/categoriesActions";
import { Link } from "react-router-dom";
import Home from "./home/Home";
import Page from "../../components/page";

const Landing = () => {
  const theme = useTheme();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])



  return (
    <>
<Page title='Khatri Brothers'>
<Home/>

</Page>
    </>
  );
};

export default Landing;
