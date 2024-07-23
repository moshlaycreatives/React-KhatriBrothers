import React from 'react' 
import "./Beginner_course.css"

function Beginner_course_card({image , description}) {
  return (
    <div className='beginner-course-card'>
    <img className='beginner-image-card-image' src={image} alt="Course" />
    <h3>{description}</h3>
    <button>Learn more <i class="fa-solid fa-arrow-right-long"></i></button>
  </div>
  )
}

export default Beginner_course_card