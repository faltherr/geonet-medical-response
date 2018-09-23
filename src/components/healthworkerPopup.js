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
    
          const PopupTemplate = {
            content: [{
              title: "Healthworker",
              type: "text",
              text: `
                    <h4>Name:</h4> <p>${healthworker.name}</p>
                    <h4>Coordinates:</h4> <p>${healthworker.latitude}, ${healthworker.longitude}</p>
                    <h4>Email:</h4> <p>${healthworker.email}</p>
                    <h4>Outpost:</h4> <p>${healthworker.outpost_id}</p>
                    <h4>Phone:</h4> <p>${healthworker.phone}</p>
                    <h4>Active:</h4> <p>${healthworker.active}</p>
                    `

            }]
          }

          const healthworkerGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate:  PopupTemplate

          })

          this.props.mapView.graphics.add(healthworkerGraphic)
          // layer.popupTemplate = popupTemplate
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