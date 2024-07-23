import React, { Component } from "react";
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 import "./Student_testimonials.css"

function Student_testimonials() {

  const settings = {
    className: "center",
    centerMode: true,
    autoplay: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 800,
    autoplaySpeed: 1000,
    dots:true
  };








  return (
    <>
  <section className="student-testinomials">
    <h1>Student Testimonials</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at sunt laboriosam temporibus aspernatur fugiat harum deleniti consectetur consequatur exercitationem?</p>
  </section>
  <div className="slider-container">
      <Slider  {...settings}>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 1" />
        </div>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 2" />
        </div>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 3" />
        </div>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 4" />
        </div>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 5" />
        </div>
        <div>
          <img src="assets/student_testimonial/test_1.png" alt="Testimonial 6" />
        </div>
      </Slider>
    </div>

    </>
  )
}

export default Student_testimonials