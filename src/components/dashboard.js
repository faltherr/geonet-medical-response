import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import { connect } from 'react-redux'
import { getMap } from '../redux/reducers/mapReducer'
import PatientPopup from '../components/patientPopup'
import OutpostPopup from '../components/outpostPopup'
import HealthworkerPopup from '../components/healthworkerPopup'

loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  componentDidMount() {

    loadModules(['esri/Map', 
    'esri/views/MapView',
    'esri/views/SceneView',
    'esri/widgets/Legend',
    'esri/widgets/BasemapToggle',
    'esri/layers/GraphicsLayer'
    ]).then(([Map, MapView, SceneView, Legend, BasemapToggle, GraphicsLayer]) => {
     
      const map = new Map({
        basemap: 'dark-gray'
      })
    
      const mapView = new SceneView({
        container: 'mapDiv',
        map,
        center: [ -11.271115, 8.568134],
        scale: 50000000, 
        padding: { top: 10 }
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


    this.props.getMap(mapObj)
    mapView.ui.add(legend, "top-right")
    mapView.ui.add(toggle, "top-left")
    mapView.ui.add(buttonWidget, "top-right")

     buttonWidget.addEventListener("click", function () {
       const expanded = panel.classList.contains("panel-expanded")

       if (expanded) {
         panel.classList.remove("panel-expanded")
       } else {
         panel.classList.add("panel-expanded")
       }
     })

    //mapView.GoTo ( zooming feature)
    const speedOption = {
      speedFactor: 0.3,
      easing: "out-quint"
    }
      mapView.goTo({   
        target: [-12.179104, 9.101593, 50000],
        heading: 320,
        tilt: 45, 
        zoom: 8
      }, speedOption)
    })
  }

  communityOneClick = () => {
    let { mapView } = this.props
      mapView.goTo({   
      target: [-11.754213, 8.733465, 50000],
      heading: 0,
      tilt: 0, 
      zoom: 15, 
      speedFactor: 0.1
    })
  }
  communityTwoClick = () => {
    let { mapView } = this.props
      mapView.goTo({   
      target: [-11.372061, 9.532759, 50000],
      heading: 0,
      tilt: 0, 
      zoom: 15, 
      speedFactor: 0.1
    })
  }
  communityThreeClick = () => {
    let { mapView } = this.props
      mapView.goTo({   
      target: [-11.406373, 9.546019, 50000],
      heading: 0,
      tilt: 0, 
      zoom: 16, 
      speedFactor: 0.1
    })
  }
    render () {
      let {map, mapView, legend} = this.props
      return (
        <div className='wrapper'>
          <PatientPopup/>
          <OutpostPopup/>
          <HealthworkerPopup/>
         
            <div className="map" id="mapDiv"></div>
            <div id="optionsDiv">
              <button onClick={this.communityOneClick}
              >Community 1</button>
              <button onClick={this.communityTwoClick}
              >Community 2</button>
              <button onClick={this.communityThreeClick}
              >Community 3</button>
              <div id="panel"> 
              <h2>COLOR AND SIZING LEGEND</h2>
                <hr></hr>
              <p>yellow circle : Patient Data</p>
              <p>purple x : Outpost Location</p>
              <p>blue diamond : Healthworker Data</p>
              <p></p>
              </div>
          </div>
      </div>
      )
    }
  }

  let mapStateToProps = state => {
    return {
      map: state.map.map,
      mapView: state.map.mapView
    }
  }
export default connect( mapStateToProps, { getMap })(Dashboard)