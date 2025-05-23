import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Descriptions = () => {
  return (
    <motion.div 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className='flex flex-col items-center justify-center text my-20 md:px-28'>
        <h2 className='text-3xl sm:text-4xl mb-2 font-semibold'>Create AI Images</h2>
        <p className='text-lg text-gray-600 mb-8'>Turn your imaginations into Visuals</p>
    
        <div className='flex items-center gap-5 md:gap-14  md:flex-row flex-col items-center p-5 px-8 bg-white/20'>
            <img className='w-65 sm:w-80 rounded-lg' src={assets.sample_img_1} alt="" />
                <div>
                    <h2 className='text-3xl font-medium mx-w-lg mb-4'>Introducing the AI-powered Text to Image Generator</h2>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, voluptatibus! Vel sequi nostrum libero quae modi error magnam consequuntur? Doloribus, iusto quaerat. Dolorum molestiae id voluptate itaque cupiditate mollitia quaerat.</p>
                </div>
          </div>
    </motion.div>
  )
}

export default Descriptions
