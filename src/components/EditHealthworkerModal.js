import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateHealthworker, setCurrentHealthworker } from '../redux/reducers/healthworkersReducer'

class EditHealthworkerModal extends Component {
  state = {
    healthworker: {}
  }
  componentDidMount () {
    this.setState({
      healthworker: this.props.selectedHealthworker
    })
  }

  handleChange = (e, key) => {
    this.setState({
      healthworker: {...this.state.healthworker, [key] : e.target.value}
    })
  }

  updateGraphic = () => {
    let { healthworker } = this.state
    let { graphic } = this.props

    let content = [{
      type: "text",
      text: `
        <span><h4>Name:  ${healthworker.name}</h4></span>
        <span><h4>Coordinates:  ${healthworker.latitude}, ${healthworker.longitude}</h4></span>
        <span><h4>Email:  ${healthworker.email}</h4></span>
        <span><h4>Outpost:  ${healthworker.outpost_id}</h4></span>
        <span><h4>Phone:  ${healthworker.phone}</h4></span>
          `
    }]

      this.props.setCurrentHealthworker(healthworker)
      graphic.popupTemplate.content = content
  }

  render () {
    console.log('props', this.props)
    return (
      
      <div className="outer-modal" onClick={this.props.hideModal}>
        <div className="inner-modal" onClick={(e) => {e.stopPropagation()}}>
          <h3>Edit Healthworker Information</h3>

          <p>Name:</p><input onChange={ (e) => {this.handleChange(e, 'name')}} value={`${this.state.healthworker.name}`}/>

          <p>Phone:</p><input onChange={ (e) => {this.handleChange(e, 'phone')}} value={`${this.state.healthworker.phone}`}/>

          <p>Email:</p><input onChange={ (e) => {this.handleChange(e, 'email')}} value={`${this.state.healthworker.email}`}/>

          <p>Location:</p><input onChange={ (e) => {this.handleChange(e, 'name')}} value={`${this.state.healthworker.location}`}/>

          <p>In Field:</p><input onChange={ (e) => {this.handleChange(e, 'in_field')}} value={`${this.state.healthworker.in_field}`}/>

          <button onClick={ () => {this.props.updateHealthworker(this.state.healthworker.id, this.state.healthworker, this.updateGraphic); this.props.hideModal()}}>Save Changes</button>

        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    currentHealthworker: state.healthworkers.currentHealthworker
  }
}
export default connect(mapStateToProps, { updateHealthworker, setCurrentHealthworker })(EditHealthworkerModal)