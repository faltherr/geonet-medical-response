import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { CallContext } from 'twilio/lib/rest/api/v2010/account/call';
import NewDataMenu from './newDataMenu'
import Modal from 'react-responsive-modal'
import NewDataMenu from './NewDataMenu'
import Modal from 'react-responsive-modal';


class FooterData extends Component {
  
    state = {
      openModal: false
    }
  
  distance = (lat1, lon1, lat2, lon2) => {
    let p = Math.PI/180    
    let c = Math.cos;
    let a = 0.5 - c((Number(lat2) - Number(lat1)) * p)/2 + 
            c(Number(lat1) * p) * c(Number(lat2)* p) * 
            (1 - c((Number(lon2) - Number(lon1)) * p))/2
    return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
  }

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
 
  onOpenModal = () => { this.setState({ openModal: true }) }
  onCloseModal = () => { this.setState({ openModal: false }) }

  render () {
    let { patientsData, healthworkersData, outpostsData } = this.props
    const calculated = this.distance(+patientsData.latitude, +patientsData.longitude, +outpostsData.latitude, +outpostsData.longitude)
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element=>{
                     return <p key={element}>{element}</p>
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
                  
                     <div id='patient-data'><p>Current Patient Alerts</p>
            </div>
            <div id='service-area'>
              <p>Patients outside of service area</p>
              {patientsOutsideServiceArea}
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

            <button id='add-button'onClick={() => this.onOpenModal()}>Add New Data</button>
            <Modal open={this.state.openModal} onClose={() => this.onCloseModal()} center>
              <div className="new-data-modal">
                <NewDataMenu closeModal={this.onCloseModal}/>
              </div>
            </Modal>
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