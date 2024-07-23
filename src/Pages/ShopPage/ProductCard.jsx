// import React, { useEffect, useState } from "react";
// import { getApprovedProducts } from "../../store/actions/productActions";
// import { useDispatch } from "react-redux";
// import { FaLocationDot } from "react-icons/fa6";

// import {
//   Avatar,
//   Box,
//   Button,
//   Divider,
//   Grid,
//   InputAdornment,
//   TextField,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { useNavigate } from "react-router";

// const ProductCard = () => {
//   const theme = useTheme();
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const getAllSellers = async () => {
//     dispatch(getApprovedProducts())
//       .then((res) => {
//         setApprovedProducts(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     getAllSellers();
//   }, []);

//   const handleChatClick = (contact) => {
//     window.open(`https://wa.me/${contact}`, "_blank");
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const truncateText = (text, wordLimit) => {
//     const words = text.split(" ");
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(" ") + "...";
//     }
//     return text;
//   };

//   const filteredProducts = approvedProducts.filter((product) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <>
//       <Box sx={{ padding: "2rem 5%" }}>
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <TextField
//             variant="outlined"
//             placeholder="Search for products..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: "50%" }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchOutlinedIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Grid container spacing={2}>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((val, ind) => (
//               <Grid
//                 item
//                 lg={8}
//                 md={8}
//                 sm={12}
//                 xs={12}
//                 key={ind}
//                 sx={{cursor:'pointer'}}
//                 onClick={() => handleProductClick(val.uid)}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: "white",
//                     borderRadius: "8px",

//                     overflow: "hidden",
//                     textAlign: "start",
//                     display: "flex",
//                     mb: 2,
//                   }}
//                 >

// <Grid container spacing={3}>
//   <Grid item lg={5} md={5} sm={12} xs={12}>
// <Box>


// {val.images.map((imageUrl, index) => {
//                     if (index === 0) {
//                       const imagePath = imageUrl.split("/uploads")[1];
//                       return (
//                         <img
//                           key={imageUrl}
//                           src={`https://wv9pfwh9-5002.inc1.devtunnels.ms/uploads/${imagePath}`}
//                           alt={val.title}
//                           style={{ width: "100%", height: "30vh", borderRadius:'10px' }}
//                         />
//                       );
//                     }
//                     return null;
//                   })}
// </Box>
//   </Grid>

//   <Grid item lg={7} md={7} sm={12} xs={12}>

//   <Box>
//                     <Typography
//                       variant="h1"
//                       sx={{ fontSize: "1.1rem", fontWeight: "700" }}
//                     >
//                       {val.title}
//                     </Typography>
//                     <br />

//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: "500", fontSize: "0.8rem" }}
//                     >
//                       {val.PrimaryCategory.title}
//                     </Typography>

//                     <Typography variant="h6" fontWeight="600">
//                       AED {val.price}
//                     </Typography>
//                     <br />

//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Box
//                         sx={{
//                           backgroundColor: "#f7f7f8",
//                           padding: "0.3rem 0.8rem",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
//                           AGE
//                         </Typography>
//                         <Typography sx={{ fontWeight: "600" }}>
//                           1-6 months
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{
//                           backgroundColor: "#f7f7f8",
//                           padding: "0.3rem 0.8rem",
//                           marginLeft: "1rem",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
//                           USAGE
//                         </Typography>
//                         <Typography sx={{ fontWeight: "600" }}>
//                           Never Used
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{
//                           backgroundColor: "#f7f7f8",
//                           padding: "0.3rem 0.8rem",
//                           marginLeft: "1rem",
//                           borderRadius: "5px",
//                         }}
//                       >
//                         <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
//                           CONDITION
//                         </Typography>
//                         <Typography sx={{ fontWeight: "600" }}>
//                           Flawless
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <br />
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <FaLocationDot />

//                       <Typography
//                         variant="h6"
//                         sx={{ fontWeight: "500", fontSize: "1rem" }}
//                       >
//                         {val.address}
//                       </Typography>
//                     </Box>

//                     {/* <Typography variant="body2" color="textSecondary">
//                       {truncateText(val.description, 10)}
//                     </Typography> */}
//                   </Box>
// </Grid>
// </Grid>






//                 </Box>
//                 <Divider />
//               </Grid>
//             ))
//           ) : (
//             <Typography sx={{ width: "100%", textAlign: "center", mt: 3 }}>
//               No products found
//             </Typography>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ProductCard;



import React, { useEffect, useState } from "react";
import { getApprovedProducts } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { Avatar, Box, Button, Divider, Grid, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import FilterBar from "./FilterBar"; // Make sure the path is correct

const ProductCard = () => {
  const theme = useTheme();
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllSellers = async () => {
    dispatch(getApprovedProducts())
      .then((res) => {
        setApprovedProducts(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  const handleChatClick = (contact) => {
    window.open(`https://wa.me/${contact}`, "_blank");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (field, value) => {
    if (field === "city") setCity(value);
    if (field === "keyword") setKeyword(value);
    if (field === "price") setPrice(value);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  console.log(city, 'ccccc')
  const filterProducts = () => {
    return approvedProducts.filter((product) => {
      const matchesKeyword = product.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesCity = !product.User.state || product.User.state === product.User.state;
      const matchesNeighborhood = !neighborhood || product.neighborhood === neighborhood;
      const matchesPrice = !price || (parseInt(product.price) >= parseInt(price.split("-")[0]) && parseInt(product.price) <= parseInt(price.split("-")[1]));
      return matchesKeyword && matchesCity && matchesNeighborhood && matchesPrice;
    });
  };

  const filteredProducts = filterProducts();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Box sx={{ padding: "2rem 5%" }}>
        <FilterBar
          city={city}
          keyword={keyword}
          neighborhood={neighborhood}
          price={price}
          onFilterChange={handleFilterChange}
        />
        <br/>
        <br/>
        <br/>

        <Grid container spacing={2}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((val, ind) => (
              <Grid
                item
                lg={8}
                md={8}
                sm={12}
                xs={12}
                key={ind}
                sx={{ cursor: "pointer" }}
                onClick={() => handleProductClick(val.uid)}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    textAlign: "start",
                    display: "flex",
                    mb: 2,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                      <Box>
                        {val.images.map((imageUrl, index) => {
                          if (index === 0) {
                            const imagePath = imageUrl.split("/uploads")[1];
                            return (
                              <img
                                key={imageUrl}
                                src={`https://wv9pfwh9-5002.inc1.devtunnels.ms/uploads/${imagePath}`}
                                alt={val.title}
                                style={{ width: "100%", height: "30vh", borderRadius: '10px' }}
                              />
                            );
                          }
                          return null;
                        })}
                      </Box>
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                      <Box>
                        <Typography
                          variant="h1"
                          sx={{ fontSize: "1.1rem", fontWeight: "700" }}
                        >
                          {val.title}
                        </Typography>
                        <br />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "500", fontSize: "0.8rem" }}
                        >
                          {val.PrimaryCategory.title}
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                          AED {val.price}
                        </Typography>
                        <br />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              backgroundColor: "#f7f7f8",
                              padding: "0.3rem 0.8rem",
                              borderRadius: "5px",
                            }}
                          >
                            <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
                              AGE
                            </Typography>
                            <Typography sx={{ fontWeight: "600" }}>
                              1-6 months
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "#f7f7f8",
                              padding: "0.3rem 0.8rem",
                              marginLeft: "1rem",
                              borderRadius: "5px",
                            }}
                          >
                            <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
                              USAGE
                            </Typography>
                            <Typography sx={{ fontWeight: "600" }}>
                              Never Used
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "#f7f7f8",
                              padding: "0.3rem 0.8rem",
                              marginLeft: "1rem",
                              borderRadius: "5px",
                            }}
                          >
                            <Typography sx={{ color: "grey", fontSize: "0.6rem" }}>
                              CONDITION
                            </Typography>
                            <Typography sx={{ fontWeight: "600" }}>
                              Flawless
                            </Typography>
                          </Box>
                        </Box>
                        <br />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <FaLocationDot />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "500", fontSize: "1rem" }}
                          >
                            {val.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Grid>
            ))
          ) : (
            <Typography sx={{ width: "100%", textAlign: "center", mt: 3 }}>
              No products found
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ProductCard;
