
import React, { useState, useEffect } from 'react'
import { assets, projectsData } from '../assets/assets'
import { motion } from "motion/react"
import { toast } from 'react-toastify' // ✅ Toast notification import kiya

const AllProjects = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [showAll, setShowAll] = useState(false);
  
  // Property Selection State
  const [selectedProject, setSelectedProject] = useState(null);

  // ✅ NEW STATE: Contact Form dikhane ke liye
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const filtered = projectsData.filter((project) => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery]);

  // ✅ FUNCTION: Form Submit Handle karne ke liye
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Page reload hone se rokega
    toast.success("Enquiry Sent! Agent will call you soon."); // Success Message
    setShowContactForm(false); // Form band kar do
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full' id="AllProjects">
      
      {/* ----------------- VIEW 1: DETAILED VIEW ----------------- */}
      {selectedProject ? (
        <div className='flex flex-col items-center relative'>
            
            {/* Back Button */}
            <div className='w-full flex justify-end mb-6'>
                <button 
                    onClick={() => {
                        setSelectedProject(null)
                        setShowContactForm(false) // Project band hone par form bhi band ho jaye
                    }} 
                    className='p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-600'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Project Details Card */}
            <div className='w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row'>
                
                {/* Image */}
                <div className='w-full md:w-1/2'>
                    <img src={selectedProject.image} alt={selectedProject.title} className='w-full h-full object-cover min-h-[300px]'/>
                </div>

                {/* Content */}
                <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-4'>{selectedProject.title}</h2>
                    
                    <div className='flex items-center gap-2 mb-6 text-gray-600'>
                        <span>📍</span>
                        <p className='text-lg'>{selectedProject.location}</p>
                    </div>

                    <div className='text-2xl font-semibold text-blue-600 mb-6'>
                        {selectedProject.price}
                    </div>

                    <p className='text-gray-500 leading-relaxed mb-8'>
                        Experience the epitome of luxury living with this stunning property. 
                        Designed with modern architecture and premium amenities.
                    </p>

                    <div className='flex gap-4'>
                        <button className='flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition'>Book Now</button>
                        
                        {/* ✅ CONTACT AGENT BUTTON */}
                        <button 
                            onClick={() => setShowContactForm(true)}
                            className='flex-1 border border-blue-600 text-blue-600 py-3 rounded hover:bg-blue-50 transition'
                        >
                            Contact Agent
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ CONTACT FORM POPUP (MODAL) */}
            {/* Ye sirf tab dikhega jab showContactForm true ho */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <motion.div 
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative"
                    >
                        {/* Form Header */}
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-xl font-bold text-gray-800">Contact Agent</h3>
                            {/* Close Form Button */}
                            <button onClick={() => setShowContactForm(false)} className="text-gray-500 hover:text-red-500">
                                ✖
                            </button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-4">Enquiring about: <span className="font-semibold text-blue-600">{selectedProject.title}</span></p>

                        {/* Form Inputs */}
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                            <input type="text" placeholder="Your Name" required className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="email" placeholder="Your Email" required className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="tel" placeholder="Phone Number" required className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <textarea placeholder="Message (e.g., I'm interested in this property...)" rows="3" className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                            
                            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                                Send Enquiry
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>
      ) : (
        /* ----------------- VIEW 2: GRID VIEW ----------------- */
        <>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>All <span className='underline underline-offset-4 decoration-1 under'>Properties</span></h1>
            <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Find your dream space from our exclusive collection.</p>

            {/* Search Bar */}
            <div className='flex justify-center mb-10'>
                <div className='flex w-full max-w-md border border-gray-300 rounded-full overflow-hidden px-4 py-2 items-center bg-white shadow-sm'>
                    <input 
                        type="text" 
                        placeholder="Search by Title or Location" 
                        className='w-full outline-none text-gray-700 ml-2'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="text-gray-400">🔍</span>
                </div>
            </div>

            {/* Grid Layout */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, showAll ? filteredProjects.length : 4).map((project, index) => (
                    <motion.div 
                        layout 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        key={index} 
                        className='relative flex flex-col shadow-lg rounded-lg overflow-hidden group border border-gray-100'
                    >
                        <div className="overflow-hidden">
                            <img src={project.image} alt={project.title} className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'/>
                        </div>
                        
                        <div className='p-4 bg-white'>
                            <h2 className='text-xl font-bold text-gray-800 mb-2'>{project.title}</h2>
                            <p className='text-gray-500 text-sm mb-2 flex items-center gap-2'>
                                {project.location}
                            </p>
                            <div className='flex justify-between items-center mt-3'>
                                <span className='font-semibold text-blue-600'>{project.price}</span>
                                
                                <button 
                                    onClick={() => setSelectedProject(project)}
                                    className='bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition'
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                    ))
                ) : (
                    <div className='col-span-full text-center py-10'>
                        <p className='text-gray-500 text-lg'>No properties found matching "{searchQuery}"</p>
                        <button onClick={()=>setSearchQuery('')} className='text-blue-500 underline mt-2'>Clear Search</button>
                    </div>
                )
                }
            </div>

            {/* Show More Button */}
            {filteredProjects.length > 4 && (
                <div className='flex justify-center mt-10'>
                    <button 
                        onClick={() => setShowAll(!showAll)} 
                        className='px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300'
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
            )}
        </>
      )}

    </motion.div>
  )
}

export default AllProjects;