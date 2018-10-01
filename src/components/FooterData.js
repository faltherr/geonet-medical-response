import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { CallContext } from 'twilio/lib/rest/api/v2010/account/call';

class FooterData extends Component {
 
  handleClick = (long, lat) => {
    this.props.mapView.goTo({
      target: [+long, +lat],
      heading: 0,
      tilt: 10,
      zoom: 20
    }, this.clickOption)
  }
    clickOption = {
      speedFactor: 3
    }

  // distanceFromPatientToOutpost = (lat1, lat2, lon1, lon2) => {
  //   // let radius = 6371
  //   // let dLon = deg2rad(lon1-lon2)
  //   // let dLat = deg2rad(lat1-lat2)
  //   // let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
  //   //         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
  //   //         Math.sin(dLon/2) * Math.sin(dLon/2)
  //   // let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  //   // let d = radius * c
  //   //   return d
    
  //   let c = Math.cos
  //   let a = 0.5 - c((lat2 - lat1) * p)/2 +
  //           c(lat1 * p) * c()
  // }
 
   distance = (lat1, lon1, lat2, lon2) => {
    let p = Math.PI/180    
    let c = Math.cos;
    let a = 0.5 - c((Number(lat2) - Number(lat1)) * p)/2 + 
            c(Number(lat1) * p) * c(Number(lat2)* p) * 
            (1 - c((Number(lon2) - Number(lon1)) * p))/2
    return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
  }
 
  render () {
    let { patientsData, healthworkersData, outpostsData } = this.props
    const calculated = this.distance(+patientsData.latitude, +patientsData.longitude, +outpostsData.latitude, +outpostsData.longitude)

    return (
      <div className="footer-wrapper">
        <div className="data-containers">
      
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

              <div id='service-area'>
                <h4>Patients outside of service area</h4> 
                  {
              
                   patientsData.map( patient => {
                      let distanceArray = []
                      // let calulated = this.distance(patient.latitude, patient.longitude, outpostsData.latitude, outpostsData.longitude)
                      console.log(outpostsData.latitude)
                        // return <p>{distanceArray.push(calulated)}</p>
                    })
                   
                    })
                  }
               
              </div>

              <div id='healthworker-data'>
                <h4>Heathworkers in the Field</h4>
                  {
                    healthworkersData.map( healthworker => {
                      if (healthworker.in_field === true) {
                        return <p onClick={ () => {this.handleClick(healthworker.longitude, healthworker.latitude)}}>{healthworker.name}</p>
                      }
                    })
                  }
              </div>
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData,
    healthworkersData: state.healthworkers.healthworkersData,
    outpostsData: state.outposts.outpostsData,
    mapView: state.map.mapView
  }
}
export default connect(mapStateToProps, {getPatients})(FooterData)