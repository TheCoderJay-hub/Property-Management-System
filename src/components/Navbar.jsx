

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // Link import kiya
import { assets } from '../assets/assets' // Assets import zaroori hai

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Scroll lock logic for mobile menu
  useEffect(() => {
    if(showMobileMenu){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  },[showMobileMenu])

  return (
    <div className='absolute top-0 left-0 w-full z-10'>
        <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
            
            {/* Logo: Click karne par Home page par le jayega */}
            <Link to="/">
              <img src={assets.logo} alt="Logo" className="w-28 cursor-pointer"/>
            </Link>

            {/* --- DESKTOP MENU LINKS --- */}
            <ul className='hidden md:flex gap-7 text-white'>
              
              {/* 1. Home: Link to="/" use kiya taki kisi bhi page se wapas aa sakein */}
              <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
              
              {/* 2. About: Ye Home page ka section hai, isliye anchor tag theek hai */}
              <a href="#About" className='cursor-pointer hover:text-gray-400'>About</a>
              
              {/* ✅ 3. PROJECTS: Ye ab NAYE PAGE par le jayega */}
              <Link to="/projects" className='cursor-pointer hover:text-gray-400'>Projects</Link>
              
              {/* 4. Testimonials: Ye bhi Home page ka section hai */}
              <a href="#Testimonials" className='cursor-pointer hover:text-gray-400'>Testimonials</a>
            </ul>

            {/* Right Side Buttons */}
            <div className='hidden md:flex items-center gap-4'>
                <Link 
                  to="/login"
                  className='cursor-pointer hover:text-gray-400 font-medium text-white'>
                  Login
                </Link>

                <Link
                  to="/signup"
                  className='bg-white px-8 py-2 rounded-full text-gray-900 font-semibold hover:bg-gray-200 transition'>
                  Sign up
                </Link>
            </div>

            {/* Mobile Menu Icon */}
            <img onClick={() => setShowMobileMenu(true) } src={assets.menu_icon} className='md:hidden w-7 cursor-pointer' alt="" />
        </div>    

        {/* ---------- MOBILE MENU -------------- */}
        <div className={`md:hidden ${showMobileMenu ? 'fixed w-full' : 'h-0 w-0'}  right-0 top-0 bottom-0 overflow-hidden bg-white transition-all z-50`}>
          <div className='flex justify-end p-6 '>
            <img onClick={() => setShowMobileMenu(false)} src={assets.cross_icon}  className='w-6 cursor-pointer' alt="" />
          </div>
          
          <ul className='flex flex-col items-center gap-2 mt-5 mx-5 text-large font-medium'>
            {/* Mobile Home Link */}
            <Link onClick={() => setShowMobileMenu(false)} to="/" className='px-4 py-2 rounded-full inline-block'>Home</Link>
            
            <a onClick={() => setShowMobileMenu(false)} href="#About" className='px-4 py-2 rounded-full inline-block'>About</a>
            
            {/* ✅ Mobile Projects Link */}
            <Link onClick={() => setShowMobileMenu(false)} to="/projects" className='px-4 py-2 rounded-full inline-block'>Projects</Link>
            
            <a onClick={() => setShowMobileMenu(false)} href="#Testimonials" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
            
            <Link 
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              className='px-4 py-2 rounded-full inline-block text-gray-700 hover:text-black'>
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setShowMobileMenu(false)}
              className='px-4 py-2 rounded-full inline-block bg-gray-100'>
              Sign up
            </Link>
          </ul>
        </div>
    </div>
  )
}

export default Navbar;