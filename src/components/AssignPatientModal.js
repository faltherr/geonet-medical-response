import React, { Component } from 'react'
import '../CSS/assignPatientModal.css'
import { connect } from 'react-redux'

class AssignPatientModal extends Component {
  render () {
    let { patient } = this.props

    return (
      <div className="outer-assign-modal" onClick={this.props.close}>
        <div className="inner-assign-modal" onClick={ (e)=> {e.stopPropagation()}}>
      
          <span> 
            <h2>Your Current Assigned Healthworker is:</h2>  
              <input value={`${this.props.patient.healthworker_name}`}/>
          </span>
        <br></br>

          <span> 
            <h2>Recommended Healthworker by Closest Distance is:</h2>  
              <input />
          </span>
        <br></br>

          <span>
            <h2>All Healthworkers In The Field:</h2>
              <form id="create-form">
                <input />
              </form>
          </span>
        <br></br>

          <button>Save</button>

          
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    healthworkerData: state.healthworkers.healthworkerData
  }
}
export default connect(mapStateToProps, null)(AssignPatientModal)