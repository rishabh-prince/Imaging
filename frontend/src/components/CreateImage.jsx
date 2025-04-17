import React from 'react'
import { assets } from '../assets/assets'
import {motion} from "motion/react"

const CreateImage = () => {
  return (
    <motion.div className='text-center my-16 w-3/4 mx-auto'
    initial={{y:100,opacity:0.2}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1}}>
          <h1 className='md:text-4xl text-3xl font-medium'>Create AI Images</h1>
          <p className='my-4 text-neutral-700'>Turn your imagination into visuals.</p>
          <div className="md:flex gap-5 my-16">
            <img className='md:w-1/2' src={assets.sample_img_1} alt="" />
            <div className="md:my-0 my-10 text-left">
                <h2 className='text-2xl font-medium mb-5'>Introducing the AI-powered Text to Image Generator</h2>
                <p className='text-neutral-500 my-5'> Easily brings your ideas to life with our free Ai image generator. Whether you need stunning visuals or unique imaginary.
                    Our tool transforms your text into eye-catching images with just few clicks.</p>
                <p className='text-neutral-500'>Simply type your prompt and our cutting edge AI will generate high quality images in seconds.
                    From product visual to character design and portraits, even concepts that won't even exists can be 
                    visualized effortlessly.
                </p>
            </div>
          </div>
    </motion.div>
  )
}

export default CreateImage