import React from 'react'
import { useEffect, useState } from 'react'
import HeaderSection from '../components/HeaderSection'
import Steps from '../components/Steps'
import Descriptions from '../components/Descriptions'
import Testimonials from '../components/Testimonials'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div>
      <HeaderSection/>
      <Steps/>
      <Descriptions/>
      <Testimonials/>
    </div>
  )
}

export default Home
