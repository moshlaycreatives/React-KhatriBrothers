import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 import "./Student_testimonials.css"
import { getPublicTestimonial } from "../../../../store/actions/courseActions";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

function Student_testimonials() {

  const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";
  const dispatch = useDispatch();
  const [publicTestimonial, setPublicTestimonial] = useState([])

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getPublicTestimonial());
        setPublicTestimonial(res.data.data);
        console.log(' public testtimonial  data:', res. data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [dispatch]);




console.log(publicTestimonial, 'public testimonials')

  return (
    <>
  <section className="student-testinomials">
    <h1>Student Testimonials</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at sunt laboriosam temporibus aspernatur fugiat harum deleniti consectetur consequatur exercitationem?</p>
  </section>
  <div className="slider-container">
      <Slider  {...settings}>
        {publicTestimonial.map((row)=>(
           <div key={row._id}>
            {/* <TY></TY> */}
           <img
           width='300rem'
           src={`${base}${row.video.replace(/ /g, "%20")}`}
           alt="Testimonial 1" />

{/* <Typography sx={{marginTop:'-3rem', zIndex:'9999999'}}>{row.stuName}</Typography> */}



         </div>
        ))}

        {/* <div>
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
        </div> */}
      </Slider>
    </div>

    </>
  )
}

export default Student_testimonials