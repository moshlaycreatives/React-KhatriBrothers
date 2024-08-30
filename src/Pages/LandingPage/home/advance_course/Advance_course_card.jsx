import React from 'react'
import "./Advance_course.css"

function Advance_course_card({image , description}) {
  return (
    <div className='advance-course-card'>
    <img className='advance-image-card-image' src={image} alt="Course" />
    <h3>{description}</h3>
    <button>Start Learning<i class="fa-solid fa-arrow-right-long"></i></button>
  </div>
  )
}

export default Advance_course_card