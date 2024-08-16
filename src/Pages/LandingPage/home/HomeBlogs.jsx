import { Box, Button, Card, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getBlogs } from '../../../store/actions/courseActions';
import { useDispatch } from 'react-redux';

const HomeBlogs = () => {
  const theme = useTheme();
  const [blogData, setBlogsData] = useState([]);
  const dispatch = useDispatch();
  const base = "http://16.171.98.198:4545";

  // Function to format date to '14 August 2024'
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await dispatch(getBlogs());
        const data = res.data.data;
        console.log(data, 'blog data');
        setBlogsData(data);
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
      }
    };

    fetchBlogData();
  }, [dispatch]);

  const navigate = useNavigate();

  const handleBlogView = () => {
    navigate('/blogs');
  };

  return (
    <>
      <Box sx={{ padding: '1rem 10%' }}>
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
        <br />

        <Grid container spacing={5}>
          {blogData.slice(0, 3).map((val, ind) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={ind}>
              <Card sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Box sx={{ height: '300px', overflow: 'hidden' }}>
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
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
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
};

export default HomeBlogs;
