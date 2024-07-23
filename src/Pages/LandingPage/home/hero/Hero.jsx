import React from 'react'
import "./Hero.css"
import Navbar from '../../navbar/Navbar'
import { Button, Typography } from '@mui/material'

function Hero() {
  return (
    <>
    <section className='hero-section'>
        {/* <Navbar/> */}
        <div className='hero-section-text'>

<Typography sx={{color:'white', fontSize:'3rem', fontWeight:'500'}}>
  Music For <br/> Everyone
</Typography>


            {/* <h1>Music <samp className='hero-section-text-spam' >For</samp> Everyone</h1> */}
            <Button variant='contained' sx={{borderRadius:'0px', fontSize:'1rem', textTransform:'none'}}>Start learning</Button>
        </div>
    </section>
    </>
  )
}

export default Hero