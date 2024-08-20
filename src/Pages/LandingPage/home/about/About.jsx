import React from 'react'
import "./About.css"
import { Button, Typography, useTheme } from '@mui/material'
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
            <h2>Who We Are</h2>
            <p>Lorem ipsum dolor nihil. Tempore libero expedita esse, alias voluptas deleniti velit consequatur mollitia voluptatibus nesciunt non veniam quis voluptates cum dicta modi natus laboriosam enim ipsam! Sequi exercitationem veniam quibusdam culpa molestiae pariatur quod iusto, aliquid dicta, animi dignissimos dolorum nemo, nobis nihil. Nesciunt sunt nam aliquam quae ipsa, cum placeat eveniet laborum facilis. Corporis iusto sunt perferendis voluptatibus animi assumenda corrupti accusamus ducimus officia impedit quas vitae repellendus quo ex
            <br/>
            <br/>
            temporibus quasi necessitatibus nulla, beatae dolore autem qui laborum. Quis repudiandae voluptas ab? Voluptas expedita consequuntur illo harum eaque architecto deserunt molestiae ipsum enim provident cum recusandae, odio ab natus, ullam aliquid quisquam officia iusto reiciendis sunt excepturi, illum quia fuga! Quidem dolorum fuga non accusamus unde, beatae voluptas. Sit iusto f</p>
            {/* <button>learn more <i class="fa-solid fa-arrow-right-long"></i></button> */}
            <Button variant='contained' sx={{fontSize:'0.5rem'}} onClick={handleAbout}>Learn More</Button>
        </div>
    </div>
    </section>
    </>
  )
}

export default About