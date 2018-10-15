import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import NewDataMenu from './newDataMenu'
import Modal from 'react-responsive-modal'
import AssignPatientModal from './AssignPatientModal'
import { hideModal, showModal, turnOffGeocoder, hideMask, patientAddressSelectorOff, hcwAddressSelectorOff, outpostAddressSelectorOff, resetFormInputs } from '../redux/reducers/formReducer'


class FooterData extends Component {
  
    state = {
      openModal: false, 
      assignPatientModal: false,
      patientId: null
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
 

  onOpenModal = () => { this.props.showModal() }
  onCloseModal = () => { this.props.hideModal() }
  assignPatientModalClosed = () => {this.setState({ assignPatientModal: false})}

  assignPatientModalOpen = (id) => { 
    this.setState({ 
      assignPatientModal: true, 
      patientId: id
    })
  }

  goToModal = (typeOfSelector) => {
    this.props.showModal()
    this.props.turnOffGeocoder()
    this.props.hideMask()
    let addressType = `${typeOfSelector}AddressSelectorOff`
    this.props[addressType]()
  }

  closeAddMenu = () => {
    this.props.hideMask()
    this.props.resetFormInputs()
  }

  render() {
    let { patientsData, healthworkersData } = this.props
    // console.log(this.props.patientsOutsideService)
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element => {
      return <p key={element.patientName} onClick={ () => this.handleClick(element.patientLon, element.patientLat)}>{element.patientName}</p>
    })

    let displayLocation

    if (this.props.patientAddressSelector) {
      displayLocation = (
        <div className='address-selector-full-container'>
        <div className='text-address-coordinates-container'>
        <div className='text-address-container'>
          <h2>What3Words Address:</h2>
          <h3>{this.props.patientAddress}</h3>
        </div>
          <div className='coordinates-container'>
            <p>Latitude: {this.props.lat}</p> <p>Longitude: {this.props.lon}</p>
          </div>
        </div>
        <div className='address-selector-button-container'>
          <button className='address-selector-button' type='button' onClick={() => this.goToModal('patient')}> Select this address </button>
        </div>
      </div>
      )
    } else if (this.props.hcwAddressSelector) {
      displayLocation = (
        <div className='address-selector-full-container'>
          <div className='text-address-coordinates-container'>
          <div className='text-address-container'>
            <h2>What3Words Address:</h2>
            <h3>{this.props.hcwAddress}</h3>
          </div>
            <div className='coordinates-container'>
              <p>Latitude: {this.props.lat}</p> <p>Longitude: {this.props.lon}</p>
            </div>
          </div>
          <div className='address-selector-button-container'>
            <button className='address-selector-button' type='button' onClick={() => this.goToModal('hcw')}> Select this address </button>
          </div>
        </div>
      )
    } else if (this.props.outpostAddressSelector) {
      displayLocation = (
        <div className='address-selector-full-container'>
          <div className='text-address-coordinates-container'>
          <div className='text-address-container'>
            <h2>What3Words Address:</h2>
            <h3>{this.props.outpostAddress}</h3>
          </div>
            <div className='coordinates-container'>
              <p>Latitude: {this.props.lat}</p> <p>Longitude: {this.props.lon}</p>
            </div>
          </div>
          <div className='address-selector-button-container'>
            <button className='address-selector-button' type='button' onClick={() => this.goToModal('outpost')}> Select this address </button>
          </div>
        </div>
      )
    }

  // Conditionally render the footer mask if the user is in the add address toggle state on otherwise render the standard footer
    if (this.props.toggleMask) {
      return (
        <div className="footer-wrapper">
          <div className='data-containers2'>
          <div className='add-menu-mask-container'>
            {displayLocation}
            <div className='close-add-menu-icon-container'>
              <i className="fas fa-times" onClick={()=> this.closeAddMenu()}></i>
              </div>
            </div>
          </div>
        </div>
      )
    } else {

      return (
        <div className="footer-wrapper">
          <div className="data-containers">

            <div className='data-box'>
            <div className='fixed-header'><p>Expecting This Month</p></div>
              <div className='content'>
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
            </div>

          <div className='data-box'>
            <div className='fixed-header'><p>Patients outside service area</p></div>
              <div className='content'>
                {patientsOutsideServiceArea}
              </div>
          </div> 

          <div className='data-box'>
            <div className='fixed-header'><p>Heathworkers in the Field</p></div>
              <div className='content'>
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
          </div>
          
          <div className='data-box'>
            <div className='fixed-header'><p>Unassigned Patients</p></div>
              <div className='content'>
                {
                  patientsData.map( patient => {
                    if (patient.healthworker_id === null){
                      return (
                        <div id='patient-names'
                             key={patient.id}>
                             
                          <span 
                             onClick={ () => this.assignPatientModalOpen(patient.id)}>{patient.name}
                          {
                            this.state.assignPatientModal && this.state.patientId === patient.id 
                              ?
                            <AssignPatientModal 
                              close={this.assignPatientModalClosed}
                              patient={patient}
                              patientsLocation={this.props.patientsLocationData
                              }
                            />
                              :
                              null
                          }
                          </span>
                        </div>
                      )
                    } else {
                      return null
                    } 
                  })
                } 
            </div>
          </div>

          <button id='add-button' onClick={() => this.onOpenModal()}>Add New Data</button>
            <Modal open={this.props.openModal} onClose={() => this.onCloseModal()} center>
              <div className="new-data-modal">
                <NewDataMenu />
              </div>
            </Modal>
          </div>
      </div>
      )
    }
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
    outpostAddressSelector: state.newForm.outpostAddressSelector,
  }
}
export default connect(mapStateToProps, { getPatients, hideModal, showModal, turnOffGeocoder, hideMask, patientAddressSelectorOff, hcwAddressSelectorOff, outpostAddressSelectorOff, resetFormInputs })(FooterData)