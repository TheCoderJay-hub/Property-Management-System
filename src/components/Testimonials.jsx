

import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "motion/react"

function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      // CHANGE 1: lg:px-32 ko kam karke lg:px-10 kiya taki cards ko jagah mile
      className='container mx-auto py-16 px-4 md:px-10 lg:px-10 w-full overflow-hidden' 
      id='Testimonials'>
      
      <h1 className='text-3xl sm:text-5xl font-extrabold mb-4 text-center text-gray-800'>
        Customer <span className='underline decoration-4 decoration-red-200 font-light'>Testimonials</span>
      </h1>
      <p className='text-center text-gray-600 mb-16 max-w-lg mx-auto text-lg'>
        Real Stories from Those Who Found Home with Us
      </p>

      {/* CHANGE 2: Flex hata kar Grid lagaya.
          - grid-cols-1: Mobile pe 1 card
          - md:grid-cols-2: Tablet pe 2 cards
          - lg:grid-cols-3: Laptop/PC pe 3 cards 
      */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        {
          testimonialsData.map((testimonial, index) => (
            
            <div 
              key={index} 
              // CHANGE 3: max-w-sm hata diya taki grid me fit ho, mx-auto center karne ke liye
              className='max-w-[340px] w-full mx-auto bg-gray-400 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-black'
            >
              <div className='flex justify-center mb-6'>
                {/* Image and Name/Title Group */}
                <div className='text-center'>
                  <img src={testimonial.image} alt={testimonial.alt} className='w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-500/20' />
                  <h2 className='text-xl text-gray-900 font-semibold'>{testimonial.name}</h2>
                  <p className='text-red-500 font-medium text-sm'>{testimonial.title}</p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className='flex justify-center gap-0.5 text-yellow-500 mb-6'>
                {
                  Array.from({ length: testimonial.rating }, (item, index) => (
                    <img key={index} src={assets.star_icon} alt="Star Rating" className='w-5 h-5' />
                  ))
                }
              </div>

              {/* Testimonial Text */}
              <p className='text-gray-700 italic leading-relaxed text-center'>"{testimonial.text}"</p>
            </div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default Testimonials;