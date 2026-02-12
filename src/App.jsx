

import React from 'react'
import Navbar from './components/Navbar'  // ✅ 1. Isko Uncomment kar diya
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects' // Ye purana Slider wala
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import AllProjects from './components/AllProjects' // ✅ 2. Naya Search Page Import kiya

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

const AppContent = () => {
  const location = useLocation()
  const isSignupPage = location.pathname === '/signup' || location.pathname === '/login'

  return (
    <div className='w-full overflow-hidden relative'>
      <ToastContainer />
      
      {/* Yaha humne Routes lagaya hai.
          Iska matlab: URL ke hisab se decide hoga ki kya dikhana hai.
      */}
      <Routes>

        {/* --- CASE 1: HOME PAGE (/) --- */}
        <Route path="/" element={
          <>
            {/* Navbar yaha 'absolute' hai, to ye Header image ke upar float karega */}
            <Navbar /> 
            <Header />
            <About />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
          </>
        } />

       {/* Route 2: Projects Page */}
        <Route path="/projects" element={
          <>
            {/* 1. HEADER CONTAINER (Fixed) */}
            {/* fixed: Screen par chipka rahega */}
            {/* z-50: Sabse upar dikhega */}
            {/* h-20: Iski height fix kar di */}
            <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 h-20">
              <Navbar />
            </div>
            
            {/* 2. CONTENT ADJUSTMENT */}
            {/* pt-24: Padding Top diya taaki content Fixed Header ke peeche na chupa rahe */}
            <div className="pt-24">
              <AllProjects />
            </div>
            
            <Footer />
          </>
        } />

      </Routes>

      {/* ✅ Show LoginForm only when route is /signup */}
      {isSignupPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <LoginForm />
        </div>
      )}
    </div>
  )
}

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL} >
      <AppContent />
    </Router>
  )
}

export default App;