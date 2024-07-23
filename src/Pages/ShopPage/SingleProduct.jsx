import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  useTheme,
  Divider,
  Link as MuiLink
} from '@mui/material';
import { getSingleProduct } from '../../store/actions/productActions';
import MessageIcon from '@mui/icons-material/Message';
import Loader from '../../components/Loader/Loader';

const SingleProduct = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track selected image index

  const handleChatClick = (contact) => {
    window.open(`https://wa.me/${contact}`, "_blank");
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await dispatch(getSingleProduct(id));
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '1.5rem 10%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant='h1' sx={{ fontSize: '2rem', fontWeight: '700' }}>{product.title}</Typography>
          <Typography sx={{ color: 'grey', fontSize: '0.8rem' }}>
            Posted 2 hours ago
          </Typography>
        </Box>
        <Typography variant='h1' sx={{ fontSize: '2rem', fontWeight: '700', color: theme.palette.primary.main }}>
          AED {product.price}
        </Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item lg={8} xs={12} md={6} sm={12}>
          <Box sx={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            
            <img
  key={product.images[selectedImageIndex]}
  src={`https://wv9pfwh9-5002.inc1.devtunnels.ms${product.images[selectedImageIndex].split('\\').join('/')}`}
  alt={product.title}
  style={{ width: '100%', maxHeight: '100%' }}
/>

          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {product.images.map((imageUrl, index) => (
              <Box key={imageUrl} sx={{ mr: 1 }}>
                <img
                  src={`https://wv9pfwh9-5002.inc1.devtunnels.ms${imageUrl.split('\\').join('/')}`}
                  alt={product.title}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer', border: index === selectedImageIndex ? `2px solid ${theme.palette.primary.main}` : 'none' }}
                  onClick={() => handleImageClick(index)}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ padding: '1rem 0rem' }}>
            <CardContent>
              <Typography sx={{ color: 'grey', fontSize: '0.9rem' }}>Posted by: </Typography>
              <Typography variant='h1' sx={{ fontSize: '1.3rem', fontWeight: '700' }}>{product.User.name}</Typography>
              <br />
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  fontSize: "1rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main
                }}
                onClick={() => handleChatClick(product.contact)}
              >
                <MessageIcon />
                Chat with Seller
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Divider />
          <Typography variant="h1" sx={{ fontSize: '1.2rem', fontWeight: '700', color: theme.palette.primary.main, margin: '2rem 0rem' }}>Description</Typography>
          <Typography variant="body2" color="black" sx={{ margin: '2rem 2rem' }} dangerouslySetInnerHTML={{ __html: product.description }} />
          <Divider />
          <Typography variant="h1" sx={{ fontSize: '1.2rem', fontWeight: '700', color: theme.palette.primary.main, margin: '2rem 0rem' }}>Address</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ margin: '2rem 0rem' }}>
            {product.address}
          </Typography>
          <Divider />
          <Typography sx={{ color: 'black', fontSize: "1rem", margin: '2rem 0rem', textTransform: "none" }}>
            Is there any issue?
            <MuiLink

              to="/contact-us"
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
                fontWeight: '600',
                "&:hover": { textDecoration: "none" },
              }}
            >
              Report this ad
            </MuiLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProduct;
