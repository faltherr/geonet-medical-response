import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import { ENGINE_METHOD_DIGESTS } from 'constants';

class FooterData extends Component {
 
  handleClick = (long, lat) => {
    this.props.mapView.goTo({
      target: [+long, +lat],
      heading: 40,
      tilt: 10,
      zoom: 22
    }, this.clickOption)
  }
  clickOption = {
    easing: "ease-in"
  }

render () {
let { patientsData } = this.props
  return (
    <div className="footer-wrapper">
      <div className="data-containers">

        <div id='patient-data'>
          <h4>Current Patient Alerts</h4>
        </div>

        <div id='service-area'>
          <h4>Patients outside of service area</h4>   
        </div>

        <div id='due-this-month'>
          <h4>Expecting This Month</h4>
              { 
                patientsData.map(patient => {
                  let todayUnformatted = new Date()
                  let today = moment(todayUnformatted).format('MM/DD/YYYY')
                  let dueDateFormatted = moment(patient.duedate).format('MM/DD/YYYY')
                  let dueThisMonth = moment(dueDateFormatted).diff(moment(today), 'days', true)
                  let clickable = []
                  
                    if (dueThisMonth <= 31 && dueThisMonth >= 1) {
                      return <p onClick={ () => this.handleClick(patient.longitude, patient.latitude)}>{patient.name} {moment(patient.duedate).format('MM/DD/YYYY')}</p> 
                    } 
               })
              }
          
            </div>

            <div id='healthworker-data'>
              <h4>Heathworkers in the Field</h4>
            </div>
            
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData,
    mapView: state.map.mapView
  }
}
export default connect(mapStateToProps, { getPatients })(FooterData)