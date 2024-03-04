import React from 'react'
import "../css/LandingView.css"
import LandingInfo from './LandingInfo'
import LandingFooter from './LandingFooter'
import Login from './Login'

export default function LandingPage() {
    
    return (
      <div className='landingviewClass'>
        <div className='container'>
          <div className='landingPic'>
          <div className='inputContainer'>   
          <Login></Login>                 

          </div>

          
              </div>
        </div>
        <LandingInfo/>
        <LandingFooter/>
      </div>
    )
  }
  