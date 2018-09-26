import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatients, getPatientGraphic } from '../redux/reducers/patientsReducer'
import { loadModules } from 'esri-loader'
import * as moment from 'moment'

class PatientPopup extends Component {
 
  componentDidMount() {
    this.props.getPatients()
  }
  
  componentDidUpdate(prevProps) {
    let {patientsData} = this.props
    
    if ((!prevProps.mapView.graphics && this.props.mapView.graphics && patientsData) || (!prevProps.patientsData.length && this.props.patientsData.length && this.props.mapView.graphics)) {

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
      let today = moment(todayUnformatted).format('YYYY/MM/DD')
      let dueDateFormatted = moment(patient.duedate).format('YYYY/MM/DD')
      let monthsUntilDueDate = moment(dueDateFormatted).diff(moment(today), 'months', true)

       
        let color

          if (monthsUntilDueDate <= 3 ) {
            color = require('./symbols/woman_lime.png')
          } else if ( monthsUntilDueDate > 3 && monthsUntilDueDate <= 6 ) {
            color =  require('./symbols/woman_green.png')
          } else {
            color = require('./symbols/woman_aqua.png')
          }

          let markerSymbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: color,
            contentType: 'image/png',
            width: "28px",
            height: "28px"
          };

          const PopupTemplate = {
            title: "Patient Information",
            content: [{
              type: "text",
              text: `
                <span><h4>Location: ${patient.location}</h4></span>
                <span><h4>Patient Name: ${patient.name}</h4></span>
                <span><h4>Age:  ${patient.age}</h4></span>
                <span><h4>Sex:  ${patient.sex}</h4></span>
                <span><h4>Due Date:  ${moment(patient.duedate).format('YYYY/MM/DD')}</h4></span>
                <span><h4>Phone:  ${patient.phone}</h4></span>
                <span><h4>Family Plan:  ${patient.famplan}</h4></span>
                <span><h4>Alert:  ${patient.alert}</h4></span>
               </h4></span>
                `
            }]
          }

    
      const patientGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: PopupTemplate
      })
          this.props.mapView.graphics.add(patientGraphic)
        })
      })
    }
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
    patientsData: state.patients.patientsData,
    patientGraphic: state.patients.patientGraphic,
    mapView: state.map.mapView
  }
}
export default connect( mapStateToProps, { getPatients, getPatientGraphic})(PatientPopup)