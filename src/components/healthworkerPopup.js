import React, { Component } from 'react'
import { loadModules } from 'esri-loader'
import { connect } from 'react-redux' 
import { getHealthWorkerGraphic, getHealthWorkers } from '../redux/reducers/healthworkersReducer'


class HealthworkerPopup extends Component {

  componentDidMount() {
    this.props.getHealthWorkers()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.mapView.graphics && this.props.mapView.graphics) {
      loadModules([
        'esri/Graphic',
        "esri/geometry/Multipoint"
      ]).then(([Graphic, Multipoint]) => {

        const pointHW = {
          type: "point", // autocasts as new Point()
          longitude: -12.479384,
          latitude: 7.595613
        }
       
        const markerSymbolHW = {
          type: "simple-marker", 
          color: [255, 0, 0],
          // outline: { // SimpleLineSymbol()
          //   color: [255, 0, 0],
          //   width: 4
          // }
        }

        const healthWorkerGraphic = new Graphic({
          geometry: pointHW,
          symbol: markerSymbolHW
        })
          this.props.mapView.graphics.add(healthWorkerGraphic)
      })
    }
  }

  render () {
    return (
      <div>
        { 
          this.props.healthWorkersData.map( healthWorker => {
            return (
              <div>
                {healthWorker.latitude}
                {healthWorker.longitude}
              </div>
            )
          })
        }
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    healthWorkersData: state.healthworkers.healthWorkersData, 
    mapView: state.map.mapView,
    healthWorkerGraphic: state.healthworkers.healthWorkerGraphic
  }
}


export default connect(mapStateToProps, {getHealthWorkerGraphic, getHealthWorkers})(HealthworkerPopup)