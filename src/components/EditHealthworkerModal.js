import React, { Component } from 'react'
// import axios from 'axios'

class EditHealthworkerModal extends Component {
  state = {
    healthworker: {}
  }
  componentDidMount () {
    let { healthworkerData, healthworkerId } = this.props
    healthworkerData.forEach( healthworker => {
      if (healthworker.id === +healthworkerId) {
        this.setState ({
          healthworker: healthworker
        })
      }
    })
  }


  render () {
    return (
      <div className="outer-modal" onClick={this.props.hideModal}>
        <div className="inner-modal" onClick={(e) => {e.stopPropagation()}}>
        <h1>Edit Healthworker Information</h1>
        <input placeholder = {`${this.state.healthworker.name}`}/>
        <input placeholder = {`${this.state.healthworker.phone}`}/>
        <input placeholder = {`${this.state.healthworker.location}`}/>
        </div>
      </div>
    )
  }
}
export default EditHealthworkerModal