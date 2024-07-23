import React from 'react'
import "./Our_mission.css"

function Our_mission() {
  return (
    <>
    <section className='our-mission-section'>
      <img className='our-mission-tabla-image-1' src="./assets/our_mission/tabla.png" alt="" />
      <img className='our-mission-tabla-image-2' src="./assets/our_mission/tabla.png" alt="" />
        <div className='our-mission-div'>
        <div className='our-mission-text'>
            <h3>khatri Brothers Academy</h3>
            <h1>Our Mission</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, earum aut sunt nulla quod, Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste reiciendis sint illum, corporis explicabo sequi sapiente nemo ea culpa! nam explicabo quibusdam accusantium nobis eligendi vel odit obcaecati deserunt quasi, perferendis ut dolore. Odit nulla id fugiat ex dolores quaerat ut iusto necessitatibus pariatur ea.  Lorem ipsum dolor sit amet <br/><br />consectetur adipisicing elit. Tempore, molestias beatae. Voluptas vel aut eius! Asperiores voluptate nihil voluptatibus placeat vel fugiat illum consequuntur. Eum excepturi tenetur repellendus itaque qui.</p>
        </div>
        <div className=' our-mission-image'>
           <div className='our_mission_image-1'>
           <img src="./assets/our_mission/our_mission_2.png" alt="" />
           <img src="./assets/our_mission/our_mission_3.png" alt="" />
           </div>
           <div className='our_mission_image-2'>
            <img src="./assets/our_mission/our_mission_1.png" alt="" />
            <img src="./assets/our_mission/our_mission_4.png" alt="" />
            </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default Our_mission