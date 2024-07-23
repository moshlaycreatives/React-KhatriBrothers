import React from 'react'
import "./Footer.css"
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import {Link} from "react-router-dom" 
import { LiaTwitterSquare } from "react-icons/lia";
import { FaThreads } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";


function Footer() {
  return (
    <footer className='footer-section'>
        <div className='footer-main-div'>
        <div className='footer-logo-text'>
            <h1>Logo</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit corporis nobis accusamus, voluptatem minus et sint. Totam, incidunt doloribus. Modi omnis vel ea quae minima porro deserunt, atque molestiae sequi.</p>
        </div>
        <div className='footer-quick-links'>
            <h2>Quick Links</h2>
            <ul className='footer-links'>
                <li>Home</li>
                <li>Advance Level</li>
                <li>Beginner Level</li>
                <li>About Us</li>
                <li>Faq's</li>
                <li>Blog</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='footer-contact-info'>
            <h3>Contact US</h3>
            <div className='footer-contact-info-links'>
            <Link> <i>   <IoLocationOutline />Johar Town,Lahore</i></Link>
            <Link> <i>   <MdOutlineEmail /> abc@gmail.com</i></Link>
            <Link> <i>   <FaPhoneVolume /> +923076589234</i></Link>
            </div>
            <div className='footer-social-btn'>
            <AiOutlineFacebook  className='footer-social-links'/>
            <FaInstagram  className='footer-social-links' />
            <LiaTwitterSquare className='footer-social-links' />
            <FaThreads  className='footer-social-links' />
            </div>
        </div>
        </div>
            <div className='footer-horizntal-line'>
                <hr />
            </div>
            <p className='footer-term-condition'>© Terms of Use | Privacy Policy | © 2024 Khatri Brothers Academy</p>
    </footer>
  )
}

export default Footer