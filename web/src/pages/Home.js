import React from 'react'
import HeroContainer from '../components/hero/Hero'
import Footer from '../components/footer/Footer'
import Navigation from '../components/nav/Navigation'

function Home() {
  return (
    <>
        <Navigation />
        <div className='main-container'>
            <HeroContainer />
            <div className='content-container'>
               
            </div>
            
        </div>
        

        <Footer />
    </>
  )
}

export default Home