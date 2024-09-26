import React, { useEffect, useState } from "react";
import BlogDetailHeroSection from "./BlogDetailHeroSection";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import RelatedBlogs from "./RelatedBlogs";
import Page from "../../components/page/page";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getDetailBlog } from "../../store/actions/courseActions";

const BlogDetailPage = () => {
  const theme = useTheme();
  const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";

  const { id } = useParams();
  const [blogData, setBlogsData] = useState({});
  console.log(blogData, "details blog data");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await dispatch(getDetailBlog(id));
        const data = res.data.data;
        console.log(data, "blog data");
        setBlogsData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchBlogData();
  }, []);


  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric',  year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (loading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Page title="Blog Detail Page">
        <Box
          sx={{
            padding: "7rem 10% 0rem 10%",
            background: "linear-gradient(to bottom, #901953, #000000)",
          }}
        >
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography variant="h5" fontWeight="550" color="white">
                {blogData.title}
              </Typography>
              <Box>
                {/* <Typography sx={{ color: "white" }}>
                  {blogData.description}
                </Typography> */}
                <Typography
                sx={{
                  color: "white",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 4, // Limit to 4 lines
                }}
              >
                {blogData.description}
              </Typography>
                {/* <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    mt: 4,
                    color: "#8d1851",
                    borderRadius: "0px",
                    padding: "0.8rem 2rem",
                    textTransform: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Start Learning
                </Button> */}
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'50vh' }}>
                <Box>
                  <img
                    src={`${base}${blogData?.images[0]}`}
                    alt="Blog Image"
                    style={{ width: "100%" }}
                  />
                </Box>
                {/* <img src="/BegginerImage.png" alt="image" width={"100%"} /> */}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ padding: "2rem 10%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Box>
              <img
                src={`${base}${blogData?.images[0]}`}
                alt="Blog Image"
                style={{ width: "100%" }}
              />
            </Box>
            {/* <img src="/BlogDetail.png" alt="hdf" width={"100%"} /> */}
          </Box>

          <Box sx={{ padding: "0rem 15%" }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              {blogData.title}
            </Typography>



          </Box>
<br/>

          <Box sx={{ padding: "0rem 0%", textAlign:'center' }}>
          <Typography
      component="a" // Treat Typography as an anchor tag
      href={blogData.youtubeLink} // Set the link URL
      target="_blank" // Open in a new tab
      rel="noopener noreferrer" // Security best practice
      sx={{
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: "1rem",

        // Optional: Add underline on hover

        textDecoration: "none", // Optional: Remove underline if you want
        '&:hover': {
          textDecoration: 'underline' // Optional: Add underline on hover
        }
      }}
    >
      {blogData.youtubeLink}
    </Typography>

    <br/>
    <br/>


          </Box>

          <Box sx={{ padding: "0rem 15%" }}>
            <Typography
              sx={{ color: "grey", fontSize: "1rem", textAlign: "center" }}
            >
              {blogData.description}
            </Typography>
          </Box>

          <Box sx={{ padding: "0rem 15%" }}>
            <Typography
              sx={{ color: "grey", fontSize: "1rem", textAlign: "center" }}
            >
              By{" "}
              <span style={{ color: "black", fontWeight: 600 }}>
                {blogData.createdBy.firstName} {"  "}
                {blogData.createdBy.lastName}
              </span>
            </Typography>
          </Box>

          <br />
<Box sx={{display:'flex', justifyContent:'space-between',mb:1, alignItems:'center'}}>
<Box sx={{display:'flex', alignItems:'start'}}gap={1}>
<MdOutlineAccessTime style={{color:theme.palette.primary.main, fontSize:'1.3rem'}}/>
<Typography sx={{color:'grey', fontSize:'1rem'}}> Reading Time : {blogData.readTime} mins</Typography>
</Box>


<Box sx={{display:'flex', alignItems:'start'}} gap={1}>
<FaRegCalendarAlt style={{color:theme.palette.primary.main, fontSize:'1.3rem'}}/>
<Typography sx={{color:'grey', fontSize:'1rem'}}>{formatDate(blogData.createdAt)}</Typography>

</Box>

</Box>
          <Divider />
          <br />
          <br />

          <Typography sx={{ color: "grey", marginBottom: "0.5rem" }}>
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          </Typography>
          <br />
          <br />

          <Divider />

          <RelatedBlogs />
        </Box>
      </Page>
    </>
  );
};

export default BlogDetailPage;
