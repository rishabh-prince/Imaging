import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { motion } from "motion/react";
import { assets } from '../assets/assets';

const History = () => {
  const {images,getImages,deleteImage} = useContext(AppContext);
  const [loading,setLoading]=useState(true);
  const [selectedImage,setSelectedImage] = useState(null);
  useEffect(()=>{
    getImages().finally(() => setLoading(false));
  },[])
  const generateDate = (date) =>{
    return new Date(date).toISOString().split("T")[0];
  }
  
  return (
    <>
    <motion.div 
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
     className='w-11/12 sm:w-5/6 mx-auto bg-gradient-to-l from-slate-400 to-slate-500 p-3 sm:p-10 rounded-lg text-center my-20 md:my-12'>
      <h1 className='text-3xl font-bold'>Generated Images</h1>
      <div className="w-full flex flex-wrap justify-evenly items-center my-5 p-1 gap-5">
     { loading ? <h2>Loading...</h2>
     : images.length>0 ? (
         images.map((image)=>(
           <div key={image._id} className='w-[250px] p-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-md my-2'>
             <img src={image.image} alt="" className='h-48 w-full object-cover cursor-pointer' onClick={()=>setSelectedImage(image.image)}/>
                <p className='my-2 font-semibold'>{generateDate(image.createdAt)}</p>
                <p>{image.prompt}</p>
                <MdDelete className='bg-zinc-300 w-8 h-8 p-1 mx-auto my-3 rounded-md cursor-pointer' color='red' onClick={()=>deleteImage(image._id)}/>
          </div>
         ))
       )
       : (
        <div className="">
          <img src={assets.no_image} alt="" className='sm:w-1/2 w-2/3 md:w-1/3 mx-auto'/>
          <h2 className=' text-xl sm:text-2xl font-semibold'>Currently you don't have a image please generate few images</h2>
          </div>
         )
     }
      </div>
      
    </motion.div>
      <div className={`fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-md
     bg-black/20 py-12 ${selectedImage ? 'block' : 'hidden'}`}>
      <div className="w-5/6 sm:w-2/3 md:w-1/2 md:h-5/6 h-3/4 mx-auto my-5 relative"> 
        <img src={selectedImage || null} alt="" className='w-full h-full rounded-md' />
        <IoCloseSharp className='w-8 h-8 rounded-full bg-zinc-400 absolute top-3 right-3 cursor-pointer' onClick={()=>setSelectedImage(false)}/>
        </div>
      </div>
    </>
  )
}

export default History