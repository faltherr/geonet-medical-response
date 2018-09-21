import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatients, getPatientGraphic } from '../redux/reducers/patientsReducer'
import { loadModules } from 'esri-loader'


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
         
          const markerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          }
    
          const patientGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
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