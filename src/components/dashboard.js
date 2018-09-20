import React, { Component } from 'react'
import { loadModules, loadCss } from 'esri-loader'
import '../CSS/dashboard.css'
import { connect } from 'react-redux'
import { getMap } from '../redux/reducers/mapReducer'
import { getPatientGraphic } from '../redux/reducers/patientsReducer'
import PatientPopup from '../components/patientPopup'

loadCss('https://js.arcgis.com/4.8/esri/css/main.css');

class Dashboard extends Component {
  componentDidMount() {

    loadModules(['esri/Map', 
    'esri/views/MapView'
    ]).then(([Map, MapView]) => {

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

    
      let mapObj = {
        map, 
        mapView
      }

      this.props.getMap(mapObj)
      this.props.getPatientGraphic
      //dispatch action where payload equals above maps
      // .adds([])
// toggle here and remove what you don't want to see. 
// possibly graphics.remove

//any method thats on the view this.state.mapView.graphics.add 
// build checkboxes 


    })
  }
    render () {
      let {map, mapView} = this.props
      console.log('map view', mapView)
      // console.log('map', map)
      return (
        <div className='wrapper'>
        <PatientPopup />
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

  let mapStateToProps = state => {
    return {
      map: state.map.map,
      mapView: state.map.mapView
    }
  }
export default connect( mapStateToProps, { getMap })(Dashboard)