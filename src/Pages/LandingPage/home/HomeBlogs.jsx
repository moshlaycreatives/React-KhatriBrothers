import { Box, Button, Card, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import BlogCard from '../../BlogsPage/BlogCard'
import { useNavigate } from 'react-router'

const HomeBlogs = () => {

const theme = useTheme()
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
    },
]
const navigate = useNavigate()

const handleBlogView = ()=>{
    navigate('/blogs')
}





  return (
    <>
     <Box sx={{padding:'1rem 10%'}}>
     <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Blogs
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          distinctio maiores minus velit saepe.
        </Typography>
      </Box>
      <br/>

      <Grid container spacing={4}>
        {threecard.map((val, ind) => (
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
                <Typography sx={{ color: "grey" }}>{val.desc}</Typography>

                <Button sx={{ textTransform: "none" }}>
                  Read More &rarr;{" "}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <br />
      <br />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "0px",
            padding: "0.5rem 3rem",
            textTransform: "none",

          }}
          onClick={handleBlogView}
        >
          View All
        </Button>
      </Box>

     </Box>
    </>
  );
}

export default HomeBlogs