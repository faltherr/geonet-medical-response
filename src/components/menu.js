import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'

class Menu extends Component {
  
  componentDidMount() {
    this.props.getPatients()
  }

  render () {
   
   console.log(this.props.patientData)
    return (
      <div>
        HELLO
        {
          this.props.patientData.map( patient => {
            return (
              <div>
                  <p>{patient.name}</p>
                  <p>{patient.location}</p>
                  <p>{patient.latitude}</p>
                  <p>{patient.longitude}</p>
              </div>
            )
          })
        }
         
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    patientData: state.patients.patientData
  }
}
export default connect( mapStateToProps, { getPatients })(Menu);