import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import '../CSS/Charts.css'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { getMap } from '../redux/reducers/mapReducer'
import { getPatients, setReturnedFalse } from '../redux/reducers/patientsReducer'
import { logout, getUser } from '../redux/reducers/verifiedUser'
import { Link } from 'react-router-dom';
import PatientPopup from '../components/patientPopup'
import OutpostPopup from '../components/outpostPopup'
import HealthworkerPopup from '../components/healthworkerPopup'
import limePatient from '../components/symbols/woman_lime.png'
import greenPatient from '../components/symbols/woman_green.png'
import aquaPatient from '../components/symbols/woman_aqua.png'
import pinkPatient from '../components/symbols/woman_alert_10.png'
import outpostHut from '../components/symbols/hut_white_outline_filled.png'
import kyle from '../components/symbols/kyle.png'
import Slideout from './Slideout'
import FooterData from './FooterData'
import * as turf from '@turf/turf'
import axios from 'axios'
import {clickedPatientAddress, clickedHWAddress, clickedOutpostAddress} from '../redux/reducers/formReducer'
import {patientDataChecker} from '../utils/patientAlertFunction'

loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      patientsAtRisk: [],
      patientsAwaitingAssignment: [],
      patientLocationData: [],
      clickLat: '',
      clickLon: '',
      patientsInEmergency: [],
      activeAlertIds: [],
      alertUpdate: null
    }
  }

  componentDidMount() {
    this.props.getUser()
    loadModules(['esri/Map',
      'esri/views/MapView',
      'esri/views/SceneView',
      'esri/widgets/Legend',
      'esri/widgets/BasemapToggle',
      'esri/layers/GraphicsLayer',
      "esri/geometry/SpatialReference",
      "esri/geometry/geometryEngine",
      // "esri/geometry/webMercatorUtils",
      // "esri/InfoTemplate",
    ]).then(async ([Map, MapView, SceneView, Legend, BasemapToggle, GraphicsLayer, SpatialReference, geometryEngine, webMercatorUtils, InfoTemplate]) => {

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

      // buttonWidget.addEventListener("click", function () {
      //   const expanded = panel.classList.contains("panel-expanded")
      //   if (expanded) {
      //     panel.classList.remove("panel-expanded")
      //   } else {
      //     panel.classList.add("panel-expanded")
      //   }
      // })
      await this.props.getMap(mapObj)

      await mapView.ui.add(toggle, "top-left")
      await mapView.ui.add(legend, "top-right")
      // await mapView.ui.add(buttonWidget, "bottom-left")

      // ADD THIS BACK IN PRODUCTION
      //  mapView.GoTo // zooming feature
      const speedOption = {
        speedFactor: 0.3,
        easing: "ease-in-out"
      }

      await mapView.goTo({
        target: [-12.179104, 9.101593, 50000],
        heading: 0,
        tilt: 0,
        zoom: 9,
        speedFactor: 0.2
      }, speedOption)

      // Function to query the w3w API and return lat/lon
      let w3wGeocoder = (lat, lon)=>{
        // Execute a reverse geocode using the clicked location
        axios.get(`https://api.what3words.com/v2/reverse?coords=${lat}%2C${lon}&key=R7MAUPYF`).then(reverseGeocoding=>{
        if(this.props.patientAddressSelector){
          //Set the props of the patient address
          console.log('Update the patient input', reverseGeocoding.data.words)
          this.props.clickedPatientAddress(reverseGeocoding.data.words)
        } else if (this.props.hcwAddressSelector){
          console.log('Update the hcw input', reverseGeocoding.data.words)
          this.props.clickedHWAddress(reverseGeocoding.data.words)
        } else if (this.props.outpostAddressSelector){
          console.log('Update the outpost input', reverseGeocoding.data.words)
          this.props.clickedOutpostAddress(reverseGeocoding.data.words)
        }

        }).catch(function (error) {
          // If the promise fails and no result is found, show a generic message
          "No address was found for this location";
        });
      }

      // Conditionally allow this function to fire 
      let ref = this;
      mapView.on("click", function (event) {
        var lat = event.mapPoint.latitude;
        var lon = event.mapPoint.longitude;
        // mapView.popup.open({
        //   // Set the popup's title to the coordinates of the location
        //   title: "Reverse geocode: [" + lon + ", " + lat + "]",
        //   location: event.mapPoint // Set the location of the popup to the clicked location
        // });
        ref.setState({
          clickLat: lat,
          clickLon: lon
        })
        if (ref.props.toggleGeoCoder){
        w3wGeocoder(lat, lon)
        console.log(lat)
        console.log(lon)
      }
    })

      // Script to determine the distance between each patient and a health worker using Turf

      let { healthworkerData, patientData, outpostsData } = this.props

      // Here we convert patient lat/lon strings to geojson coordinates interpretable by turf
      let patientGeoJson = []
      patientData.forEach(patient => {
        if (patient.latitude && patient.longitude){
          patientGeoJson.push(turf.point([patient.latitude, patient.longitude, { "id": patient.id,
          "name": patient.name, "patientPhone": patient.phone, "patientLat": patient.latitude, "patientLon": patient.longitude }]))
        } else {
          return null
        }
      })

      // Here we convert healthworker lat/lon strings to geojson coordinates interpretable by turf
      let healthworkerGeoJson = []
      healthworkerData.forEach(healthworker => {
        if (healthworker.latitude && healthworker.longitude){
          healthworkerGeoJson.push(turf.point([healthworker.latitude, healthworker.longitude, { 
            "healthworkerId": healthworker.id, 
            "name": healthworker.name,
            "hw_phone": healthworker.phone  }]))
        } else {
          return null
        }
      })

      // This turns the individual health worker points into a collection interpretable by turf
      let hwPoints = turf.featureCollection(healthworkerGeoJson)

      // Here we calculate the distance to the nearest health outpost
      // We assume that patients outside of the buffers (A 25km radius) are at risk in the event of complications arising during labor

      // Here we convert outpost lat/lon strings to geojson coordinates interpretable by turf
      let outpostGeoJson = []
      outpostsData.forEach(outpost => {
        if (outpost.latitude && outpost.longitude) {
          outpostGeoJson.push(turf.point([outpost.latitude, outpost.longitude, { "name": outpost.name }]))
        } else {
          return null
        }
      })

      // This turns the individual outpost points into a collection interpretable by turf
      let outpostPoints = turf.featureCollection(outpostGeoJson)

      // Here we build an object that contains the returned geometries from a nearest point calculation and push it to a new array

      let patientDistArr = []

      patientGeoJson.forEach(patient => {
        let patientName = patient.geometry.coordinates[2]
        let nearest = turf.nearestPoint(patient, hwPoints, { units: 'kilometers' })
        let nearestOutpost = turf.nearestPoint(patient, outpostPoints, { units: 'kilometers' })
        // console.log("Nearest point object", nearest)
        let patientDistance = {}
        patientDistance.patientId = patientName.id
        patientDistance.patientName = patientName.name
        patientDistance.patientLat = patientName.patientLat
        patientDistance.patientLon = patientName.patientLon

        patientDistance.nearestHWName = nearest.geometry.coordinates[2].name
        patientDistance.nearestHWId = nearest.geometry.coordinates[2].healthworkerId
        patientDistance.nearestHWDistanceKM = nearest.properties.distanceToPoint
        patientDistance.nearestHWLat = nearest.geometry.coordinates[0]
        patientDistance.nearestHWLon = nearest.geometry.coordinates[1]
        patientDistance.nearestOutpostName = nearestOutpost.geometry.coordinates[2].name
        patientDistance.nearestOutpostDistKM = nearestOutpost.properties.distanceToPoint
        patientDistance.nearestOutpostLat = nearestOutpost.geometry.coordinates[0]
        patientDistance.nearestOutpostLon = nearestOutpost.geometry.coordinates[1]
        // console.log(patientToHWDistance)
        patientDistArr.push(patientDistance)
      })

      // Here we set the state of the the geographic processed data
      this.setState({
        patientLocationData: patientDistArr
      })

      // Now we can use the above array of objects to alert the nearest healthworker in an emergency, assign the patient to the nearest healthworker, and identify patients outside of sevice areas

      let newPatientAtRisk = []

      patientDistArr.forEach(patient => {
        if (patient.nearestOutpostDistKM >= 25) {
          let patObj = {}
          patObj.patientName = patient.patientName
          patObj.patientLat = patient.patientLat
          patObj.patientLon = patient.patientLon
          newPatientAtRisk.push(patObj)
        } else {
          return null
        }
      })

      // This sets the state of patients who are outside of the service areas

      this.setState({
        patientsAtRisk: newPatientAtRisk
      }
      )

      let newPatientAssignement = []

      patientData.forEach(patient => {
        // console.log(patient)
        for (let i = 0; i < patientDistArr.length; i++) {
          if (patientDistArr[i].patientName === patient.name) {
            // console.log("Assigned HW name",patient.healthworker_name)
            // console.log("Nearest HW name", patientDistArr[i].nearestHWName)
            if (patient.healthworker_name !== patientDistArr[i].nearestHWName) {
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

    //This sets interval for reload of getting patient data

    const alertUpdate = setInterval(() => {
      console.log('ARE YOU FIRING??')
      // toast.dismiss()
      this.props.getPatients()
    }, 10000)
  }
  //END OF COMPONENT DID MOUNT


  componentDidUpdate() {
    // Checking DB for true alert status and rendering alerts
    if (this.props.patientData.length && this.props.returnedData) {

      let { patientData } = this.props
      let currentPatientAlerts = patientDataChecker(patientData)
      // patientData.forEach(patient => {
      //   if (patient.alert === true) {
      //     currentPatientAlerts.push(patient)
      //   }
      // })
      let activeIdCopy = [...this.state.activeAlertIds]
      if (currentPatientAlerts.length) {
        console.log(currentPatientAlerts)
        for (let i = 0; i < currentPatientAlerts.length; i++) {
          if (activeIdCopy.indexOf(currentPatientAlerts[i].survey_id) === -1) {
            activeIdCopy.push(currentPatientAlerts[i].survey_id)
            this.notify(currentPatientAlerts[i])
          }
        }
        this.setState({
          activeAlertIds: activeIdCopy
        })
      }
    
      this.props.setReturnedFalse()
      this.setState({
        patientsInEmergency: currentPatientAlerts
      })
    }
  }

  //Toast for alert when patient texts 'emergency'
  notify = (patient) => {
    toast.error(<span style={{ paddingBottom: '15px' }}><h5>Emergency Alert</h5>Patient name: {patient.name} <br />Patient location: {patient.location} <br />Patient contact: {patient.phone}
    </span>, {
        position: toast.POSITION.BOTTOM_LEFT,
        onClose: (e) => {
          // console.log('patient id',patient)
          axios.put(`/api/surveys/alert/${patient.survey_id}`, patient).then(response => {
            // response.data
            let activeIdCopy = [...this.state.activeAlertIds];
            let index = activeIdCopy.indexOf(patient.survey_id)
            activeIdCopy.splice(index, 1)
            this.setState({
              activeAlertIds: activeIdCopy
            })
          })
        }
      })

  }

  // buttons for different community zooms
  sierraLeonClick = () => {
    this.props.mapView.goTo({
      target: [-11.618979, 9.128167],
      zoom: 8,
      speedFactor: 0.1
    })
  }

  communityClick = (long, lat) => {
    this.props.mapView.goTo({
      target: [+long, +lat],
      zoom: 12
    }, this.communityClickOption)
  }
  communityClickOption = {
    speedFactor: 2,
    easing: "ease-in-out"
  }

  render() {
    // let {map, mapView, legend} = this.props
    const CloseButton = ({ closeIt }) => {
      return (
        <i
          className="marterial-icons"
          onClick={closeIt}> X
      </i>
      )
    }
    
    let communityButtons = []
    this.props.outpostsData.map(outpost => {
      if (outpost.id !== 0) {
        communityButtons.push(
          <button onClick={() => this.communityClick(outpost.longitude, outpost.latitude)} key={outpost.id}>Community {outpost.id}</button>
        )
      }
      return communityButtons
    })

    if (this.props.adminLoggedIn) {
      return (
        <div className='wrapper'>
          <div className="dashboard-header-container">
            <div className="dashboard-logo">
              <img src={require("../logo_transparent.png")} alt="" style={{ height: '50px', width: '50px' }} />
            </div>
            <div className="dashboard-name">
              <h3 style={{ color: 'white', fontFamily: 'Raleway' }}>GeoNet Medical Response</h3>
            </div>
            <div className="logout-container">
              <button className="logout-button"><Link style={{ color: 'white', textDecoration: 'none' }} onClick={this.props.logout} to="/">Logout</Link></button>
            </div>
            <div>
              <ToastContainer style={{marginBottom: '10%'}} autoClose={false} closeButton={<CloseButton closeIt={this.notify.onClose}/>}/>
            </div>
          </div>
          <PatientPopup />
          <OutpostPopup />
          <HealthworkerPopup />
          <div className="map" id="mapDiv">
            <Slideout />
          </div>
          <div className='esri-attribution__sources esri-interactive'>
            <button onClick={this.sierraLeonClick}>Sierra Leone</button>
            {communityButtons}
          </div>

          <div id="panel">
            <h2>COLOR AND SIZING LEGEND</h2>
            <div id='panel-details'>
              <div className='panel-line'>
                <img src={pinkPatient} className='icons' alt="alert icon"></img>
                <p>Patient Alert Active</p>
              </div>
              <div className='panel-line'>
                <img src={limePatient} className='icons' alt="third trimester icon"></img>
                <p> Patient in Third Trimester</p>
              </div>
              <div className='panel-line'>
                <img src={greenPatient} className='icons' alt="second trimester icon"></img>
                <p> Patient in Second Trimester</p>
              </div>
              <div className='panel-line'>
                <img src={aquaPatient} className='icons' alt="first trimester icon"></img>
                <p>Patient in First Trimester</p>
              </div>
              <div className='panel-line'>
                <img src={outpostHut} className='icons' alt="outpost icon"></img>
                <p> Outpost Location</p>
              </div>
              <div className='panel-line'>
                <img src={kyle} className='icons' alt="kyle icon" style={{ minHeight: '50px' }}></img>
                <p> Healthworker</p>
              </div>
            </div>
          </div>
          <FooterData patientsOutsideService={this.state.patientsAtRisk} 
                      lat={this.state.clickLat} 
                      lon={this.state.clickLon}
                      patientsAwaitingAssignment={this.state.patientsAwaitingAssignment}
                      patientsLocationData={this.state.patientLocationData}/>
        </div>

      ) 
    } else {
      return (
        <div>
          <div className="denied-container">
            <button className="denied-button"><Link style={{ textDecoration: 'none', color: 'white' }} to="/">Please Login To Gain Access</Link></button>
          </div>
        </div>
      )
    }
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
    toggleGeoCoder: state.newForm.toggleGeocoder,
    openModal: state.newForm.openModal,
    patientAddressSelector:state.newForm.patientAddressSelector,
    hcwAddressSelector:state.newForm.hcwAddressSelector, 
    outpostAddressSelector:state.newForm.outpostAddressSelector,
    returnedData: state.patients.returnedData,
    adminLoggedIn: state.logout.adminLoggedIn
  }
}

export default connect(mapStateToProps, { getMap, clickedPatientAddress, clickedHWAddress, clickedOutpostAddress, getPatients, setReturnedFalse, logout, getUser })(Dashboard)
