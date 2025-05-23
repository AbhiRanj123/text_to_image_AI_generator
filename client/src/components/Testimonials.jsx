import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { AppContext } from '../contexts/AppContext'
import { useContext } from 'react'
import { motion } from 'framer-motion'

const Testimonials = () => {
    const {navigate, user, setShowLoginModal} = useContext(AppContext);

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
        className='flex flex-col items-center justify-center text my-8 py-3'>
        <h2 className='text-3xl sm:text-4xl mb-2 font-semibold'>Users Testimonials</h2>
        <p className='text-lg text-gray-600 mb-8'>See what our users says</p>

        <div className='flex flex-wrap gap-6'>
            {testimonialsData.map((testimonial,index)=>(
                <div key={index}
                    className='bg-white/20 p-12 w-80 gap-8 md:gap-15 m-auto shadow-md border rounded-lg cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <img src={testimonial.image} className="rounded-full w-14" alt="" />
                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        <p className='text-gray-400 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill('').map((item,index)=>(
                                <img key={index} src={assets.rating_star} alt="" className='w-4' />
                            ))}
                        </div>
                        <p className='text-gray-600 text-center text-sm'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='pb-16 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try it now</h1>
            <button onClick={()=>onClickHandler()} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'>
                Generate Images
                <img src={assets.star_group} className="h-6" alt="" />
            </button>
        </div>
      
    </motion.div>
  )
}

export default Testimonials
