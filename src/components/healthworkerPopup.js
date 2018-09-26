import React, { Component } from 'react'
import { loadModules } from 'esri-loader'
import { connect } from 'react-redux' 
import { getHealthworkerGraphic, getHealthworkers } from '../redux/reducers/healthworkersReducer'


class HealthworkerPopup extends Component {
  
  componentDidMount() {
    this.props.getHealthworkers()
  }

  componentDidUpdate(prevProps) {
  let { healthworkersData } = this.props

  if ((!prevProps.mapView.graphics && this.props.mapView.graphics && healthworkersData) || (!prevProps.healthworkersData.length && this.props.healthworkersData.length && this.props.mapView.graphics)) {

  loadModules([
    'esri/Graphic'
  ]).then(([Graphic]) => {
      healthworkersData.forEach( healthworker => {

      const point = {
        type: "point", // autocasts as new Point()
        longitude: healthworker.longitude,
        latitude: healthworker.latitude
      }
         
      const markerSymbol = {
        type: "simple-marker", 
        style: 'diamond',
        color: '#40607A', 
        size: 14,
        outline: { // SimpleLineSymbol()
          color: 'white',
          width: 2   
        }
      }
    
      const PopupTemplate = {
        title: "Field Healthworker Information",
        content: [{
        type: "text",
        text: `
          <span><h4>Name:  ${healthworker.name}</h4></span>
          <span><h4>Coordinates:  ${healthworker.latitude}, ${healthworker.longitude}</h4></span>
          <span><h4>Email:  ${healthworker.email}</h4></span>
          <span><h4>Outpost:  ${healthworker.outpost_id}</h4></span>
          <span><h4>Phone:  ${healthworker.phone}</h4></span>
              `
        }]
      }

      const healthworkerGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: PopupTemplate
      })
          this.props.mapView.graphics.add(healthworkerGraphic)
        })
      })
    }  
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    healthworkersData: state.healthworkers.healthworkersData, 
    mapView: state.map.mapView,
    healthworkerGraphic: state.healthworkers.healthworkerGraphic
  }
}

export default connect(mapStateToProps, {getHealthworkerGraphic, getHealthworkers})(HealthworkerPopup)