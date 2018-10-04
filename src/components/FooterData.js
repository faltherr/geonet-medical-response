import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import * as moment from 'moment'
import NewDataMenu from './newDataMenu'
import Modal from 'react-responsive-modal'
import AssignPatientModal from './AssignPatientModal'


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
 
  onOpenModal = () => {this.setState({ openModal: true })}
  onCloseModal = () => {this.setState({ openModal: false })}
  assignPatientModalClosed = () => {this.setState({ assignPatientModal: false})}

  assignPatientModalOpen = (id) => { 
    this.setState({ 
      assignPatientModal: true, 
      patientId: id
    })}

  render () {
    let { patientsData, healthworkersData} = this.props
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element => {
      return <p key={element}>{element}</p>
    })
    // console.log('patients awaiting', this.props.patientsAwaitingAssignment)
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