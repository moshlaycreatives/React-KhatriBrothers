import React, { useEffect, useState } from "react";
import { getApprovedProducts } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom"; // import useHistory for navigation
import Loader from "../../components/Loader/Loader";


const HomeProducts = () => {
  const theme = useTheme();
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize useHistory

  const getAllSellers = async () => {
    setLoading(true); // Set loading to true before API call
    dispatch(getApprovedProducts())
      .then((res) => {
        setApprovedProducts(res.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Set loading to false in case of error
      });
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewAllClick = () => {
    navigate('/shop'); // navigate to /shop
  };

  const filteredProducts = approvedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.PrimaryCategory.title;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ padding: "2rem 10%" }}>
      {loading ? ( // Display loader when loading is true
        <Loader />
      ) : (
        Object.entries(groupedProducts).map(([category, products]) => (
          <Box key={category} sx={{ mt: 4 }}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight:'700', fontSize:'1.3rem' }}>
                Popular in {category}
              </Typography>
              {/* <Button variant="contained" color="primary" onClick={handleViewAllClick}>
                View All
              </Button> */}
            </Box>
            <Grid container spacing={1}>
              {products.slice(0, 5).map((product, ind) => (
                <Grid item lg={2.4} md={2.7} sm={12} xs={12} key={ind} onClick={() => handleProductClick(product.uid)}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      // borderColor: "#f7f7f7",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

                    },
                      overflow: "hidden",
                      padding: "5px",
                      textAlign: "start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      {product.images.map((imageUrl) => {
                        const imagePath = imageUrl.split("/uploads")[1];
                        return (
                          <img
                            key={imageUrl}
                            src={`https://wv9pfwh9-5002.inc1.devtunnels.ms/uploads/${imagePath}`}
                            alt={product.title}
                            style={{ width: "100%", height: "25vh" }}
                          />
                        );
                      })}
                    </Box>

                    <Box
                      p={2}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                        alignItems: "start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: theme.palette.primary.main,
                        }}
                      >
                        <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                          AED:{" "}
                        </span>{" "}
                        {product.price}
                      </Typography>
                      <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
                        {product.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: theme.palette.primary.textPrimary,
                        }}
                      >
                        {product.User.state}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default HomeProducts;
