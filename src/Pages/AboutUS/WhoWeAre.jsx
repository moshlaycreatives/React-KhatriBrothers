import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const WhoWeAre = () => {
  return (
    <>

<Box sx={{padding:'2rem 10%'}}>
<Grid container spacing={5}>

<Grid item lg={6} md={6} sm={12} xs={12} >
<Box height={'70vh'}>
    <img src='./assets/about/home_about.png' alt='About us page' width={'100%'} height={'100%'}/>
</Box>


</Grid>




<Grid item lg={6} md={6} sm={12} xs={12} >

<Box>
    <Typography sx={{fontWeight:'600', fontSize:'2rem'}}>Who We Are</Typography>
<Box sx={{color:'grey', textAlign:'justify'}}>
<br/>
<Typography sx={{marginBottom:'1rem'}}>Khatri brothers Academy is dedicated to the cause of promoting and preserving India’s rich music and culture. Anmol khatri, Shivam khatri (Khatri brothers) and Shyamal Patel are the founder, creative director, and principal vocal instructor of Khatri Brothers Academy of Music.
    The Academy teaches many genres of Indian vocal music such as Hindustani classical,Bhajans, Ghazals, Old and New Bollywood music.</Typography>

    <Typography sx={{marginBottom:'1rem'}}>At Khatri Brothers Academy of Music, your training includes: swara gyaan, taal, ucchaar, bhaav, alankaars, raagas, taan and aalaap, bandish, microphone technique, building self confidence, stage presence, self discipline, appreciating music, and an ability to perform for an audience.</Typography>

<Typography sx={{marginBottom:'1rem'}}>There are classes offered for beginner, intermediate, advanced students.</Typography>

<Typography >
We are proud to say that, We offer Private one to one lessons, because we are committed to deliver quality to all students. Further, there are classes offered based on genre including: Hindustani classical, Bhajans, Ghazals and Bollywood songs
</Typography>

</Box>
</Box>

</Grid>



</Grid>

</Box>


    </>
  )
}

export default WhoWeAre