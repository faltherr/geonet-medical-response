import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'

class FooterData extends Component {
  
  render () {
    return (
      <div className="footer-wrapper">
        <div className="data-containers">
            <div id='patient-data'><p>Current Patient Alerts</p>
            </div>
            <div id='service-area'>
              <p>Patients outside of service area</p>
              {/* {
                patientsData.map( patient => {
                  if (patient.duedate) {

                  }
                })
              } */}
            </div>
            <div id='due-this-month'><p>Expecting This Month</p></div>
            <div id='healthworker-data'><p>Heathworkers in the Field</p></div>
            
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData
  }
}
export default connect(mapStateToProps, { getPatients })(FooterData)