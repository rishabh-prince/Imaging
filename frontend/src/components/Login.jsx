import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from "axios"
import { toast } from 'react-toastify';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin,setIsLogin]=useState(true);
    const {setShowAuth,backend_url,setToken,setUser,user} = useContext(AppContext);

    const [name, setName] = useState("");
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=>{
       e.preventDefault(); 
       try {
        if(isLogin){
           const {data} =  await axios.post(backend_url + '/api/user/login',{
                email,password
            })
            if(data.success){
                localStorage.setItem("token",data.token);
                setToken(data.token);
                setUser(data.name);
                setShowAuth(false);
                toast.success("welcome " + data.name);
                console.log(user);
            }else{
                toast.error(data.message);
            }
        }else{
            const { data } = await axios.post(backend_url + '/api/user/signup', {
                name, email, password
            })
            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setUser(data.name);
                setShowAuth(false);
                toast.success("welcome " + data.name);
            } else {
                toast.error(data.message);
            }
        }
       } catch (error) {
         toast.error(error.message);
       }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-md
     bg-black/20 flex justify-center items-center'>
            <motion.form onSubmit={handleSubmit} className='md:w-1/2 sm:w-2/3 w-5/6 text-center bg-gradient-to-tr from-neutral-300 to-orange-300 py-5 px-2 rounded-lg relative'
                initial={{ y: 50, opacity: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
               >
                <h1 className='text-4xl md:text-3xl font-medium'>{isLogin ? "Login" : "SignUp"}</h1>
                <p className='text-neutral-500 text-sm'>{isLogin ? "Welcome Back! please login to continue" :"Welcome! please create account to continue"}</p>
   
                <div className={`sm:w-2/3 mx-auto border border-neutral-400 my-5 px-3 py-2 rounded-full flex items-center gap-2 ${isLogin ? 'hidden' : 'block'}`}>
                    <img src={assets.profile_icon} alt="" width={25} className='text-neutral-200'/>
                    <input className='h-8 outline-0' type="text" placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className='sm:w-2/3 mx-auto border border-neutral-400 my-5 px-4 py-2 rounded-full flex items-center gap-2'>
                    <img src={assets.email_icon} alt="" />
                    <input className='h-8 outline-0' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='sm:w-2/3 mx-auto border border-neutral-400 mt-5 px-4 py-2 rounded-full flex items-center gap-2'>
                    <img src={assets.lock_icon} alt="" />
                    <input className='h-8 outline-0' type={`${showPassword ? 'text' : 'password'}`} placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className='bg-blue-500 py-2 my-5 w-2/3 cursor-pointer text-white text-xl rounded-full'>Login</button>
                {isLogin ? <p>Don't have an acount? <span className='text-blue-600 underline cursor-pointer' onClick={() => setIsLogin(false)}>Signup</span></p>
                    : <p>Already have an acount? <span className='text-blue-600 underline cursor-pointer' onClick={() => setIsLogin(true)}>Login</span></p>}

                <img src={assets.cross_icon} alt="" className='absolute right-4 top-4 bg-neutral-300 p-4 rounded-full cursor-pointer' width={45} onClick={()=>setShowAuth(false)} />
            </motion.form>
        </div>

    )
}

export default Login