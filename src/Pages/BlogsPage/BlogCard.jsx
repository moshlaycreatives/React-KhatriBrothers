import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

const BlogCard = () => {

  useEffect(()=>{
window.scrollTo(0,0)
  },[])

    const twocard = [
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
    ]


    const threecard = [
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
        {
            image:'/BegginerImage.png',
            desc:'Lorem ipsum, dolor sit amet consectetur ...'
        },
    ]






  return (
    <>
      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={3}>

         {twocard.map((val, ind)=>(
            <Grid item lg={6} md={6} sm={12} xs={12} key={ind}>
            <Card>
              <Box>
                <img src={val.image} alt="" width={"100%"} />
              </Box>

              <Button
                variant="contained"
                sx={{
                  marginLeft: "1rem",
                  marginTop: "-2rem",
                  borderRadius: "0px",
                  padding: "0.5rem 1.8rem",
                  textTransform: "none",
                }}
              >
                {" "}
                27 january 2024
              </Button>
              <Box sx={{ padding: "1rem" }}>
                <Typography sx={{ color: "grey" }}>
                {val.desc}
                </Typography>

                <Button sx={{ textTransform: "none" }}>Read More &rarr; </Button>
              </Box>
            </Card>
          </Grid>
         ))}



        </Grid>
<br/>
      <Grid container spacing={4}>

      {threecard.map((val, ind)=>(
        <Grid item lg={4} md={4} sm={12} xs={12} key={ind}>
            <Card>
              <Box>
                <img src={val.image} alt="" width={"100%"} />
              </Box>

              <Button
                variant="contained"
                sx={{
                  marginLeft: "1rem",
                  marginTop: "-2rem",
                  borderRadius: "0px",
                  padding: "0.5rem 1.8rem",
                  textTransform: "none",
                }}
              >
                {" "}
                27 january 2024
              </Button>
              <Box sx={{ padding: "1rem" }}>
                <Typography sx={{ color: "grey" }}>
                  {val.desc}
                </Typography>

                <Button sx={{ textTransform: "none" }}>Read More &rarr; </Button>
              </Box>
            </Card>
          </Grid>
      ))}

      </Grid>




      </Box>
    </>
  );
};

export default BlogCard;
