import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-between items-center gap-4 py-6'>
      <Link to={"/"}>
        <img src={assets.logo} alt="" className='w-15 sm:w-20 lg:w-25' />
      </Link>
      <h2 className='max-sm:hidden ml-12'>Copyright @imagify <span className='text-gray-700'>|</span> All rights reserved</h2>
      <div className='flex gap-2'>
       <img src={assets.facebook_icon} alt="" width={35}/>
       <img src={assets.instagram_icon} alt="" width={35}/>
       <img src={assets.twitter_icon} alt="" width={35}/>
      </div>
    </div>
  )
}

export default Footer
