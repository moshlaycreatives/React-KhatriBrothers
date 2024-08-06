import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { EnrollCustomer } from '../../store/actions/authActions'

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  const enrollCustomer=localStorage.getItem('paymentId2')
  const Installment=localStorage.getItem('installment')


  useEffect(()=>{
    dispatch(EnrollCustomer(enrollCustomer, Installment))
  },[''])
    const navigate = useNavigate()
  return (
    <>

<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>

<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
<Box sx={{width:'20%'}}>

<img src='/Green_tick.svg' alt='Success' width={'100%'}/>

</Box>

    <Typography sx={{fontSize:'2rem', fontWeight:'800'}}>Payment Successful</Typography>

<br/>
<Button variant='contained' sx={{textTransform:'none', borderRadius:'0px', padding:'0.7rem 3rem'}} onClick={()=>navigate('/')}> Go back to Webiste </Button>

</Box>



</Box>






    </>
  )
}

export default PaymentSuccess