import { Box, Button, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { EnrollCustomer } from '../../store/actions/authActions';
import Page from '../../components/page/page';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Please wait while your enrollment is in process. It will take few seconds. Don't change the screen.");
  const [error, setError] = useState('');
  const enrollCustomer = localStorage.getItem('paymentId2');
  const Installment = localStorage.getItem('installment');
  const classType = localStorage.getItem('classType');
  const currency = localStorage.getItem('currency');
  const amount = localStorage.getItem('price');

  const enroll = async () => {
    try {

      await dispatch(EnrollCustomer(enrollCustomer, Installment, classType, currency, amount))
      localStorage.removeItem('paymentId2');
      localStorage.removeItem('installment');
      localStorage.removeItem('classType');
      localStorage.removeItem('currency');
      localStorage.removeItem('price');


      setLoading(false);
      setMessage('Your enrollment has been successfully completed');


    } catch (err) {

      setLoading(false);
      setError('There was an error processing your enrollment. Please try again later.');
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && enrollCustomer) {
      enroll();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [dispatch, enrollCustomer]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
        <CircularProgress />
        <Typography sx={{ marginTop: '1rem', textAlign: 'center', fontSize:'1.5rem', fontWeight:600 }}>{message}</Typography>
      </Box>
    );
  }

  return (
    <Page title= 'Payment successfull'>
      <Box sx={{ display: 'flex',textAlign:'center', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
      <Box sx={{ width: '20%' }}>
        <img src='/Green_tick.svg' alt='Success' width={'100%'} />
      </Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>{message}</Typography>
      {/* {error && <Typography sx={{ color: 'red', marginTop: '1rem' }}>{error}</Typography>} */}
      <br />
      <Button variant='contained' sx={{ textTransform: 'none', borderRadius: '0px', padding: '0.7rem 3rem' }} onClick={() => navigate('/')}>
        Go back to Website
      </Button>
    </Box>
    </Page>
  );
};

export default PaymentSuccess;
