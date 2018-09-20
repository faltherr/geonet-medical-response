import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'

import '../CSS/dashboard.css'
loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  componentDidMount() {
    loadModules(['esri/Map', 
    'esri/views/MapView', 
    "esri/Graphic",
    ]).then(([Map, MapView, Graphic]) => {

      const map = new Map({
        basemap: 'dark-gray'
      })

      const mapView = new MapView({
        container: 'mapDiv',
        map,
        center: [-80, 35],
        zoom: 4, 
        padding: { top: 10}
      })
   
     

      mapView.breakpoints = {
        xsmall: 544,
        small: 677,
        medium: 1024,
        large: 1200
      }

      var point = {
        type: "point", // autocasts as new Point()
        longitude: -49.97,
        latitude: 41.73
      };

      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      mapView.graphics.add(pointGraphic)
      // .adds([])
// toggle here and remove what you don't want to see. 
// possibly graphics.remove

//any method thats on the view this.state.mapView.graphics.add 
// build checkboxes 


      this.setState({
        map,
        mapView
      })
      //this will go in the redux 

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