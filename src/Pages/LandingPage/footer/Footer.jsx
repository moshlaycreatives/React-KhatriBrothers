import React from "react";
import "./Footer.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiaTwitterSquare } from "react-icons/lia";
import { FaThreads } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa6";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const currentPath = location.pathname;

  const isHidden =
    currentPath === "/admin-dashboard" ||
    currentPath == "/Instructor-dashboard" ||
    currentPath == "/instructor-dashboard" ||
    currentPath === "/student-dashboard" ||
    currentPath === "/success" ||
    currentPath === "/contact-us" ||
    currentPath === "/email-confirmation" ||

    currentPath === "/cancel" ||
    currentPath === "/sign-up" ||
    currentPath === "/sign-in" ||
    currentPath === "/forget-password" ||
    currentPath === "/otp-verification" ||
    currentPath === "/set-password";

  if (isHidden) {
    return null;
  }

  return (
    <footer className="footer-section">
      <div className="footer-main-div">
        <div className="footer-logo-text">

          <br />
          <Box>
            <img src="/khatrilogoblack.svg" style={{ width: isSmall ? '100%' : "50%" }} />
          </Box>
          <br />
          <p>
            Welcome to Khatri Brothers Academy, where the beauty of music meets
            tradition. Our goal is to create a vibrant musical community in
            India and across the world where students of all ages and backgrounds can explore their
            musical potential. Begin your journey to mastering music here.
          </p>
        </div>
        <div className="footer-quick-links">
          <h2>Quick Links</h2>
          <ul className="footer-links">
            <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Home
            </li>
            <li onClick={() => navigate("/about-us")} style={{ cursor: "pointer" }}>
              About Us
            </li>
            <li onClick={() => navigate("/faqs")} style={{ cursor: "pointer" }}>
              FAQ's
            </li>
            <li onClick={() => navigate("/blogs")} style={{ cursor: "pointer" }}>
              Blog
            </li>
            <li onClick={() => navigate("/contact-us")} style={{ cursor: "pointer" }}>
              Contact
            </li>
          </ul>
        </div>
        <div className="footer-contact-info">
          <h3>Contact Us</h3>
          <div className="footer-contact-info-links">
            <a
            // href="https://www.google.com/maps/place/Dehli,+India"

            // target="_blank" rel="noopener noreferrer"
            >
              <i style={{ alignItems: 'center' }}>
                <IoLocationOutline style={{ marginRight: '0.5rem' }} />
                Dehli, India
              </i>
            </a>
            <a href="mailto:Khatribrothersacademy@gmail.com" target="_blank" rel="noopener noreferrer">
              <i style={{ alignItems: 'center', }}>
                <MdOutlineEmail style={{ marginRight: '0.5rem' }} /> Khatribrothersacademy@gmail.com
              </i>
            </a>
            {/* <a href="tel:+923076589234" target="_blank" rel="noopener noreferrer">
              <i>
                <FaPhoneVolume /> +923076589234
              </i>
            </a> */}
            <a href="https://wa.me/917897329508" target="_blank" rel="noopener noreferrer">
              <i style={{ alignItems: 'center', display: 'flex' }}>
                <FaWhatsapp style={{ fontSize: '1.4rem', marginRight: '0.5rem' }} />  +917897329508
              </i>
            </a>
          </div>
          <div className="footer-social-btn">

            <a style={{ color: 'white' }} href="https://youtube.com/@anmolkhatrimusic?si=h4RvROE3sbhMM3_3" target="_blank" rel="noopener noreferrer" className="footer-social-links">
              <FaYoutube />
            </a>
            <a style={{ color: 'white' }} href="https://youtube.com/@anmolkhatrimusic?si=h4RvROE3sbhMM3_3" target="_blank" rel="noopener noreferrer" className="footer-social-links">
              <AiOutlineFacebook />
            </a>
            <a style={{ color: 'white' }} href="https://youtube.com/@anmolkhatrimusic?si=h4RvROE3sbhMM3_3" target="_blank" rel="noopener noreferrer" className="footer-social-links">
              <FaInstagram />
            </a>
            <a style={{ color: 'white' }} href="https://youtube.com/@anmolkhatrimusic?si=h4RvROE3sbhMM3_3" target="_blank" rel="noopener noreferrer" className="footer-social-links">
              <LiaTwitterSquare />
            </a>

          </div>
        </div>
      </div>
      <div className="footer-horizntal-line">
        <hr />
      </div>
      <p className="footer-term-condition">
        © Terms of Use | Privacy Policy | © 2024 Khatri Brothers Academy
      </p>
    </footer>
  );
}

export default Footer;
