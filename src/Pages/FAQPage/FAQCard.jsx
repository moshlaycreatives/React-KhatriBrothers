import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

const FAQCard = () => {
    const theme = useTheme()

    const faqs = [
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },{
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
        {
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },{
            title:'Lorem ipsum dolor sit amet, consect etur?',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iure dolorem non iste ex unde ad consectetur eius laboriosam iusto, voluptas libero, deserunt molestias voluptatibus placeat doloremque ducimus. Soluta, quas?'
        },
    ]
  return (
    <>

<Box sx={{padding:'2rem 10%'}}>

<Grid container spacing={5}>


{faqs.map((val, ind)=>(

    <Grid item lg={6} md={6} sm={12} xs={12} key={ind}>

<Box sx={{border:'2px solid #911953', padding:'1rem 2rem'}}>

<Typography sx={{color:theme.palette.primary.main, fontWeight:'600', fontSize:'1.2rem'}}>
{val.title}
</Typography>

<Typography>

{val.desc}
</Typography>



</Box>

</Grid>
))}



</Grid>



</Box>



    </>
  )
}

export default FAQCard