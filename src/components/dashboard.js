import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'

import '../CSS/dashboard.css'
loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  componentDidMount() {
    loadModules(['esri/Map', 
    'esri/views/MapView', 
    'esri/layers/FeatureLayer',
    'dojo/domReady!']).then(([Map, MapView, FeatureLayer, Point, Legend]) => {

      const map = new Map({
        basemap: 'dark-gray'
      })

      const mapView = new MapView({
        container: 'mapDiv',
        map,
        center: [8.561571, -11.274584],
        zoom: 4, 
        padding: { top: 10}
      })
   
      const layer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer"
      })
      map.add(layer)

      mapView.breakpoints = {
        xsmall: 544,
        small: 677,
        medium: 1024,
        large: 1200
      }
      
      this.setState({
        map,
        mapView
      })

    })
  }
    render () {
      return (
        <div className='wrapper'>
          <header className='box header' id="title-id"></header>
            <div className=" box sidebar">MENU</div>
            <div className="map" id="mapDiv"></div>
            <div className=" box data">DATA</div>
          <footer>
          </footer>
      </div>
      )
    }
  }
export default Dashboard