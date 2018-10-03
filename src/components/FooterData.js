import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import NewDataMenu from './newDataMenu'
import Modal from 'react-responsive-modal'
import AssignPatientModal from './AssignPatientModal'
import {hideModal, showModal, turnOffGeocoder, hideMask, patientAddressSelectorOff, hcwAddressSelectorOff, outpostAddressSelectorOff} from '../redux/reducers/formReducer'


class FooterData extends Component {
  
    state = {
      openModal: false, 
      assignPatientModal: false
    }

  handleClick = (long, lat) => {
    this.props.mapView.goTo({
      target: [+long, +lat],
      heading: 0,
      tilt: 0,
      zoom: 20
    }, this.clickOption)
  }
    clickOption = {
      speedFactor: 3
    }
 
  onOpenModal = () => { this.props.showModal()}
  onCloseModal = () => { this.props.hideModal()}

  goToModal = (typeOfSelector) => {
    this.props.showModal()
    this.props.turnOffGeocoder()
    this.props.hideMask()
    let addressType = `${typeOfSelector}AddressSelectorOff`
    this.props[addressType]()
  }

  assignPatientModalOpen = () => { this.setState({ assignPatientModal: true})}
  assignPatientModalClosed = () => { this.setState({ assignPatientModal: false})}

  render () {
    let { patientsData, healthworkersData} = this.props
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element => {
      return <p key={element}>{element}</p>
    })

    let displayLocation

    if (this.props.patientAddressSelector){
      displayLocation =(
      <div>
      <h3>{this.props.patientAddress}</h3>
      <p>At latitude {this.props.lat} and longitude {this.props.lon}</p>
      <button type='button' onClick={()=> this.goToModal('patient')}> Select this address </button>
      </div>
      )
    } else if (this.props.hcwAddressSelector){
      displayLocation =(
      <div>
      <h3>{this.props.hcwAddress}</h3>
      <p>At latitude {this.props.lat} and longitude {this.props.lon}</p>
      <button type='button' onClick={()=> this.goToModal('hcw')}> Select this address </button>
      </div>
      )
    } else if (this.props.outpostAddressSelector){
      displayLocation =(
      <div>
      <h3>{this.props.outpostAddress}</h3>
      <p>At latitude {this.props.lat} and longitude {this.props.lon}</p>
      <button type='button' onClick={()=> this.goToModal('outpost')}> Select this address </button>
      </div>
      )
    }

    if (this.props.toggleMask){
      return(
      <div className="footer-wrapper">
      <div className='data-containers'>
        <h2>The selected address is:</h2>
        
        {displayLocation}
        
      </div>
      </div>
      )
    }else {

    return (
      <div className="footer-wrapper">

        <div className="data-containers">
        
          <div id='due-this-month'>
            <h4>Expecting This Month</h4>
              { 
                patientsData.map(patient => {
                  let todayUnformatted = new Date()
                  let today = moment(todayUnformatted)
                  let dueDateFormatted = moment(patient.duedate)
                  let dueThisMonth = moment(dueDateFormatted).diff(moment(today), 'days', true)
                  
                    
                    if (dueThisMonth <= 31 && dueThisMonth >= 1) {
                      return <p key={patient.id} onClick={ () => this.handleClick(patient.longitude, patient.latitude)}>{patient.name} {moment(patient.duedate).format('MM/DD/YYYY')}</p> 
                    } else {
                      return null
                    }
                })
              }
          </div>

          <div id='service-area'>
            <h4>Patients outside of service area</h4>
              {patientsOutsideServiceArea}
          </div>
              
          <div id='healthworker-data'>
            <h4>Heathworkers in the Field</h4>
                {
                  healthworkersData.map( healthworker => {
                    if (healthworker.in_field === true) {
                      return <p key={healthworker.id} onClick={ () => {this.handleClick(healthworker.longitude, healthworker.latitude)}}>{healthworker.name}</p>
                    } else {
                      return null
                    }
                  })
                }
          </div>
          
          <div id='unassigned-data'>
            <h4>Unassigned Patients</h4>
                {
                  patientsData.map( patient => {
                    if (patient.healthworker_id === null || patient.healthworker_id === 1){
                      return (
                        <div id='patient-names'
                             key={patient.id}>
                          <p 
                             onClick={ () => this.assignPatientModalOpen()}>{patient.name}
                          </p>
                          {
                            this.state.assignPatientModal && 
                              <AssignPatientModal 
                                open={this.assignPatientModalOpen}
                                close={this.assignPatientModalClosed}
                                patient={patient}
                              />

                          }
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                
            
          </div>

          <button id='add-button'onClick={() => this.onOpenModal()}>Add New Data</button>
            <Modal open={this.props.openModal} onClose={() => this.onCloseModal()} center>
              <div className="new-data-modal">
                <NewDataMenu/>
              </div>
            </Modal>
        
      </div>
    </div>
    )}
              }
}
    

let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData,
    healthworkersData: state.healthworkers.healthworkersData,
    outpostsData: state.outposts.outpostsData,
    mapView: state.map.mapView,
    openModal: state.newForm.openModal,
    toggleMask: state.newForm.toggleMask,
    patientAddress: state.newForm.patientAddress,
    hcwAddress: state.newForm.hcwAddress,
    outpostAddress: state.newForm.outpostAddress,
    patientAddressSelector: state.newForm.patientAddressSelector,
    hcwAddressSelector: state.newForm.hcwAddressSelector, 
    outpostAddressSelector:state.newForm.outpostAddressSelector,
  }
}
export default connect(mapStateToProps, {getPatients, hideModal, showModal, turnOffGeocoder, hideMask, patientAddressSelectorOff, hcwAddressSelectorOff, outpostAddressSelectorOff})(FooterData)