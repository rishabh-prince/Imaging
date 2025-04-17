import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div className='text-center my-16 w-3/4 mx-auto'
      initial={{ y: 100, opacity: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <h1 className='md:text-4xl text-3xl font-medium'>Customer Testimonials</h1>
      <p className='my-4 text-neutral-700'>What Our Users Are Saying</p>
      <div className="md:my-10 my-6 flex flex-wrap justify-evenly">
        {testimonialsData.map((data,i)=>(
          <div className='flex flex-col gap-2 items-center w-60 p-2 rounded-lg border bg-gradient-to-t from-yellow-500 to-neutral-200 my-5
           shadow-xl shadow-gray-500 hover:scale-105 transition-all duration-300' key={i}>
            <img src={data.image} alt="" width={40} className='object-cover rounded-full'/>
            <h2>{data.name}</h2>
            <div className='flex gap-2'>
                {Array(data.stars).fill('').map((item,i)=>(
                   <img src={assets.rating_star} alt="" key={i}/>            
                ))}
            </div>
            <p className='text-neutral-700'>{data.text}</p>

          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials