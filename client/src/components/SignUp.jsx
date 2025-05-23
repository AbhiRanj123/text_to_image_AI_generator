import React ,{ useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contexts/AppContext'
import { motion } from 'framer-motion' // for animation

const SignUp = () => {

  const[isLoggedIn,setIsLoggedIn] = useState('Login'); // to check the state of the user whether logged in or not
  const { setShowLoginModal } = useContext(AppContext)

  useEffect(()=>{
    document.body.style.overflow = 'hidden'; // to prevent the body from scrolling when the login modal is open
    return () => {
      document.body.style.overflow = 'unset'; // to allow the body to scroll when the modal is closed
    }
  },[]);
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/10 flex items-center text-center justify-center '>
      <motion.form 
        initial={{opacity:0.2, y:50}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        className='relative bg-gradient-to-b from-teal-50 to-orange-50 rounded-xl p-10 text-slate-500'>
        <h1 className='text-center text-2xl font-medium text-neutral-700'>{isLoggedIn}</h1>
        <p className='text-sm text-center mt-3'>Welcome back! Please {isLoggedIn} to continue</p>

        {isLoggedIn !== 'Login' && <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.profile_icon} alt="" width={22}/>
            <input type="text" className="bg-transparent outline-none" placeholder="Full Name" required="true"  />
        </div>}

        <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.email_icon} alt="" width={22}/>
            <input type="email" className="bg-transparent outline-none" placeholder="Email address" required="true"  />
        </div>

        <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.lock_icon} alt="" width={22}/>
            <input type="password" className="bg-transparent outline-none" placeholder="Password" required="true"  />
        </div>
        {isLoggedIn !== 'Login' && <div className='flex px-6 py-2 items-center gap-2 border-2 rounded-full mt-5 shadow-md'>
            <img src={assets.lock_icon} alt="" width={22}/>
            <input type="password" className="bg-transparent outline-none" placeholder="Confirm your password" required="true"  />
        </div>}
        {isLoggedIn === 'Login' && <p className='text-sm mt-5 underline text-blue-500 cursor-pointer'>Forgot password</p>}

        <button className='mt-4 border bg-blue-200 border-gray-400 rounded-full py-2 w-full hover:scale-105 shadow-md transition-all duration-100'>{isLoggedIn === 'Login' ? 'Login' : 'Create account'}</button>

        {/*check whether the ser has account or not */}
        {isLoggedIn === 'Login' 
        ?
        <p className='text-sm text-center mt-3'>Donot have an account? <span className='text-blue-500 cursor-pointer' onClick={()=>setIsLoggedIn('Sign Up')}>Sign Up</span></p>
        :
        <p className='text-sm text-center mt-3'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={()=>setIsLoggedIn('Login')}>Login</span></p>}
        <img onClick={()=>setShowLoginModal(false)}
        src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
      </motion.form>
    </div>
  )
}

export default SignUp
