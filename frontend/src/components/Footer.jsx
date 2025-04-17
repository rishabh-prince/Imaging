import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex justify-between bottom-0 absolute w-full md:w-2/3'>
        <div className='flex items-center justify-between gap-2 text-sm '>
          <Link to={"/"}>
                <div className="w-28,sm:w-32 lg:w-48 flex items-center gap-2">
                <img src={assets.favicon} alt="" width={35} />
                <span className='text-2xl sm:text-4xl font-bold mr-5'>Imaging</span>
                </div>
            </Link>
              
          <p className='text-neutral-500 border-l-2 pl-5'>All rights reserved. copyright @imaging</p>
          </div>
    </div>
  )
}

export default Footer