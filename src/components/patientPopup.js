import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatients, getPatientGraphic, setCurrentPatient } from '../redux/reducers/patientsReducer'
import { loadModules } from 'esri-loader'
import * as moment from 'moment'
import alert from './symbols/woman_alert_10.png'

import EditPatientModal from '../components/EditPatientModal'

class PatientPopup extends Component {
    constructor () {
      super()
       this.state = {
        show: false,
        patientId: '',
        patientGraphics: [],
        currentGraphic: null,
        currentPatient: null
    }
  }

  componentDidMount() {
    this.props.getPatients()
  }

  componentWillReceiveProps(props) {
    if (props.patientsData) {
      this.createGraphics(props)
    }
  }
  
  createGraphics = (props) => {
    let { patientsData } = props
    // console.log(11111111, patientsData)
    if (this.props.mapView.graphics) {
      this.state.patientGraphics.forEach(graphic => {
        this.props.mapView.graphics.remove(graphic)
      })
    }
    if (true) {
      loadModules([
        'esri/Graphic'
      ]).then(([Graphic]) => {
      patientsData.forEach( patient => {
        const point = {
          type: "point",
          longitude: patient.longitude,
          latitude: patient.latitude
        }

        // date formatting 
        let todayUnformatted = new Date()
        let today = moment(todayUnformatted).format('MM/DD/YYYY')
        let dueDateFormatted = moment(patient.duedate).format('MM/DD/YYYY')
        let monthsUntilDueDate = moment(dueDateFormatted).diff(moment(today), 'months', true)

        let color
        let width
        let height

          if (patient.alert === true){
            color = alert
            width = "35px"
            height = "35px"
          } else if (monthsUntilDueDate <= 3 ) {
            color = require('./symbols/woman_lime.png')
            width = "28px"
            height = "28px"
          } else if ( monthsUntilDueDate > 3 && monthsUntilDueDate <= 6 ) {
            color =  require('./symbols/woman_green.png')
            width = "28px"
            height = "28px"
          } else {
            color = require('./symbols/woman_aqua.png')
            width = "28px"
            height = "28px"
          }

          let markerSymbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: color,
            // contentType: 'image/png',
            width: width,
            height: height,
          };

        const PopupTemplate = {
          title: `Patient Information`,
          content: [{
            type: "text",
            text: `
              <span><h4>Name: ${patient.name}</h4></span>
              <span><h4>Location: ${patient.location}</h4></span>
              <span><h4>Age:  ${patient.age}</h4></span>
              <span><h4>Due Date:  ${moment(patient.duedate).format('MM/DD/YYYY')}</h4></span>
              <span><h4>Phone:  ${patient.phone}</h4></span>
              <span><h4>Family Plan:  ${patient.famplan}</h4></span>
              <span><h4>HIV Status:  ${patient.hiv}</h4></span>
              <span><h4>Parity:  ${patient.parity}</h4></span>
              <span><h4>Alert:  ${patient.alert}</h4></span>
              </h4></span>           
              `
          }],
          actions: [{
            title: "Edit Patient",
            patient: patient,
            className: "esri-icon-user" 
          }]
          }

        // Edit Patient 
        let { showEditModal} = this
        let { patientGraphics } = this.state
        // let { graphics } = this.props.mapView
      
        this.props.mapView.popup && this.props.mapView.popup.on('trigger-action', event => {
          if (event.action.title === "Edit Patient") {
            let patient = event.action.patient
            let { uid } = event.target.content.graphic

            let currentGraphic;
            patientGraphics.forEach(graphic => {
              if (+graphic.uid === +uid) {
                currentGraphic = graphic
              }
            })
            showEditModal(patient, currentGraphic)
          }
        })

        const patientGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          popupTemplate: PopupTemplate
        })

        patient.graphic = patientGraphic

        this.setState({
          patientGraphics: [ ...this.state.patientGraphics, patientGraphic ]
        })
        this.props.mapView.graphics && this.props.mapView.graphics.add(patientGraphic)
      })
    })
  }
}

showEditModal = (patient, graphic) => { 
  this.props.setCurrentPatient(patient)
  this.setState({ 
    showModal: true,
    currentGraphic: graphic,
    currentPatient: patient
  })
}

hideEditModal = () => { this.setState({ showModal: false })}

  render () {
    return (
      <div>
        { this.state.showModal
          &&
          <EditPatientModal 
            show={this.state.show} 
            hideModal={this.hideEditModal}
            patientsData={this.props.patientsData}
            patientId={this.state.patientId}
            graphic={this.state.currentGraphic}
          />
        }
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData,
    patientGraphic: state.patients.patientGraphic,
    mapView: state.map.mapView
  }
}
export default connect( mapStateToProps, { getPatients, getPatientGraphic, setCurrentPatient })(PatientPopup)