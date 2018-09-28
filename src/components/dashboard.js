import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import { connect } from 'react-redux'
import { getMap } from '../redux/reducers/mapReducer'
import PatientPopup from '../components/patientPopup'
import OutpostPopup from '../components/outpostPopup'
import HealthworkerPopup from '../components/healthworkerPopup'
import PieCharts from '../components/PieCharts'
import LineCharts from '../components/LineCharts'
import circle from '../imgs/circle.png'
import x from '../imgs/x.png'
import diamond from '../imgs/diamond.png'
import Slideout from './Slideout'
import FooterData from './FooterData'

loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {

  componentDidMount() {
    
    loadModules(['esri/Map',
      'esri/views/MapView',
      'esri/views/SceneView',
      'esri/widgets/Legend',
      'esri/widgets/BasemapToggle',
      'esri/layers/GraphicsLayer',
      "esri/geometry/SpatialReference",
    ]).then(([Map, MapView, SceneView, Legend, BasemapToggle, GraphicsLayer, SpatialReference]) => {

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

  render() {
    // let {map, mapView, legend} = this.props
    let outpostButtons = []
    
    this.props.outpostsData.map( outpost => {
      if ( outpost.id != 0 ) {
      outpostButtons.push (
        <button onClick={ () => this.communityClick(outpost.longitude, outpost.latitude) }>Community {outpost.id}</button>
      )
      }
    })

    return (
      <div className='wrapper'>
        <div style={{background: '#01101B'}}><Slideout/></div>
        <PatientPopup />
        <OutpostPopup />
        <HealthworkerPopup />
        <div className="map" id="mapDiv"></div>
            <div id="optionsDiv">
              <button onClick={this.sierraLeonClick}>Sierra Leone</button>
                { outpostButtons }
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
    outpostsData: state.outposts.outpostsData
  }
}
export default connect(mapStateToProps, { getMap })(Dashboard)