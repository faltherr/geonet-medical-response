import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'


class FooterData extends Component {
  render () {
    return (
      <div className="footer-wrapper">
        <div className="data-containers">
            <div id='patient-data'><p>Current Patient Alerts</p>
            </div>
            <div id='service-area'><p>Patients outside of service area</p></div>
            <div id='due-this-month'><p>Expecting This Month</p></div>
            <div id='healthworker-data'><p>Heathworkers in the Field</p></div>
            
        </div>
      </div>
    )
  }
}

export default FooterData