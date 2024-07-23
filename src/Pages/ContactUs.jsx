import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Page from '../components/page'
const ContactUs = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
      },[])
      const theme = useTheme()

  return (
    <>

<Page title="Contact us">


<Box sx={{padding:'1rem 10%'}}>


<Box sx={{padding:'5rem 4rem', backgroundColor:theme.palette.primary.main}}>

<Grid container spacing={4} sx={{backgroundColor:'white'}}>
<Grid item lg={6} md={6} sm={12} xs={12}>
<Box sx={{display:'flex', justifyContent:'space-between', alignItems:'start', flexDirection:'column'}}>
<Typography sx={{color:theme.palette.primary.main, fontWeight:600, fontSize:'3rem'}}>Contact</Typography>
<br/>
<br/>
<br/>
<br/>
<br/>
<Typography color={'grey'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos temporibus sint aut debitis cupiditate quidem obcaecati soluta veniam nemo, laborum odio ipsum beatae ipsam impedit asperiores ea amet facere aspernatur?</Typography>
<br/>
<br/>
<br/>
<br/>
<br/>

<Typography sx={{ fontWeight:600, fontSize:'3rem'}}>Logo</Typography>


</Box>

</Grid>




<Grid item lg={6} md={12} sm={12} xs={12}>

<Box>
  <Typography sx={{fontWeight:'600', fontSize:'1.5rem'}}>Enter Details</Typography>
<Typography>Name*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Name'/>

<br/>
<br/>

<Typography>Email*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Email'/>


  <br/>
<br/>

<Typography>Phone*</Typography>
  <TextField size='small' fullWidth placeholder='Enter Your Phone'/>



  <br/>
<br/>

<Typography>How Can We Help You*</Typography>
  <TextField size='small' fullWidth placeholder='Type...' multiline rows={5}/>

</Box>

<br/>
<br/>
<br/>
<br/>

<Button variant='contained' sx={{borderRadius:'0px', textTransform:'none'}}>

Submit Now

</Button>

<br/>
<br/>
<br/>

</Grid>
  </Grid>

</Box>
</Box>


</Page>
    </>
  )
}

export default ContactUs