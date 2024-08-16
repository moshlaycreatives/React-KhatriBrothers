// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import { EnrollCustomer } from "../../store/actions/authActions";

// const PaymentSuccess = () => {
//   const dispatch = useDispatch();

//   const enrollCustomer = localStorage.getItem("paymentId2");
//   const Installment = localStorage.getItem("installment");
//   const classType = localStorage.getItem("classType");

//   useEffect(() => {
//     dispatch(EnrollCustomer(enrollCustomer, Installment, classType));
//   }, [""]);
//   const navigate = useNavigate();
//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "90vh",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Box sx={{ width: "20%" }}>
//             <img src="/Green_tick.svg" alt="Success" width={"100%"} />
//           </Box>

//           <Typography sx={{ fontSize: "2rem", fontWeight: "800" }}>
//             Payment Successful
//           </Typography>

//           <br />
//           <Button
//             variant="contained"
//             sx={{
//               textTransform: "none",
//               borderRadius: "0px",
//               padding: "0.7rem 3rem",
//             }}
//             onClick={() => navigate("/")}
//           >
//             {" "}
//             Go back to Webiste{" "}
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default PaymentSuccess;




import { Box, Button, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { EnrollCustomer } from '../../store/actions/authActions';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Please wait while your enrollment is in process. It will take 10 seconds. Don't change the screen.");
  const [error, setError] = useState('');

  const enrollCustomer = localStorage.getItem('paymentId2');
  const Installment = localStorage.getItem('installment');
  const classType = localStorage.getItem('classType');

  useEffect(() => {
    const enroll = async () => {
      try {
        // Dispatch the action and wait for the result
        await dispatch(EnrollCustomer(enrollCustomer, Installment, classType));

        // On success, remove data from localStorage
        localStorage.removeItem('paymentId2');
        localStorage.removeItem('installment');
        localStorage.removeItem('classType');

        // Update the state to hide the loader and message
        setLoading(false);
        setMessage('Your enrollment was successful!');
      } catch (err) {
        // Handle the error case
        setLoading(false);
        setError('There was an error processing your enrollment. Please try again later.');
      }
    };

    enroll();
  }, [dispatch, enrollCustomer, Installment, classType]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
        <CircularProgress />
        <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>{message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex',textAlign:'center', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
      <Box sx={{ width: '20%' }}>
        <img src='/Green_tick.svg' alt='Success' width={'100%'} />
      </Box>
      <Typography sx={{ fontSize: '2rem', fontWeight: '800' }}>{message}</Typography>
      {error && <Typography sx={{ color: 'red', marginTop: '1rem' }}>{error}</Typography>}
      <br />
      <Button variant='contained' sx={{ textTransform: 'none', borderRadius: '0px', padding: '0.7rem 3rem' }} onClick={() => navigate('/')}>
        Go back to Website
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
