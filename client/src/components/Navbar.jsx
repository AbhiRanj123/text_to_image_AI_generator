import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../contexts/AppContext';

const Navbar = () => {
    const {user, isSticky, setShowLoginModal, logout, credit} = useContext(AppContext);
    const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between py-4 px-6
          ${isSticky ? 'sticky top-1 bg-white/30 backdrop-blur-md rounded-full shadow-md' : ''}`}>
      <Link to={"/"}>
        <img src={assets.logo} alt="" className='w-12.5 sm:w-29 lg:w-37' />
      </Link>

      <div>
        {
        user ? 
        <div  className='flex items-center gap-2 sm:gap-5'>
            <button className='flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-3 bg-blue-100 rounded-full hover:scale-105 transition-all duration-700'>
                <img className='w-5' src={assets.credit_star} alt="" />
                <p onClick={()=> navigate('/buy-credit')} className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
            </button>
            <p className='text-xs sm:text-sm text-gray-600 pl-4 max-sm:hidden'>Hi, {user.name}</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-8 drop-shadow' alt="" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                    <ul className='list-none m-0 p-2 bg-gray-300 rounded-md border text-sm'>
                        <li onClick = {logout} className='py-1 px-2 cursor-pointer'>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
        : 
        <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=> navigate('/buy-credit')}
            className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setShowLoginModal(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
        </div>
        }
      </div> 
    </div>
  )
}

export default Navbar
