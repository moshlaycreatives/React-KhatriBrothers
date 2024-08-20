// import React, { Component, useEffect, useState } from "react";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import "./Student_testimonials.css";
// import { getPublicTestimonial } from "../../../../store/actions/courseActions";
// import { useDispatch } from "react-redux";
// import { Typography } from "@mui/material";

// function Student_testimonials() {
//   const base = "http://16.171.98.198:4545";
//   const dispatch = useDispatch();
//   const [publicTestimonial, setPublicTestimonial] = useState([]);

//   const settings = {
//     className: "center",
//     centerMode: true,
//     autoplay: true,
//     infinite: true,
//     centerPadding: "0px",
//     slidesToShow: 3,
//     speed: 800,
//     autoplaySpeed: 1000,
//     dots: true,
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await dispatch(getPublicTestimonial());
//         setPublicTestimonial(res.data.data);
//         console.log(" public testtimonial  data:", res.data);
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   console.log(publicTestimonial, "public testimonials");

//   return (
//     <>
//       {publicTestimonial.length === 0 ? (
//         <></>
//       ) : (
//         <>
//           <section className="student-testinomials">
//             <h1>Student Testimonials</h1>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at
//               sunt laboriosam temporibus aspernatur fugiat harum deleniti
//               consectetur consequatur exercitationem?
//             </p>
//           </section>
//           <div className="slider-container">
//             <Slider {...settings}>
//               {publicTestimonial.map((row) => (
//                 <div key={row._id}>
//                   <img
//                     width="300rem"
//                     height="250vh"
//                     src={`${base}${row.video.replace(/ /g, "%20")}`}
//                     alt="Testimonial 1"
//                   />

//                   {/* <video
//     width='300rem'
//     height='250vh'
//     controls
//     src='/rvideo.mp4'
//     // src={`${base}${row.video.replace(/ /g, "%20")}`}
//     alt="Testimonial 1"/> */}

//                   {/* <Typography sx={{marginTop:'-3rem', marginLeft:'4rem', color:'white', zIndex:'9999999'}}>{row.stuName}</Typography> */}
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Student_testimonials;




import React from 'react'

const Student_testimonials = () => {
  return (
    <>

    </>
  )
}

export default Student_testimonials