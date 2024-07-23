import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  Box,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import { Helmet } from 'react-helmet';
import { getSellers } from '../../../store/actions/authActions';
import { deleteProduct, getApprovedProducts } from '../../../store/actions/productActions';

const ApprovedProducts = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [open, setOpen] = React.useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [updateData, setUpdateData] = useState()
  const [authors, setAuthors] = useState([])
  const dispatch = useDispatch()

  const getAllSellers = async () => {
    dispatch(getApprovedProducts()).then((res) => {
      setAuthors(res.data.data)
      // console.log(res.data.payload)
    }).catch((err) => {
      console.error(err);

    });

  }


  useEffect(() => {
    getAllSellers()
  }, [])


  const handleDelete = (val) => {
    dispatch(deleteProduct(val.uid)).then((res) => {
      setAuthors(authors.filter(product => product.uid !== val.uid));
      
      alert(res.data.message)
      getAllSellers()

    }).catch((err) => {
      console.error(err);
    });


  }
  console.log(authors, "++++++")
  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography variant='h2' fontWeight="bold" mb={3} >

Approved Products


       </Typography>

      </Box>
      <Grid container spacing={4}>
      {authors.map((val, index) => (
          <Grid item key={index} xs={12} md={12} lg={12}>
            <Card>
              <CardContent>

              <Box
                  sx={{

                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  {val.images.map(imageUrl => {
                      const imagePath = imageUrl.split('/uploads')[1];
                      return (
                        <img
                          key={imageUrl}
                          src={`https://wv9pfwh9-5002.inc1.devtunnels.ms/uploads/${imagePath}`}
                          alt={val.title}
                          style={{ width:'50%', maxHeight:'100%' }}
                        />
                      );
                    })}

                </Box>
                <Typography variant="h4" mt={2} fontWeight="bold">
                   {val.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                   Description : {val.description}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Contact : {val.contact}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Price : {val.price}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quantity : {val.quantity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Category : {val.PrimaryCategory.title}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Button variant="contained" color="error"
                  onClick={() => handleDelete(val)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default ApprovedProducts
