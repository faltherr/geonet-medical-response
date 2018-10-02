import React, { Component } from 'react'
import '../CSS/editPatientModal.css'
// import axios from 'axios'
import { updatePatient, setCurrentPatient } from '../redux/reducers/patientsReducer'
import { connect } from 'react-redux'
import moment from 'moment'


class DemoEditPatientModal extends Component {
  state = {
    patient: {}
  }

  componentDidMount () {
    this.setState({
      patient: this.props.currentPatient
    })   
  }

  handleChange = (e, key) => {
    this.setState ({
      patient: {...this.state.patient, [key] : e.target.value} 
    })
  }

  updateGraphic = () => {
    let { patient } = this.state
    let { graphic } = this.props

    let content = [{
        type: "text",
        text: `
          <span><h4>Name: ${patient.name}</h4></span>
          <span><h4>Location: ${patient.location}</h4></span>
          <span><h4>Age:  ${patient.age}</h4></span>
          <span><h4>Due Date:  ${moment(patient.duedate).format('YYYY/MM/DD')}</h4></span>
          <span><h4>Phone:  ${patient.phone}</h4></span>
          <span><h4>Family Plan:  ${patient.famplan}</h4></span>
          <span><h4>HIV Status:  ${patient.hiv}</h4></span>
          <span><h4>Parity:  ${patient.parity}</h4></span>
          <span><h4>Alert:  ${patient.alert}</h4></span>
          </h4></span>           
          `
      }]

      this.props.setCurrentPatient(patient)
      graphic.popupTemplate.content = content
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return { 
    currentPatient: state.patients.currentPatient 
  }
}

export default connect(mapStateToProps, { updatePatient, setCurrentPatient })(DemoEditPatientModal)