import React, { Component } from 'react';
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
    let redirectUri = encodeURIComponent(`http://localhost:8443/auth/callback`)
    let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`

    window.location = location
  }
  render() {
    return (
      <div>
        <div className="landing-main-container">
          <div className="landing-container">
            <div className="landing-logo">
              <img src={require("../logo_transparent.png")} style={{ height: '200px', width: '200px' }} alt="" />
            </div>
            <div className="landing-name">
              <h1>GeoNet Health Services</h1>
            </div>
            <div>
              <button className="landing-button" onClick={this.login}>Admin Login</button>
            </div>
            <div className="landing-mission">
              <p>"Bringing medical supplies and emergency response to those in need in the most hard to reach locations."</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
