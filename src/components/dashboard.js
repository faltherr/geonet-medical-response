import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import { connect } from 'react-redux'
import { getMap } from '../redux/reducers/mapReducer'
import PatientPopup from '../components/patientPopup'
import OutpostPopup from '../components/outpostPopup'
import HealthworkerPopup from '../components/healthworkerPopup'
// import PieCharts from '../components/PieCharts'
// import LineCharts from '../components/LineCharts'
import circle from '../images/circle.png'
import x from '../images/x.png'
import diamond from '../images/diamond.png'
import Slideout from './Slideout'
import FooterData from './FooterData'
import NewDataMenu from './NewDataMenu'
import Modal from 'react-responsive-modal';
import * as turf from '@turf/turf'

loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false
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
    ]).then(([Map, MapView, SceneView, Legend, BasemapToggle, GraphicsLayer, SpatialReference, geometryEngine]) => {

      const map = new Map({
        basemap: 'streets-night-vector'
      })

      const mapView = new SceneView({
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
      const legend = new Legend({
        view: mapView,
        container: panel
      })
      //basemap toggle 
      const toggle = new BasemapToggle({
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
      this.props.getMap(mapObj)

      mapView.ui.add(toggle, "top-left")
      mapView.ui.add(legend, "top-right")
      mapView.ui.add(buttonWidget, "top-right")

      // ADD THIS BACK IN PRODUCTION
      //  mapView.GoTo // zooming feature
      // const speedOption = {
      //   speedFactor: 0.3,
      //   easing: "ease-in-out"
      // }

      mapView.goTo({
        target: [-12.179104, 9.101593, 50000],
        heading: 0,
        tilt: 40,
        zoom: 9,
        speedFactor: 0.3
      })

    })
  }

  componentDidUpdate = (prevProps) => {

    let {healthworkerData, patientData} = this.props
    
    let patientGeoJson = []
    patientData.forEach(patient => {
      patientGeoJson.push(turf.point([patient.latitude, patient.longitude, {"name": patient.name}]))
    })

    let healthworkerGeoJson = []
    healthworkerData.forEach(healthworker =>{
      // healthworkerGeoJson.push([healthworker.latitude, healthworker.longitude, {"name": healthworker.name}])
      healthworkerGeoJson.push(turf.point([healthworker.latitude, healthworker.longitude, {"name": healthworker.name}]))
    })
    console.log(healthworkerGeoJson)

    let hwPoints = turf.featureCollection(healthworkerGeoJson)
    console.log('HW Points', hwPoints)

    patientGeoJson.forEach(patient =>{
      let nearest = turf.nearestPoint(patient, hwPoints)
      console.log(nearest)    
    })

  //   var targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
  //   var points = turf.featureCollection([
  //   turf.point([28.973865, 41.011122]),
  //   turf.point([28.948459, 41.024204]),
  //   turf.point([28.938674, 41.013324])
  // ]);

  // console.log("Points", points)

  // var nearest = turf.nearestPoint(targetPoint, points);
  // console.log(nearest)

  
  }

    // console.log(777777777777777777777777777)
    // if (healthworkerData.length !== prevProps.healthworkerData.length){
    // loadModules([
    //   "esri/geometry/geometryEngineAsync",
    //   "esri/geometry/Point",
    //   "esri/geometry/SpatialReference"
    // ]).then(([geometryEngineAsync, Point, SpatialReference]) => {
      //********************* Code block to calculate nearest HW ******************************************/

      // Calculate distance between patient and nearest HCW
      
      // patientData.forEach(patient =>{

      //   const point = new Point ({
      //     type: "point",
      //     longitude: patient.longitude,
      //     latitude: patient.latitude,
      //     spatialReference: new SpatialReference({ wkid: 3857 })
      //   })

      //   let distanceArr = []
      //   for (let i =0; i < healthworkerPointGeometry.length; i++){
      //     // console.log(this.props.healthworkerPointGeometry[i])
      //     geometryEngineAsync.distance(this.props.healthworkerPointGeometry[i], point, 9036).then(response =>{
      //       let dist = response
      //       let healthworkerName 
      //       healthworkerName= healthworkerData[i].name
      //       // console.log(healthworkerName)
      //       let obj = {}
      //       obj = {
      //         distance: dist,
      //         name: healthworkerName
      //       }
      //       distanceArr.push(obj)
      //     })
      //   }
      //   console.log('Distance array2', distanceArr)
        
      // })
      

      // console.log('healthworker geometry', healthworkerPointGeometry.length)

      // for (let i =0; i < patientData.length; i++ ){
      //   for (let j= 0; j<healthworkerData.length; j++){
      //     let distanceArr
      //     if (distanceArr){
      //       geometryEngineAsync.distance(healthworkerPointGeometry[j], patientPointGeometry[i], 9036).then(response=>{

      //     }
      //   }

      //     let distance = response
      //   // console.log(distanceBetween)
      //   let healthworkerName
      //   healthworkerName = this.props.healthworkerData.name
        
      //   // console.log(healthworkerName)
      //   let obj = {}
      //   obj = {
      //     distance: distance,
      //     name: healthworkerName
      //   }
      //   distanceArr.push(obj)
      // })
      // }
        
  
        
        // Function built to sort the distance array
        
        // function dynamicSort(property) {
        //   var sortOrder = 1;
        //   if (property[0] === "-") {
        //     sortOrder = -1;
        //     property = property.substr(1);
        //   }
        //   return function (a, b) {
        //     var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        //     return result * sortOrder;
        //   }
        // }
        
        // let sortedArr
        // sortedArr = distanceArr.sort(dynamicSort("distance"))
        // console.log('This is the sorted array!!!!!', sortedArr)

        // let patient = this.props.patientData[j].name
        
        // let sortedArr = distanceArr.distance.sort((function(a, b){return a-b}))
        // let closestHealthworker = sortedArr
        // console.log('patient', patient)
        // console.log('distanceArr', distanceArr)
        // console.log('This is the distance from nearest HW', sortedArr[0].distance)
        // console.log('This is the name of the nearest HW', sortedArr[0].name)


      //***********************************************************************************/
    // })
  



  // buttons for different community zooms
  sierraLeonClick = () => {
    this.props.mapView.goTo({
      target: [-11.618979, 9.128167],
      heading: 0,
      tilt: 0,
      zoom: 9,
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
    // speedFactor: 0.1,
    easing: "ease-in"
  }

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

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
        <button onClick={() => this.onOpenModal()}>Add New Data</button>
        <Modal open={this.state.openModal} onClose={() => this.onCloseModal()} center>
          <div className="new-data-modal">
            <NewDataMenu closeModal={this.onCloseModal} />
          </div>
        </Modal>

        <div style={{ background: '#01101B' }}><Slideout /></div>
        <PatientPopup />
        <OutpostPopup />
        <HealthworkerPopup />
        <div className="map" id="mapDiv"></div>
        <div className='esri-attribution__sources esri-interactive'>
          <button onClick={this.sierraLeonClick}>Sierra Leone</button>
          {outpostButtons}
        </div>

        <div id="panel">
          <h2>COLOR AND SIZING LEGEND</h2>
          <div id='panel-details'>
            <div className='panel-line'>
              <img src={circle} className='icons' alt="icon"></img>
              <p> Patient Data</p>
            </div>
            <div className='panel-line'>
              <img src={x} className='icons' alt="icon"></img>
              <p> Outpost Location</p>
            </div>
            <div className='panel-line'>
              <img src={diamond} className='icons' alt="icon"></img>
              <p> Healthworker Data</p>
            </div>
          </div>
        </div>
        <FooterData />
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
    healthworkerData: state.healthworkers.healthworkersData
  }
}
export default connect(mapStateToProps, { getMap })(Dashboard)