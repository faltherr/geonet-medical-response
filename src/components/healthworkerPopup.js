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
            outline: { // SimpleLineSymbol()
              color: [255, 0, 0],
              width: 1.7,
              style: 'solid'
            }
          }
       
          const healthworkerGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
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