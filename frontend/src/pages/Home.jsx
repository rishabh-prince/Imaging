import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import CreateImage from '../components/CreateImage'
import Testimonials from '../components/Testimonials'
import TryNow from '../components/TryNow'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <CreateImage/>
      <Testimonials/>
      <TryNow/>
    </div>
  )
}

export default Home