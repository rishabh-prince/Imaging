import React, { useContext } from 'react';
import {assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import {AppContext} from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const {user,setShowAuth} = useContext(AppContext)

  const handleClick= ()=>{
    if(user){
      navigate("/result")
    }else{
      setShowAuth(true)
    }
  }
  return (
      <motion.div className='flex flex-col justify-center items-center text-center my-20 gap-5'
      initial={{opacity:0.2,y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}>
        <motion.div className='text-stone-500 inline-flex text-center gap-2
        bg-zinc-200 px-6 py-1 rounded-full border border-neutral-500'
        initial={{ opacity: 0.2, y: -20}}
        animate={{ opacity: 1, y: 0 }}
        transition={{delay:0.2, duration:0.8}}
        >
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="" />
        </motion.div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-center'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:0.6}}
        >
              Turn text to <span className='text-blue-600'>Image</span>, in seconds.</motion.h1>

        <motion.p
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1,y:0 }}
        transition={{ delay: 0.6, duration: 0.8 }} 
        >Unleash your creativity with AI, Turn your imagination into visual art in seconds -
          Just type, and watch the magic happens.</motion.p>

      <motion.button className='sm:text-lg text-white bg-gradient-to-r from-rose-400 to-red-500 w-auto
           mt-5 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer' onClick={handleClick}
        initial={{ opacity: 0}}
        whileTap={{scale:0.95}}
        animate={{ opacity: 1}}
        transition={{default: {duration : 0.8}, opacity:{delay: 0.8, duration: 0.8 }}}
           >Generate Images 
            <img className='h-6' src={assets.star_group} alt="" />
          </motion.button>

          <motion.div className='flex items-center justify-center flex-wrap mt-16 gap-3'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1,duration:1}}>
            {Array(6).fill('').map((item,i)=>(
              <img className='rounded hover:scale-105 transition-all duration-100
              cursor-pointer max-sm:w-10' src={i & 1 ? assets.sample_img_1 : assets.sample_img_2} alt="" key={i} width={70}/>     
            ))}
          </motion.div>

          <motion.p className="text-neutral-700"
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1.2,duration:1}}>Generated images from imagify</motion.p>
    </motion.div>
  )
}

export default Header