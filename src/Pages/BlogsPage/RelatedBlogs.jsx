import { Box, Button, Card, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlogs } from '../../store/actions/courseActions';

const RelatedBlogs = () => {

const theme = useTheme()




const dispatch = useDispatch();
const navigate = useNavigate(); // Initialize useNavigate
const [blogsData, setBlogsData] = useState([]);
const [loading, setLoading] = useState(true); // New loading state

useEffect(() => {
  const fetchBlogData = async () => {
    try {
      const res = await dispatch(getBlogs());
      const data = res.data.data;
      console.log(data, "blog data");
      setBlogsData(data);
    } catch (err) {
      console.error("Failed to fetch advanced courses:", err);
    }
  };

  fetchBlogData();
}, []);

const base = "http://16.171.98.198:4545";

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const handleCardClick = (id) => {

  console.log(id, 'blog id')
  navigate(`/blogs/${id}`); // Navigate to the detail page with the blog ID
};

  return (
    <>





<Box sx={{padding:'2rem 0%'}}>

<Typography sx={{color:theme.palette.primary.main, textAlign:'center', fontWeight:'600', fontSize:'2rem'}}>Related Blogs</Typography>

<br/>

<Grid container spacing={4}>

{blogsData.slice(0,3).map((val) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={val.id}>
              <Card
                sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
                onClick={() => handleCardClick(val._id)} // Add onClick handler
              >
                <Box sx={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={`${base}${val.images[0]}`}
                    alt="Blog Image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ padding: "1rem" }}>
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      bottom: 90,
                      left: 10,
                      borderRadius: "0px",
                      padding: "0.5rem 1.8rem",
                      textTransform: "none",
                      margin: '1rem',
                      zIndex: 1,
                    }}
                  >
                    {formatDate(val.createdAt)}
                  </Button>

                  <Typography
                    sx={{
                      color: "grey",
                      marginTop: '2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {val.description}
                  </Typography>

                  <Button sx={{ textTransform: "none" }}>
                    Read More &rarr;{" "}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}

</Grid>





</Box>




    </>
  )
}

export default RelatedBlogs