import React from 'react'
import { assets, plans } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { motion } from 'framer-motion'

const BuyCredit = () => {

  const {user,navigate,setShowLoginModal} = useContext(AppContext);

  const onClickHandler = () => {
    if(user){
      navigate('/result');
    }
    else{
      setShowLoginModal(true);
    }
  };
  return (
    <motion.div 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className='min-h-[80vh] text-center pt-10 mb-10'>
      <button className='bg-transparent border border-gray-400 rounded-full px-8 py-2 mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((plan,index)=>(
          <div key={index}
            className='bg-white drop-shadow-lg rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img src={assets.logo_icon} alt=""  width={40}/>
            <p className='mt-3 mb-1 font-semibold'>{plan.id}</p>
            <p className='text-sm'>{plan.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${plan.price}</span> for {plan.credits} credits</p>
            <button onClick={() => onClickHandler()} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
