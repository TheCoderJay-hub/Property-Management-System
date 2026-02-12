
// import React, { useState } from "react";

// import { useNavigate } from 'react-router-dom'

// function LoginForm() {

//   const navigate = useNavigate()

//   const [isLoginMode, setIsLoginMode] = useState(true);

//   return (
//     <div className="flex justify-center items-center px-4 py-10">

//         <div className="w-full sm:w-[28rem] bg-white p-6 rounded-lg shadow-lg absolute" >

//              {/* Close button */}
//             <button
//                 onClick={() => navigate('/')}
//                 className='absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl cursor-pointer'>
//                 ✖
//             </button>

//             {/* header title */}
//             <div className="text-2xl font-semibold text-center mb-6">
//                 {isLoginMode ? "Login" : "Sign Up"}
//             </div>

//             {/* tab control */}
//             <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
//                 <button onClick={() => setIsLoginMode(true)} className ={ `w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black " }`} >
//                     Login
//                 </button>
//                 <button onClick={() => setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black " }`} >
//                     Sign Up
//                 </button>
//                 <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${isLoginMode ? "left-0" : "left-1/2"}`} ></div>
//             </div>

//             {/* form section */}
//             <form className="space-y-4">
//                 {
//                     !isLoginMode && (
//                         <input className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400" type="text" placeholder="Name" required />
//                     )
//                 }

//                 {/* shared form section  */}
//                 <input className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400" type="email" placeholder="Email" required />
//                 <input className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400" type="password" placeholder="Password" required />

//                 {/* signup field  */}
//                 {
//                     !isLoginMode && (
//                         <input className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400" type="password" placeholder="Confirm Password" required />
//                     )
//                 }

//                 {/* forgot password for login  */}
//                 {
//                     isLoginMode && (
//                         <div className="text-right">
//                             <p className="text-cyan-600 cursor-pointer hover:underline">Forget password</p>
//                         </div>
//                     )
//                 }

//                 {/* shared button  */}
//                 <button className="w-full p-3 cursor-pointer bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition ">
//                     {
//                         isLoginMode ? "Login" : "SignUp"
//                     }
//                 </button>
                
//                 {/* switch message  */}
//                 <p className="text-center text-gray-600">
//                     {isLoginMode ? "Don't have an account" : "Already have an account"}
//                     <a onClick={(e) => setIsLoginMode(!isLoginMode)} href="#" className="text-cyan-600 cursor-pointer hover:underline" >{isLoginMode ? " SignUp" : " Login"} </a>
//                 </p>


//             </form>
//         </div>
//     </div>
//   );
// }

// export default LoginForm;







import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// Error fix: Direct CSS import hata diya hai
// import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Logic: Agar URL me 'signup' hai to default mode Signup hoga, nahi to Login
  const [isLoginMode, setIsLoginMode] = useState(true);

  // CSS Injection: Toastify CSS ko dynamically load kar rahe hain taaki build error na aaye
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Jab bhi URL change ho, mode update karein
  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  }, [location.pathname]);

  // --- Form Data State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!isLoginMode) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        newErrors.name = "Name must contain only alphabets";
        isValid = false;
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 10) {
      newErrors.password = "Password must be 6-10 characters long";
      isValid = false;
    }

    if (!isLoginMode) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success(isLoginMode ? "Login Successfully!" : "Signup Successfully!", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000
      });
      console.log("Form Data Submitted:", formData);
    } else {
      toast.error("Please fix the errors below");
    }
  };

  // Jab user toggle kare, to URL bhi change kar do
  const switchMode = (mode) => {
    setIsLoginMode(mode);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    // Optional: URL update karna taaki browser history sahi rahe
    navigate(mode ? '/login' : '/signup');
  };

  return (
    <div className="w-full sm:w-[28rem] bg-white p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
            onClick={() => navigate('/')}
            className='absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl cursor-pointer'>
            ✖
        </button>

        <div className="text-2xl font-semibold text-center mb-6">
            {isLoginMode ? "Login" : "Sign Up"}
        </div>

        <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
            <button type="button" onClick={() => switchMode(true)} className ={ `w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black " }`} >
                Login
            </button>
            <button type="button" onClick={() => switchMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black " }`} >
                Sign Up
            </button>
            <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all duration-300 ${isLoginMode ? "left-0" : "left-1/2"}`} ></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {!isLoginMode && (
                <div>
                    <input 
                        className={`w-full p-3 border-b-2 outline-none focus:border-cyan-500 placeholder-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                        type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
                </div>
            )}

            <div>
                <input 
                    className={`w-full p-3 border-b-2 outline-none focus:border-cyan-500 placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                    type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
            </div>

            <div>
                <input 
                    className={`w-full p-3 border-b-2 outline-none focus:border-cyan-500 placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
                    type="password" name="password" placeholder="Password (6-10 chars)" value={formData.password} onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 text-left">{errors.password}</p>}
            </div>

            {!isLoginMode && (
                <div>
                    <input 
                        className={`w-full p-3 border-b-2 outline-none focus:border-cyan-500 placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} 
                        type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
                    />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 text-left">{errors.confirmPassword}</p>}
                </div>
            )}

            {isLoginMode && (
                <div className="text-right">
                    <p className="text-cyan-600 cursor-pointer hover:underline">Forget password</p>
                </div>
            )}

            <button type="submit" className="w-full p-3 cursor-pointer bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition ">
                { isLoginMode ? "Login" : "SignUp" }
            </button>
            
            <p className="text-center text-gray-600">
                {isLoginMode ? "Don't have an account" : "Already have an account"}
                <span onClick={() => switchMode(!isLoginMode)} className="text-cyan-600 cursor-pointer hover:underline ml-1" >
                    {isLoginMode ? " SignUp" : " Login"} 
                </span>
            </p>
        </form>
    </div>
  );
}

export default LoginForm;