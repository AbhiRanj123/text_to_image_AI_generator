import React from 'react'
import { assets } from '../assets/assets'

const Login = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/10 flex items-center justify-center '>
      <form className='relative bg-gradient-to-b from-teal-50 to-orange-50 rounded-xl p-10 text-slate-500 text-center'>
        <h1 className='text-2xl font-medium text-neutral-700'>Login</h1>
        <p className='text-sm mt-3'>Welcome back! Please log in to continue</p>

        <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.email_icon} alt="" width={22}/>
            <input type="email" className="bg-transparent outline-none" placeholder="Email address" required="true"  />
        </div>

        <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.lock_icon} alt="" width={22}/>
            <input type="password" className="bg-transparent outline-none" placeholder="Password" required="true"  />
        </div>
        <p className='text-sm mt-5 underline text-blue-500 cursor-pointer'>Forgot password</p>
        {/* <p className='text-sm mt-3'>Donot have an account<span> ? </span><a href="#" className='underline'>Sign Up</a></p> */}
        <button className='mt-4 border bg-blue-600 text-white rounded-full py-2 w-full hover:scale-105 shadow-md transition-all duration-100'>Log in</button>
        <p className='text-sm mt-3'>Donot have an account<span> ? </span><a href="#" className='underline'>Sign Up</a></p>

        <img src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
      </form>
    </div>
  )
}

export default Login
