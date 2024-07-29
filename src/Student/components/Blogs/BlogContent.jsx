import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../../../Layouts/Landing/components/Header";
import { useNavigate } from "react-router";
import { getAllBlogs } from "../../../../store/actions/blogsActions";
import Footer from "../../../../Layouts/Landing/components/Footer";
import Page from "../../../../components/page";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const BlogContent = ({ setProgress, Links }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const navigate = useNavigate();


  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);

    localStorage.setItem("searchQuery", newValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("searchQuery");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {

    const filtered = blogs.filter((blog) => {
      const combinedFields = `${blog.title.toLowerCase()} ${blog.description.toLowerCase()}`;
      return combinedFields.includes(searchQuery.toLowerCase());
    });
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const getAllBlog = async () => {
    dispatch(getAllBlogs())
      .then((res) => {
        // console.log("Fetched blogs:", res);
        const sortedBlogs = res.data.payload.sort((a, b) => b.id - a.id);
        setBlogs(sortedBlogs);
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllBlog();
  }, []);

  // const navigate = useNavigate()
  const handleBlogClick = (event, data) => {
 event.preventDefault()
    if (event.ctrlKey) {
      window.open(`/blog/${data.slug_url}`, "_blank");
    } else {
      navigate(`/blog/${data.slug_url}`);
    }
  };

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Blog</title>
        <meta
          property="og:title"
          content="Blog - Saeedan Technology
"
        />
        <meta name="twitter:title" content="Blog - Saeedan Technology" />
        <meta name="title" content="Blog - Saeedan Technology" />
        <meta
          name="description"
          content="Informative and authentic blog posts about Programming languages, software engineering, tech, website development, and mobile app development.
"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={Links} />
        {/* <script type="application/ld+json">{`
        {
            "@context": "http://schema.org"
            ${state.schema}
        }

    `}</script> */}
      </Helmet>
      <Header />
      <Box sx={{}}>
        <Box
          sx={{
            // backgroundImage: `url(https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=600)`,
            // backgroundSize: 'cover',
            height: "60vh",
            objectFit: "cover",
            backgroundColor: theme.palette.primary.main,
            // position: 'relative',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isSmall ? "0px 30px" : "0px 200px",
          }}
        >
          {/* Overlay */}
          {/* <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.9)',
                        }}
                    /> */}

          <h1
            style={{
              // position: 'absolute',
              top: isMedium || isSmall ? "30%" : "40%",
              padding: isSmall ? "0px 20px" : "0px 100px",
              color: "#ffffff",
              fontSize: isSmall ? "24px" : "40px",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            Saeedan Technology Blog
          </h1>
          <p style={{ fontSize: "24px", textAlign: "center", color: "white" }}>
            Blog about Technology, Business, Programming, Development,
            Marketing, and Artificial Intelligence
          </p>
        </Box>
      </Box>

      <Box sx={{ padding: "0px 30px", margin: "30px 0px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            padding: "20px 0px",
          }}
        >
          <Box>
            <h2
              style={{ padding: "20px 0px", fontSize: "28px", fontWeight: 600 }}
            >
              Latest Blog Posts
            </h2>
          </Box>
          <Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "50px",
                color: "white",
                border: "1px solid gray",
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  mr: 1,
                  width: isSmall ? "100px" : "200px",
                  padding: "5px 20px",
                  color: "gray",
                }}
              />
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon sx={{ color: "gray" }} />
              </IconButton>
            </div>
          </Box>
        </Box>
        {loading ? (
          <CircularProgress
            sx={{
              margin: "0 auto",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
            }}
          />
        ) : (
          <Grid container spacing={5}>
            {filteredBlogs?.map((val, ind) => (
              <Grid key={ind} item lg={4} sm={12} md={6}>
              <Link to={`/blog/${val.slug_url}`} style={{ textDecoration: 'none' }}>
                <Card
                  key={ind}
                  sx={{
                    maxWidth: "100%",
                    backgroundColor: "#f8f4ff",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    // '&:hover': {
                    boxShadow: "10px 0px 20px 10px rgba(0, 0, 0, 0.1)",
                    // }
                  }}
                  onClick={(event) => handleBlogClick(event, val)}

                >
                  <CardMedia
                    component="img"
                    src={`${import.meta.env.VITE_REACT_APP_URL}${val.img}`}
                    alt={val.img_alt_text}
                    loading="lazy"
                    className="lazy-image"
                    sx={{
                      width: "100%",
                      marginBottom: "8px",
                      // height: "35vh",
                      objectFit: "cover",
                      borderRadius: "8px",

                      height: isSmall ? "23vh" : "35vh",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />

                  <CardContent sx={{ padding: "0 10px", flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      fontWeight="bold"
                      sx={{ fontSize: "18px" }}
                    >
                      {val.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}

                      dangerouslySetInnerHTML={{ __html: val.description }}
                    />
                  </CardContent>

                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 10px",
                    }}
                  >
                    <Avatar
                      src={`${apiUrl}/${
                        val.authors.length > 0 ? val.authors[0].img : ""
                      }`}
                    />
                    <Box sx={{ ml: 1 }}>
                      <Typography fontWeight="bold">
                        {val.authors.length > 0
                          ? val.authors[0].name
                          : "No Author Found"}
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {val.authors.length > 0 ? val.authors[0].position : ""}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default BlogContent;
