// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import "./Student_testimonials.css";
// import { getPublicTestimonial } from "../../../../store/actions/courseActions";
// import { useDispatch } from "react-redux";
// import { Typography } from "@mui/material";

// function Student_testimonials() {
//   const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";
//   const dispatch = useDispatch();
//   const [publicTestimonial, setPublicTestimonial] = useState([]);

//   // var settings = {
//   //   className: "center",
//   //   centerMode: true,
//   //   autoplay: true,
//   //   infinite: true,
//   //   centerPadding: "0px",
//   //   slidesToShow: 3,
//   //   speed: 800,
//   //   autoplaySpeed: 2000,
//   //   dots: true,
//   //   responsive: [
//   //     {
//   //       breakpoint: 1024, // For tablets and medium screens
//   //       settings: {
//   //         slidesToShow: 2,
//   //         centerMode: false,
//   //       },
//   //     },
//   //     {
//   //       breakpoint: 768, // For small screens (mobile)
//   //       settings: {
//   //         slidesToShow: 1,
//   //         centerMode: false,
//   //         arrows: false, // Optional: Hide arrows for better mobile experience
//   //       },
//   //     },
//   //   ],
//   // };


//   var settings = {
//     dots: true,
//     initialSlide: 0,
// delay:2000,
//         className: "center",
//     // centerMode: true,
//     autoplay: true,
//     infinite: true,
//     centerPadding: "0px",
//     slidesToShow: 3,
//     speed: 800,
//     autoplaySpeed: 2000,
//     dots: true,





//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await dispatch(getPublicTestimonial());
//         setPublicTestimonial(res.data.data);
//         console.log("public testimonials data:", res.data);
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   console.log(publicTestimonial, "public testimonials");

//   return (
//     <>
//        <section className="student-testinomials">
//     <h1>Student Testimonials</h1>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at sunt laboriosam temporibus aspernatur fugiat harum deleniti consectetur consequatur exercitationem?</p>
//   </section>
//       <div className="slider-container">
//         <Slider {...settings}>
//           {publicTestimonial.map((row) => (
//             <div key={row._id} className="testimonial-slide" style={{height:'500vh'}}>
//               <img
//                 width="400rem"
//                 height='300vh'
//                 src={`${base}${row.video.replace(/ /g, "%20")}`}
//                 alt="Testimonial"
//               />
//               <Typography
//                 sx={{
//                   marginTop: "-3rem",
//                   marginLeft: "5rem",
//                   color: "white",
//                   fontSize:'1.2rem',
//                   zIndex: "9999999",
//                 }}
//               >
//                 {row.stuName}
//               </Typography>

//               <Typography
//                 sx={{
//                   marginTop: "3rem",
//                   marginLeft: "5rem",
//                   color: "white",
//                   fontSize:'1.2rem',
//                   zIndex: "9999999",
//                 }}
//               >
//                 {row.stuName}
//               </Typography>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// }

// export default Student_testimonials;





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

{publicTestimonial.length === 0 ? (
  <>

  </>
):(
  <>

  <section className="student-testinomials">
    <h1>Student Testimonials</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at sunt laboriosam temporibus aspernatur fugiat harum deleniti consectetur consequatur exercitationem?</p>
  </section>
  <div className="slider-container">
      <Slider  {...settings}>
        {publicTestimonial.map((row)=>(
           <div key={row._id}>

           <img
           width='300rem'
           height='250vh'
           src={`${base}${row.video.replace(/ /g, "%20")}`}
           alt="Testimonial 1" />

{/* <Typography sx={{marginTop:'-3rem', marginLeft:'4rem', color:'white', zIndex:'9999999'}}>{row.stuName}</Typography> */}



         </div>
        ))}


      </Slider>
    </div>

  </>
)}









    </>
  )
}

export default Student_testimonials