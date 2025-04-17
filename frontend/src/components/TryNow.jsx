import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { motion } from 'motion/react';


const TryNow = () => {
    const navigate = useNavigate();
    const {user,setShowAuth} = useContext(AppContext);
  return (
      <motion.div className='text-center my-16 w-3/4 mx-auto'
      initial={{ y: 100, opacity: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
          <h1 className='md:text-4xl text-3xl font-medium'>See the Magic. Try Now</h1>
      <button className='sm:text-lg text-white bg-gradient-to-l from-rose-400 to-red-500 w-auto
           mt-8 px-12 py-2.5 flex items-centergap-2 rounded-full cursor-pointer mx-auto' onClick={() =>user ? navigate("/result") : setShowAuth(true)} >Generate Images 
            <img className='h-6' src={assets.star_group} alt="" />
          </button>
    </motion.div>
  )
}

export default TryNow