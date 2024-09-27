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
            <h3>Khatri Brothers Academy</h3>
            <h1>Our Mission</h1>
            <p>Our mission is to create a vibrant musical community in India where students of all ages and backgrounds can explore their musical potential, we are fostering a love for all genres and encouraging the future stars of Indian music. <br/><br /> We offer learners international standards to make learning music convenient and easy. Our academy provides an opportunity to present the country at different stages and achieve milestones in the music industry.</p>
        </div>
        <div className=' our-mission-image'>
           <div className='our_mission_image-1'>
           <img src="./assets/our_mission/our_mission_2.png" alt="" />
           <img src="KeyboardCourse.jpg" alt="" className='image22'/>
           </div>
           <div className='our_mission_image-2'>
            <img src="/GuitarCourse.jpg" alt="" className='image33' />
            <img src="./assets/our_mission/our_mission_4.png" alt="" />
            </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default Our_mission