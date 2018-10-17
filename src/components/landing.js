import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../CSS/Landing.css'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  login = () => {
    let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
    let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    let scope = encodeURIComponent('openid profile email')
    //The code from auth0 comes from here
    let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)

    let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`

    //Window.location takes the wraped url location and sends us to the new location 
    // window.location = location
    console.log('URI', redirectUri)
  }

  render() {
    return (
      <div>
        <div className="landing-main-container">
          <div className="landing-box">
            <div className="landing-logo">
              <img src={require("../logo_transparent.png")} style={{ height: '200px', width: '200px' }} alt="" />
            </div>
            <div className="landing-name">
              <h1>GeoNet Medical Response</h1>
            </div>
            <div className="landing-button-container">
              <button className="landing-button" onClick={this.login}>Admin Login</button>
              <Link to="/dashboard"><button className="landing-guest-button">Continue As A Guest</button></Link>
            </div>
            <div className="landing-mission">
              <p>"Bringing medical supplies and emergency response to those in need in the most hard to reach locations."</p>
            </div>
          </div>
          <Link to='/about'>
            <button className='about-button'>About Us</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
