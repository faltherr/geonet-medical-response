import React, { Component } from 'react'
import '../CSS/assignPatientModal.css'
import { connect } from 'react-redux'
import { assignHealthworkerToPatient } from '../redux/reducers/patientsReducer'

class AssignPatientModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      healthworkerId: null,
      nearestHealthworkerName: ''
    }
  }
  
  componentDidMount () {
      this.props.patientsLocation.map(p => { if(p.patientId === this.props.patient.id) {
       this.setState({
        nearestHealthworkerName: p.nearestHWName, 
        healthworkerId: p.nearestHWId
        })
      }
    })
  }

  handleDropDownChange = (event) => {
    this.setState({
      healthworkerId: event.target.options[event.target.selectedIndex].value
    })
  }

  render () {
    var optionsDropDown = []
    let { patient } = this.props
    this.props.healthworkersData.map(healthworker => {
       if (healthworker.name !== 'Unassigned' && healthworker.name !== null) {
        if(healthworker.id === this.state.healthworkerId) {
          return optionsDropDown.push(
            <option key={healthworker.id}
                    value={healthworker.id}
                    selected>
              {healthworker.name}</option>
          )
        }
        else {
          return optionsDropDown.push(
            <option key={healthworker.id}
                    value={healthworker.id}>
              {healthworker.name}</option>
          )
        }
      } 
    })
    console.log(this.props.patient)
    return (
      <div className="outer-assign-modal" onClick={this.props.close}>
        <div className="inner-assign-modal" onClick={(e)=> {e.stopPropagation()}}>
        <button id='close-button' onClick={this.props.close}> close </button>
          <span> 
            <h2>Patient: {patient.name}</h2>
              <hr></hr>

            <h2>Current Healthworker:</h2>
              <h2>  
               {
                 this.props.patient.healthworker_name === null 
                 ?
                  ' Not Assigned '
                 :
                 `${this.props.patient.healthworker_name}`
                }
              </h2> 
               <hr></hr>
          </span>

          <div>
            <h3>Recommended Healthworker By Closest Distance:</h3>
              <select id="select-box" onChange={ (e) => {this.handleDropDownChange(e)}}>
                {  optionsDropDown } 
              </select>
          </div>
          <br></br>
          <button onClick={ () => {this.props.assignHealthworkerToPatient(this.props.patient.id, this.state.healthworkerId); this.props.close()}}>Save Changes</button>
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    healthworkersData: state.healthworkers.healthworkersData, 
    patientsData: state.patients.patientsData,
  }
}
export default connect(mapStateToProps, { assignHealthworkerToPatient })(AssignPatientModal)