import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatients, getPatientGraphic, setCurrentPatient } from '../redux/reducers/patientsReducer'
import { loadModules } from 'esri-loader'
import * as moment from 'moment'
import alert from './symbols/woman_alert_9.png'

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
        'esri/Graphic',
        "esri/geometry/geometryEngine",
        'esri/tasks/support/DistanceParameters',
        'esri/tasks/GeometryService',
        "esri/geometry/Point",
        "esri/geometry/SpatialReference",
        "esri/geometry/Multipoint"
      ]).then(([Graphic, geometryEngine, DistanceParameters, GeometryService, Point, SpatialReference, Multipoint]) => {
      patientsData.forEach( patient => {
        const point = new Point ({
          type: "point",
          longitude: patient.longitude,
          latitude: patient.latitude,
          spatialReference: new SpatialReference({ wkid: 3857 })
        })

        this.props.patientPointGeometry.push(point)   



//********************* Code block to calculate nearest HW ******************************************/

      // console.log(patient)
      // Calculate distance between patient and nearest HCW
      // let distanceArr = []

      //   for (let i =0; i < this.props.healthworkerPointGeometry.length; i++){
      //     // console.log(this.props.healthworkerPointGeometry[i])
      //     let distanceBetween
      //     distanceBetween = geometryEngine.distance(this.props.healthworkerPointGeometry[i], point, 9036)
      //     // console.log(distanceBetween)
      //     let healthworkerName 
      //     healthworkerName= this.props.healthworkerData[i].name
      //     // console.log(healthworkerName)
      //     let obj = {}
      //     obj = {
      //       distance: distanceBetween,
      //       name: healthworkerName
      //     }
      //     distanceArr.push(obj)
      //   }

      //   function dynamicSort(property) {
      //       var sortOrder = 1;
      //       if(property[0] === "-") {
      //           sortOrder = -1;
      //           property = property.substr(1);
      //       }
      //       return function (a,b) {
      //           var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      //           return result * sortOrder;
      //       }
      //   }

      //   let sortedArr 
      //   sortedArr = distanceArr.sort(dynamicSort("distance"))

      //     console.log('distanceArr', distanceArr)
      //     // let sortedArr = distanceArr.distance.sort((function(a, b){return a-b}))
      //     // let closestHealthworker = sortedArr
      //     console.log('patient', patient.name)
      //     console.log('This is the distance from nearest HW', sortedArr[0].distance)
      //     console.log('This is the name of the nearest HW', sortedArr[0].name)

//***********************************************************************************/


        // date formatting 
        let todayUnformatted = new Date()
        let today = moment(todayUnformatted)
        let dueDateFormatted = moment(patient.duedate)
        let monthsUntilDueDate = moment(dueDateFormatted).diff(moment(today), 'months', true)

        let color
        let width
        let height

          if (patient.alert === true){
            color = alert
            width = "70px"
            height = "70px"
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
              <span><h4>Due Date:  ${moment(patient.duedate).format('YYYY/MM/DD')}</h4></span>
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
    mapView: state.map.mapView,
    healthworkerPointGeometry: state.healthworkers.healthworkerPointGeometry,
    healthworkerData: state.healthworkers.healthworkersData,
    patientPointGeometry: state.patients.patientPointGeometry

  }
}
export default connect( mapStateToProps, { getPatients, getPatientGraphic, setCurrentPatient })(PatientPopup)