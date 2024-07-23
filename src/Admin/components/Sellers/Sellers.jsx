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

const Sellers = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [open, setOpen] = React.useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [updateData, setUpdateData] = useState()
  const [authors, setAuthors] = useState([])
  const dispatch = useDispatch()

  const getAllSellers = async () => {
    dispatch(getSellers()).then((res) => {
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
    dispatch(deleteSeller(val.id)).then((res) => {
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
          All Registered Sellers
        </Typography>

      </Box>
      <Grid container spacing={4}>
      {authors.map((val, index) => (
          <Grid item key={index} xs={12} md={6} lg={6}>
            <Card>
              <CardContent>

                <Typography variant="h4" mt={2} fontWeight="bold">
                   {val.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                   Email : {val.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  State : {val.state}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Community : {val.community}
                </Typography>
                {/* <Divider sx={{ my: 2 }} /> */}

                {/* <Button variant="contained" color="error"
                  onClick={() => handleDelete(val)}
                >
                  Delete
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default Sellers;
