import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const PaymentCancel = () => {
    const navigate = useNavigate()
  return (
    <>

<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>

<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
<Box sx={{width:'40%'}}>

<img src='/cross.png' alt='Success' width={'100%'}/>

</Box>

    <Typography sx={{fontSize:'2rem', fontWeight:'800'}}>Payment Cancelled</Typography>

<br/>
<Button variant='contained' sx={{textTransform:'none', borderRadius:'0px', padding:'0.7rem 3rem'}} onClick={()=>navigate('/')}> Go back to Webiste </Button>

</Box>

</Box>






    </>
  )
}

export default PaymentCancel