import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets.js";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {

    const {user,setShowAuth,credit,logout} = useContext(AppContext);
    const [showOption,setShowOption] = useState(false)

    const navigate = useNavigate()
    return (
        <div className='flex justify-between items-center'>
            <Link to={"/"}>
                <div className="w-28,sm:w-32 lg:w-40 flex items-center gap-2">
                <img src={assets.favicon} alt="" width={35} />
                <span className='text-3xl sm:text-4xl font-bold'>Imaging</span>
                </div>
            </Link>
            <div>
                {user ?
                    <div className="flex items-center gap-2 sm:gap-3 p-2">
                        <button onClick={()=>navigate("/buycredit")} className='flex items-center gap-1 sm:gap-2 bg-blue-100 px-2 sm:px-6 py-1 sm:py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-700'>
                            <img src={assets.credit_star} alt="" className='size-5 sm:size-7' />
                            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
                        </button>
                        <div className='relative'>
                            <img src={assets.profile_icon} alt="" className='w-10 drop-shadow cursor-pointer' onClick={()=>setShowOption((prev)=>!prev)}/>
                            <div className={`absolute top-12 right-0 z-10 text-black rounded`}>
                                <ul className={`list-none m-0 py-2 px-auto backdrop-blur-4xl z-20 bg-zinc-300 rounded-xl border text-sm ${showOption ? 'block' : 'hidden'}`}>
                                    <li className='py-1 px-5'>Hi, <span className='text-blue-700'>{user}</span></li>
                                    <li className='py-1 px-5 cursor-pointer text-cyan-600' onClick={() => navigate('/result')}>Generate Image</li>
                                    <li className='py-1 px-5 cursor-pointer' onClick={() => navigate('/history')}>History</li>
                                    <li className='py-1 px-5 cursor-pointer text-red-500' onClick={()=>logout()}>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : <div className="flex items-center gap-3 sm:gap-5">
                        <p className='cursor-pointer' onClick={() => navigate("/buycredit")}>Pricing</p>
                        <button className='bg-zinc-800 text-white px-5 py-2 sm:px-10 rounded-2xl text-sm cursor-pointer' 
                        onClick={()=>setShowAuth(true)}>Login</button>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar