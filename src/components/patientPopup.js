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
      'esri/Graphic',
      "esri/renderers/ClassBreaksRenderer",
      "esri/layers/FeatureLayer"
    ]).then(([Graphic, ClassBreaksRenderer, FeatureLayer]) => {
        patientsData.forEach( patient => {
          const point = {
            type: "point",
            longitude: patient.longitude,
            latitude: patient.latitude
          }
         
          const markerSymbol = {
            type: "simple-marker",
            outline: {
              color: [255, 215, 0, 1],
              width: 2
            }
          }
          const PopupTemplate = {
            title: "Patient Information",
            content: [{
              type: "text",
              text: `
                <span><h4>Location: ${patient.location}</h4></span>
                <span><h4>Patient Name: ${patient.name}</h4></span>
                <span><h4>Age:  ${patient.age}</h4></span>
                <span><h4>Sex:  ${patient.sex}</h4></span>
                <span><h4>Due Date:  ${patient.duedate}</h4></span>
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
          
          const renderer = {
            type: "class-breaks",
            field: "DUE_DATE"
          }
          // renderer.addClassBreakInfo ({
          //   minVal: 0,
          //   maxValue: 1,
          //   symbol: {
          //     type: 'point-3d',
          //     symbolLayers: [{
          //       type: "object",
          //       resource: { primitive: "cone" },
          //       material: { color: [0,169,230] },
          //       height: 200,
          //       width: 200
          //     }]
          //   }
          // })
          // renderer.addClassBreakInfo ({
          //   minVal: 1.1,
          //   maxValue: 2,
          //   symbol: {
          //     type: 'point-3d',
          //     symbolLayers: [{
          //       type: "object",
          //       resource: { primitive: "cone" },
          //       material: { color: [255,255,255] },
          //       height: 500,
          //       width: 500
          //     }]
          //   }
          // })

          // renderer.addClassBreakInfo ({
          //   minVal: 2.1,
          //   maxValue: 3,
          //   symbol: {
          //     type: 'point-3d',
          //     symbolLayers: [{
          //       type: "object",
          //       resource: { primitive: "cone" },
          //       material: { color: [255,255,255] },
          //       height: 800,
          //       width: 800
          //     }]
          //   }
          // })

        const layer = new FeatureLayer ({
          renderer: renderer
        })


        


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