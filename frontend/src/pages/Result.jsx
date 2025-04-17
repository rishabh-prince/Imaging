
import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"
import { toast } from 'react-toastify';

const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1);
  const [isImageLoaded,setIsImageLoaded] = useState(false);
  const [loading,setLoading] = useState(false);
  const [inputData,setInputData] = useState("");

  const {user,setShowAuth,generateImage} = useContext(AppContext);

  const handleSubmit=async (e)=>{
     e.preventDefault();
     if(!user){
      setShowAuth(true);
      toast.error("Please login for image generation");
      return ;
     }
     if(inputData){
       setLoading(true);
      const image = await generateImage(inputData);
      if(image){
        setIsImageLoaded(true);
        setImage(image);
      }
      setLoading(false);
       setInputData("");
     }else{
      toast.error("Please enter the prompt");
     }
     
  }
  return (
    <motion.form className=' w-full sm:w-11/12 md:w-3/4 lg:w-7/12 my-20 mx-auto min-h-[70vh]'
     onSubmit={handleSubmit}
      initial={{ y: 100, opacity: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <div className='w-5/6 md:w-2/3 mx-auto relative'>
        <img src={image} alt="" className='w-full' />
        <span className={`${loading ?'w-full transition-all duration-[7s]' :'w-0'} bg-blue-500 h-1.5 absolute bottom-0`}></span>
      </div>
      <p className={`mb-5 mx-auto w-5 ${loading ? 'block' : 'hidden'}` }>Loading....</p>
      {!isImageLoaded ? <div className="relative w-full border border-neutral-200 p-2 rounded-full bg-neutral-400 my-8">
        <input type="text" name="" placeholder='Describe what you want to generate' className={`h-full py-2 px-3 w-2/3 outline-0 border-0 placeholder-white`}
        value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
        <button className={`right-0.5 top-0.5 absolute rounded-full px-3 md:px-6 py-3 text-white cursor-pointer ${inputData ?'bg-neutral-800' : 'bg-neutral-600'}`}>Generate</button>
      </div>
      :<div className='sm:w-3/4 flex mx-auto items-center sm:justify-evenly justify-between px-5 py-8'>
        <p className='py-3 px-3 sm:px-4 rounded-full bg-neutral-700 text-white cursor-pointer' onClick={()=>setIsImageLoaded(false)}>Generate Another</p>
        <a href={image} download className='flex gap-1 items-center bg-zinc-300 px-4 py-3 rounded-full text-blue-500'><span>Download</span><img src={assets.download_icon} alt="" width={20} className=''/></a>
      </div>}
    </motion.form >
  )
}

export default Result