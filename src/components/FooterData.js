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
 
  onOpenModal = () => { this.setState({ openModal: true }) }
  onCloseModal = () => { this.setState({ openModal: false }) }

  assignPatientModalOpen = () => { this.setState({ assignPatientModal: true})}
  assignPatientModalClosed = () => { this.setState({ assignPatientModal: false})}

  render () {
    let { patientsData, healthworkersData} = this.props
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element => {
      return <p key={element}>{element}</p>
    })

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