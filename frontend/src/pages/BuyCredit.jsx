import React,{useContext} from 'react'
import { assets, plans } from '../assets/assets'
import { motion } from 'motion/react'
import {AppContext} from "../context/AppContext"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {
  const {user,backend_url,getCredits,token, setShowAuth} = useContext(AppContext)
  const navigate = useNavigate();
 
  const initpay = async (order)=>{
     const options = {
       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
       amount : order.amount,
       currency : order.currency,
       name :" credits payment",
       description : "payment for buying credit from imagify",
       order_id : order.id,
       receipt : order.receipt,
       handler: async (response)=>{
        try {
          const {data} = await axios.post(backend_url + "/api/user/verifyrazorpay",response,{
            headers:{token}})
            if(data.success){
              getCredits();
              navigate("/");
              toast.success("Credit added");
            }else{
              toast.error(data.message);
            }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
        console.log(response);
       }
     }
      const razorpay = new window.Razorpay(options)

      razorpay.open()
  }

  const paymentRazorpay  = async (planId)=>{
    try {
      if(!user){
        setShowAuth(true);
        return ;
      }
     const {data} =  await axios.post(backend_url + "/api/user/payrazorpay",{planId},
        {headers :{token}})
        console.log(data);
        if(data.success){
            initpay(data.order);
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }
  return (
    <motion.div className='w-full text-center my-20'
      initial={{ y: 100, opacity: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <h2 className='p-3 border border-neutral-400 rounded-full w-28 mx-auto my-5'>Our Plans</h2>
      <h1 className='md:text-4xl text-3xl font-medium'>Choose the Plan</h1>
      <div className="my-10 w-5/6 mx-auto flex justify-evenly gap-3 flex-wrap">
        {
          plans.map((plan,i)=>(
            <div className="text-left p-4 py-6 bg-white border border-neutral-300 rounded-lg shadow-xl shadow-neutral-200
             flex flex-col gap-5 hover:scale-110 transition-all duration-300 min-w-5/6 sm:min-w-2/3 md:min-w-60 my-5" key={i}>
              <img src={assets.favicon} alt="" width={30}/>
              <h2 className='text-2xl'>{plan.id}</h2>
              <p className='text-neutral-800'>{plan.desc}</p>
              <div className="flex items-center gap-1">
                <span className='font-semibold text-2xl'>₹ {plan.price}</span>
                <p className='text-neutral-600'>/{plan.credits} Credits</p> 
                </div>
               <button onClick={()=>paymentRazorpay(plan.id)}
                className='bg-blue-500 py-3 rounded-full w-2/3 mx-auto hover:scale-105 transition-all duration-300 cursor-pointer'>{user ? 'purchase':'Get Started'}</button>
            </div>
          ))
        }
      </div>

    </motion.div>
  )
}

export default BuyCredit