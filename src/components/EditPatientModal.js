import React, { Component } from 'react'
import '../CSS/editPatientModal.css'
import axios from 'axios'
import { updatePatient, setCurrentPatient } from '../redux/reducers/patientsReducer'
import { connect } from 'react-redux'
import moment from 'moment'


class EditPatientModal extends Component {
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
    // console.log('patient',this.state.patient)
    return (
      <div className="outer-modal" onClick={this.props.hideModal}>
        <div className="inner-modal" onClick={ (e) => {e.stopPropagation()}}>
          <h3>Edit Patient Information</h3>
            <p>Name:</p><input onChange={ (e) => {this.handleChange(e, 'name')}} value={`${this.state.patient.name}`} />
            <p>Phone:</p><input onChange={ (e) => {this.handleChange(e, 'phone')}} value={`${this.state.patient.phone}`}/>
            <p>Location:</p><input onChange={ (e) => {this.handleChange(e, 'location')}} value={`${this.state.patient.location}`}/>
            <p>Age:</p><input onChange={ (e) => {this.handleChange(e, 'age')}} value={`${this.state.patient.age}`}/>
            <p>Family Plan:</p><input onChange={ (e) => {this.handleChange(e, 'famPlan')}} value={`${this.state.patient.famPlan}`}/>
            <p>HIV Status:</p><input onChange={ (e) => {this.handleChange(e, 'hiv')}} value={`${this.state.patient.hiv}`}/>
            <p>Due Date:</p><input onChange={ (e) => {this.handleChange(e, 'duedate')}} value={`${this.state.patient.duedate}`}/>
            <p>Alert:</p><input onChange={ (e) => {this.handleChange(e, 'alert')}} value={`${this.state.patient.alert}`}/>
            <button onClick={ () => {this.props.updatePatient(this.state.patient.id, this.state.patient, this.updateGraphic); this.props.hideModal()}}>Save Changes</button>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return { currentPatient: state.patients.currentPatient }
}
export default connect(mapStateToProps, { updatePatient, setCurrentPatient })(EditPatientModal)