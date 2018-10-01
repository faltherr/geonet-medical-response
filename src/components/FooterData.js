import React, { Component } from 'react';
import '../CSS/footerData.css'
import { connect } from 'react-redux'
import { getPatients } from '../redux/reducers/patientsReducer'
import NewDataMenu from './NewDataMenu'
import Modal from 'react-responsive-modal';

class FooterData extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false
    }
  }
  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };
  render () {
    let patientsOutsideServiceArea = this.props.patientsOutsideService.map(element=>{
      return <p key={element}>{element}</p>
    })
    return (
      <div className="footer-wrapper">
        <div className="data-containers">
            <div id='patient-data'><p>Current Patient Alerts</p>
            </div>
            <div id='service-area'>
              <p>Patients outside of service area</p>
              {patientsOutsideServiceArea}
            </div>
            <div id='due-this-month'><p>Expecting This Month</p></div>
            <div id='healthworker-data'><p>Heathworkers in the Field</p></div>
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
    patientsData: state.patients.patientsData
  }
}
export default connect(mapStateToProps, { getPatients })(FooterData)