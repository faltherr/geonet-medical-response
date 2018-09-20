import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatientGraphic } from '../redux/reducers/patientsReducer'
// import { getMap } from '../redux/reducers/mapReducer'
import { loadModules } from 'esri-loader'


class PatientPopup extends Component {
 

  componentDidUpdate(prevProps) {
    
    if(!prevProps.mapView.graphics) {
    loadModules([
      'esri/Graphic'
    ]).then(([Graphic]) => {

      const point = {
        type: "point", // autocasts as new Point()
        longitude: -49.97,
        latitude: 41.73
      }

      const markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      }

      const patientGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });
      this.props.mapView.graphics.add(patientGraphic)
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
    patientData: state.patients.patientData,
    patientGraphic: state.patients.patientGraphic,
    mapView: state.map.mapView
  }
}
export default connect( mapStateToProps, { getPatientGraphic})(PatientPopup)