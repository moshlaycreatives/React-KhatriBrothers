import React, { useState } from 'react'
import "./Navbar.css"
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function Navbar() {
  
  const[isMobileScreen,setIsMobileScreen] = useState(true );

  return (
    <>
    <nav>
        <h1 className='logo'>logo</h1>
        <div className={isMobileScreen ? 'nav-links' : "nav-links-mobile"}>
            <li>Home</li>
            <li>Courses</li>
            <li>About</li>
            <li>Faq's</li>
            <li>Blogs</li>
            <li>Contact</li>
        </div>
        <button className='nav-get-startd'>Get Started</button>
       <button className='navbar-mobile-btn'  onClick={()=>setIsMobileScreen(prev => !prev)}>
       {isMobileScreen ?
        (
        <FaBarsStaggered className='bars-icone' />
      ) :
        (
          <FaTimes className='times-icone'/>
        )}
       </button>
        
    </nav>
    </>
  )
}

export default Navbar