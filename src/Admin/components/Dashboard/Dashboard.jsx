import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import RecentEnrollments from "./components/RecentEnrollments";
import { getStudentData } from "../../../store/actions/courseActions";


const Dashboard = () => {
  const theme = useTheme();
  



  const cardData = [
    {
      title: "Students",
      icon: <FaCalendarAlt style={{ fontSize: "1.6rem" }} />,
      price: "$100",
    },
    {
      title: "Total Earn",
      icon: <FaCalendarAlt style={{ fontSize: "1.6rem" }} />,
      price: "$67630",
    },
    {
      title: "Teachers",
      icon: <BsDatabase style={{ fontSize: "1.6rem" }} />,
      price: "20",
    },
    {
      title: "Total Courses",
      icon: <FaCalendarAlt style={{ fontSize: "1.6rem" }} />,
      price: "08",
    },
  ];

  return (
    <>
      <Box sx={{width:'100%'}}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: "2rem",
          }}
        >
          Dashboard
        </Typography>

        <Box>
          <Grid container spacing={5}>
            {cardData.map((val, ind) => (
              <Grid item lg={6} md={6} sm={12} xs={12} key={ind}>
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
                      {val.title}
                    </Typography>
                    {/* <Typography sx={{fontSize:'2rem'}}></Typography> */}
                    {val.icon}
                  </Box>

                  <br />

                  <Typography sx={{ fontSize: "2rem", fontWeight: 400 }}>
                    {val.price}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

<RecentEnrollments/>
      </Box>

    </>
  );
};

export default Dashboard;
