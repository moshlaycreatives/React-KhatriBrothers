import React, { useEffect, useState } from 'react'
import "./Hero_card.css"
import Hero_card_box from './Hero_card_box';
import CountUp from 'react-countup';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { TiWorldOutline } from 'react-icons/ti';
import { FaRegSmile } from 'react-icons/fa';
import { PiVideoLight } from 'react-icons/pi';
import { useDispatch } from "react-redux";
import { getCounterCardData } from '../../../../store/actions/courseActions';



function Hero_card() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [counterCardData , setCounterCardData] = useState([]);
  const [counterData , setCounterData] = useState({});




  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getCounterCardData());

        setCounterData(data)
      } catch (err) {
        console.error("Failed to fetch counter card data:", err);
      }
    };

    fetchData();
  }, [dispatch]);


  return (
    <>
    <section className='hero-card-section'>
    {/* {counterData.map((row, ind)=>( */}
      <Grid  container spacing={5}>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box
          sx={{
            padding: "2rem 3rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <TiWorldOutline style={{ color: "white", fontSize: "4rem" }} />

            <Typography sx={{ fontSize: "2rem" }}>
              {" "}
              <CountUp style={{ fontSize: "2rem" }} start={0} end={8} />+
            </Typography>

            <Typography>Total Countries</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box
          sx={{
            padding: "2.1rem 3rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >

          <Box>
            <img src='/peopleIcon.svg' alt='icon' width='100%'/>
          </Box>

            <Typography sx={{ fontSize: "2rem" }}>
              {" "}
              <CountUp style={{ fontSize: "2rem" }} start={0} end={counterData.totalStudents} />+
            </Typography>

            <Typography>Total Students</Typography>
          </Box>
        </Box>
      </Grid>



      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box
          sx={{
            padding: "2rem 3rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <FaRegSmile style={{ color: "white", fontSize: "4rem" }} />

            <Typography sx={{ fontSize: "2rem" }}>
              {" "}
              <CountUp style={{ fontSize: "2rem" }} start={0} end={counterData.totalEnrollment} />+
            </Typography>

            <Typography>Happy Students</Typography>
          </Box>
        </Box>
      </Grid>




      <Grid item lg={3} md={3} sm={12} xs={12}>
        <Box
          sx={{
            padding: "2rem 3rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <PiVideoLight style={{ color: "white", fontSize: "4rem" }} />

            <Typography sx={{ fontSize: "2rem" }}>
              {" "}
              <CountUp style={{ fontSize: "2rem" }} start={0} end={counterData.totalLectures} />+
            </Typography>

            <Typography>Online Classes</Typography>
          </Box>
        </Box>
      </Grid>



    </Grid>
    {/* ))} */}


    </section>
    </>
  )
}

export default Hero_card;




