import React from 'react'
import "./About.css"
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'

function About() {
  const theme = useTheme()
const navigate = useNavigate()
  const handleAbout = ()=>{
navigate('about-us')
}
  return (
    <>
    <section className='home-about-section'>
    <Typography sx={{fontWeight:'600', fontSize:'2.5rem', color:theme.palette.primary.main}}>About Us</Typography>
    <div className='home-about-image-text'>
        <div className='home-about-image-main-div'>
            <img src="./assets/about/tabla.png" alt="" />
            <div  className=' home-about-inner-div'>
                <img src="./assets/about/home_about.png" alt=""  />
            </div>
        </div>
        <div className='home-about-text'>
            {/* <h2>Who We Are</h2> */}
            <p>Khatri Brothers Academy was founded by Anmol and Shivam Khatri, the Top 6 contestants of SA RE GA MA PA Li’l Champs 2011, Anmol and Shivam, as the academy's creative directors and principal vocal instructors, bring their firsthand experience and youthful energy to the table. They understand the aspirations of aspiring musicians and can guide them effectively. and is committed to promoting and preserving India’s rich musical heritage.
            <br/>
            <br/>
            They encourage the real Indian music culture in the country. They have professionals who offer training in various Indian vocal genres, including Hindustani classical, Bhajan, Ghazals, Bollywood music, etc. They present the country at different stages and win a lot of awards in the music industry. They built self-confidence, stage presence, self-discipline, music appreciation, and performance skills crucial to being a self-oriented musician.</p>
            {/* <button>learn more <i class="fa-solid fa-arrow-right-long"></i></button> */}

            <Box sx={{fontSize:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Button variant='contained' sx={{fontSize:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}} onClick={handleAbout}>Learn More</Button>

            </Box>

             </div>
        <div className='home-about-image-main-div'>
            <img src="./assets/about/tabla.png" alt="" />
            <div  className=' home-about-inner-div'>
                <img src="/Pic2.jpg" alt="no Image"  />
            </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default About