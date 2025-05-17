
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'

const Steps = () => {
  return (
    <motion.div className='text-center mb-10'
    initial={{y:100,opacity:0.2}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}>
        <h1 className='md:text-4xl text-3xl font-medium'>How It Works</h1>
        <p className='my-4 text-neutral-700'>Tranform words into stunning images</p>
        {stepsData.map((data,i)=>(
          <div className='flex gap-4 p-4 border bg-gradient-to-br from-amber-300 via-blue-200 to-zinc-400 w-3/4 mx-auto text-left rounded-2xl my-5 shadow-lg shadow-neutral-400 hover:scale-105 transition-all duration-300' key={i}>
                <img src={data.icon} alt="" />
                <div>
                    <h2 className='text-xl'>{data.title}</h2>
                    <p className='text-sm text-neutral-700'>"{data.description}"</p>
                </div>
            </div>
        ))}
    </motion.div>
  )
}

export default Steps