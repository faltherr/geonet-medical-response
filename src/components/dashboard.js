import React, { Component } from 'react'
// import Menu from './Menu'
import { loadModules } from 'esri-loader'


class Dashboard extends Component {
  componentDidMount() {
    loadModules(['esri/Map', 
    'esri/views/MapView', 
    'esri/layers/FeatureLayer',
    'dojo/domReady!']).then(([Map, MapView, FeatureLayer, Point, Legend]) => {

      const map = new Map({
        basemap: 'topo-vector'
      })

      const mapView = new MapView({
        container: 'mapDiv',
        map,
        center: [-118.71511,34.09042],
        zoom: 3
      })
   
      const layer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer"
      })
      map.add(layer)

    
      this.setState({
        map,
        mapView
      })

    })
  }
    render () {
      return (
        <div>
          {/* <Menu /> */}
          <header>
            Header
          </header>
        <div id="mapDiv" style={{height: '80vh'}}>

        </div>
      </div>
      )
    }
  }
export default Dashboard