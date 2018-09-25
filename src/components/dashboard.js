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
        basemap: 'hybrid'
      })
    
      const mapView = new SceneView({
        container: 'mapDiv',
        map,
        center: [ -11.271115, 8.568134],
        zoom: 8, 
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
     const legend = new Legend({
       view: mapView,
       style: "classic",
      //  layerInfos: [{
      //    layer: GraphicsLayer
      //  }]
     })

     const toggle = new BasemapToggle({
       view: mapView,
       nextBasemap: "dark-gray"
     })
    
      this.props.getMap(mapObj)
      mapView.ui.add(legend, "bottom-right")
      mapView.ui.add(toggle, "top-right")
   
    })
  }
    render () {
      // let {map, mapView, legend} = this.props
      // console.log('map view', mapView)
      // console.log('map', map)
      return (
        <div className='wrapper'>
          <PatientPopup/>
          <OutpostPopup/>
          <HealthworkerPopup/>
            <div className="map" id="mapDiv"></div>
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