import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import '../CSS/Charts.css'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import { getMap } from '../redux/reducers/mapReducer'
import DemoPatientPopup from '../components/DemoPatientPopup'
import DemoOutpostPopup from '../components/DemoOutpostPopup'
import DemoHealthworkerPopup from '../components/DemoHealthworkerPopup'
import limePatient from '../components/symbols/woman_lime.png'
import greenPatient from '../components/symbols/woman_green.png'
import aquaPatient from '../components/symbols/woman_aqua.png'
import pinkPatient from '../components/symbols/woman_alert_10.png'
import outpostHut from '../components/symbols/hut_purple.png'
import diamond from '../images/diamond.png'
import Slideout from './Slideout'
import DemoFooterData from './DemoFooterData'
import DemoNewDataMenu from './DemoNewDataMenu'
import Modal from 'react-responsive-modal';
import * as turf from '@turf/turf'


loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class DemoDashboard extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false,
      patientsAtRisk: [],
      patientsAwaitingAssignment : [],
      patientLocationData: []
    }
  }

  componentDidMount() {

    loadModules(['esri/Map',
      'esri/views/MapView',
      'esri/views/SceneView',
      'esri/widgets/Legend',
      'esri/widgets/BasemapToggle',
      'esri/layers/GraphicsLayer',
      "esri/geometry/SpatialReference",
      "esri/geometry/geometryEngine"
    ]).then(async ([Map, MapView, SceneView, Legend, BasemapToggle, GraphicsLayer, SpatialReference, geometryEngine]) => {

      const map = await new Map({
        basemap: 'streets-night-vector'
      })

      const mapView = await new SceneView({
        container: 'mapDiv',
        map,
        center: [-11.271115, 8.568134],
        scale: 50000000,
        padding: { top: 10 },
        spatialReference: new SpatialReference({ wkid: 3857 })
      })

      mapView.breakpoints = {
        xsmall: 544,
        small: 677,
        medium: 1024,
        large: 1200
      }

      let mapObj = {
        map,
        mapView
      }

      // legend and rendering
      const panel = document.getElementById("panel")
      const legend = await new Legend({
        view: mapView,
        container: panel
      })
      //basemap toggle 
      const toggle = await new BasemapToggle({
        view: mapView,
        nextBasemap: "hybrid"
      })

      //button that opens legend 
      const buttonWidget = document.createElement("div")
      buttonWidget.id = "buttonWidget"
      buttonWidget.className = "esri-widget esri-component esri-widget-button esri-interactive"
      buttonWidget.innerHTML = "<span aria-hidden='true' role='presentation' class='esri-icon esri-icon-layers'></span>"

      buttonWidget.addEventListener("click", function () {
        const expanded = panel.classList.contains("panel-expanded")
        if (expanded) {
          panel.classList.remove("panel-expanded")
        } else {
          panel.classList.add("panel-expanded")
        }
      })
      await this.props.getMap(mapObj)

      await mapView.ui.add(toggle, "top-left")
      await mapView.ui.add(legend, "top-right")
      await mapView.ui.add(buttonWidget, "top-right")

      // ADD THIS BACK IN PRODUCTION
      //  mapView.GoTo // zooming feature
      // const speedOption = {
      //   speedFactor: 0.3,
      //   easing: "ease-in-out"
      // }

      await mapView.goTo({
        target: [-12.179104, 9.101593, 50000],
        heading: 0,
        tilt: 40,
        zoom: 9,
        speedFactor: 0.3
      })

      // Script to determine the distance between each patient and a health worker using Turf

      let { healthworkerData, patientData, outpostsData } = this.props

      // Here we convert patient lat/lon strings to geojson coordinates interpretable by turf
      let patientGeoJson = []
      patientData.forEach(patient => {
        patientGeoJson.push(turf.point([patient.latitude, patient.longitude, { "name": patient.name }]))
      })

      // Here we convert healthworker lat/lon strings to geojson coordinates interpretable by turf
      let healthworkerGeoJson = []
      healthworkerData.forEach(healthworker => {
        healthworkerGeoJson.push(turf.point([healthworker.latitude, healthworker.longitude, { "name": healthworker.name }]))
      })

      // This turns the individual health worker points into a collection interpretable by turf
      let hwPoints = turf.featureCollection(healthworkerGeoJson)

      // Here we calculate the distance to the nearest health outpost
      // We assume that patients outside of the buffers (A 25km radius) are at risk in the event of complications arising during labor
      
      // Here we convert outpost lat/lon strings to geojson coordinates interpretable by turf
      let outpostGeoJson = []
      outpostsData.forEach(outpost => {
        if(outpost.latitude){
          outpostGeoJson.push(turf.point([outpost.latitude, outpost.longitude, { "name": outpost.name }]))
        } else{
          return null
        }
      })

      // This turns the individual outpost points into a collection interpretable by turf
      let outpostPoints = turf.featureCollection(outpostGeoJson)

      // Here we build an object that contains the returned geometries from a nearest point calculation and push it to a new array
      
      let patientDistArr = []

      patientGeoJson.forEach(patient => {
        let patientName = patient.geometry.coordinates[2].name
        // console.log(patientName) 
        let nearest = turf.nearestPoint(patient, hwPoints, { units: 'kilometers' })
        let nearestOutpost = turf.nearestPoint(patient, outpostPoints, { units: 'kilometers' })
        // console.log("Nearest point object", nearest)
        let patientDistance = {}
        patientDistance.patientName = patientName
        patientDistance.nearestHWName = nearest.geometry.coordinates[2].name
        patientDistance.nearestHWDistanceKM = nearest.properties.distanceToPoint
        patientDistance.nearestHWLat = nearest.geometry.coordinates[0]
        patientDistance.nearestHWLon = nearest.geometry.coordinates[1]
        patientDistance.nearestOutpostName = nearestOutpost.geometry.coordinates[2].name
        patientDistance.nearestOutpostDistKM = nearestOutpost.properties.distanceToPoint
        patientDistance.nearestOutpostLat= nearestOutpost.geometry.coordinates[0]
        patientDistance.nearestOutpostLon=nearestOutpost.geometry.coordinates[1]
        // console.log(patientToHWDistance)
        patientDistArr.push(patientDistance)
      })

      // Here we set the state of the the geographic processed data
      this.setState({
        patientLocationData: patientDistArr
      })

      // Now we can use the above array of objects to alert the nearest healthworker in an emergency, assign the patient to the nearest healthworker, and identify patients outside of sevice areas
      
      let newPatientAtRisk = []

      patientDistArr.forEach(patient =>{
        if (patient.nearestOutpostDistKM >= 25){
          newPatientAtRisk.push(patient.patientName)
        } else {
          return null
        }
      })

      // This sets the state of patients who are outside of the service areas

      this.setState({
        patientsAtRisk : newPatientAtRisk
      }
      )

      let newPatientAssignement = []

      patientData.forEach(patient => {
        // console.log(patient)
        for (let i = 0; i < patientDistArr.length; i++){
          if (patientDistArr[i].patientName === patient.name){
            // console.log("Assigned HW name",patient.healthworker_name)
            // console.log("Nearest HW name", patientDistArr[i].nearestHWName)
            if (patient.healthworker_name !== patientDistArr[i].nearestHWName){
              newPatientAssignement.push(patient.name)
              // console.log('Patients not assigned to nearest HW:', patient)
            }
          }
        }
      })

      // This sets the state of an array that keeps track of patients that are not assigned to the nearewst health worker

      this.setState({
        patientsAwaitingAssignment: newPatientAssignement
      })

      //This ends the async call to ArcGIS online
    })



  }


  // buttons for different community zooms
  sierraLeonClick = () => {
    this.props.mapView.goTo({
      target: [-11.618979, 9.128167],
      heading: 0,
      tilt: 0,
      zoom: 8,
      speedFactor: 0.1
    })
  }

  communityClick = (long, lat) => {
    this.props.mapView.goTo({
      target: [+long, +lat],
      heading: 40,
      tilt: 10,
      zoom: 12
    }, this.communityClickOption)
  }
  communityClickOption = {
    speedFactor: 2,
    easing: "ease-in-out"
  }

  //Toast for alert when patient texts 'emergency'
  notify = () => {
    toast.error("Emergency Alert from (insert name). Please contact at (insert phone) immediately", {
      position: toast.POSITION.BOTTOM_LEFT
    })
  }
  
  render() {
    // let {map, mapView, legend} = this.props
    let outpostButtons = []

    this.props.outpostsData.map(outpost => {
      if (outpost.id !== 0) {
        outpostButtons.push(
          <button onClick={() => this.communityClick(outpost.longitude, outpost.latitude)} key={outpost.id}>Community {outpost.id}</button>
        )

      }
      return outpostButtons
    })

    // console.log(27482347238482, this.props.currentPatientGraphic)


    return (
      <div className='wrapper'>
        <DemoPatientPopup />
        <DemoOutpostPopup />
        <DemoHealthworkerPopup />
        <div className="map" id="mapDiv">
          <Slideout/>
        </div>
        <div className='esri-attribution__sources esri-interactive'>
          <button onClick={this.sierraLeonClick}>Sierra Leone</button>
          {outpostButtons}
        </div>

        <div id="panel">
          <h2>COLOR AND SIZING LEGEND</h2>
          <div id='panel-details'>
            <div className='panel-line'>
              <img src={aquaPatient} className='icons' alt="first trimester icon"></img>
              <p>Patient in First Trimester</p>
            </div>
            <div className='panel-line'>
              <img src={greenPatient} className='icons' alt="second trimester icon"></img>
              <p> Patient in Second Trimester</p>
            </div>
            <div className='panel-line'>
              <img src={limePatient} className='icons' alt="third trimester icon"></img>
              <p> Patient in Third Trimester</p>
            </div>
            <div className='panel-line'>
              <img src={pinkPatient} className='icons' alt="alert icon"></img>
              <p>Patient Alert Active</p>
            </div>
            <div className='panel-line'>
              <img src={outpostHut} className='icons' alt="outpost icon"></img>
              <p> Outpost Location</p>
            </div>
            <div className='panel-line'>
              <img src={diamond} className='icons' alt="icon"></img>
              <p> Healthworker</p>
            </div>
          </div>
        </div>
        <DemoFooterData patientsOutsideService={this.state.patientsAtRisk} />
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    map: state.map.map,
    mapView: state.map.mapView,
    outpostsData: state.outposts.outpostsData,
    currentPatientGraphic: state.patients.currentPatient,
    patientPointGeometry: state.patients.patientPointGeometry,
    patientData: state.patients.patientsData,
    healthworkerPointGeometry: state.healthworkers.healthworkerPointGeometry,
    healthworkerData: state.healthworkers.healthworkersData,
  }
}
export default connect(mapStateToProps, { getMap })(DemoDashboard)