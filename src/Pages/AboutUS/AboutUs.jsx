import React, { useEffect } from "react";
import Page from "../../components/page";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import AboutSection1 from "./AboutSection1";
import WhoWeAre from "./WhoWeAre";
import CounterCards from "./CounterCards";
import Student_testimonials from "../LandingPage/home/student_testimonials/Student_testimonials";
import Our_mission from "../LandingPage/home/our_mission/Our_mission";
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Page title="About Us">

<AboutSection1/>
<WhoWeAre/>
<CounterCards/>
<Student_testimonials/>
<Our_mission/>


    </Page>
  );
};

export default AboutUs;
