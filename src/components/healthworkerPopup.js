import React, { Component } from 'react'
import { loadModules } from 'esri-loader'
import { connect } from 'react-redux' 
import { getHealthworkerGraphic, getHealthworkers } from '../redux/reducers/healthworkersReducer'
import EditHealthworkerModal from './EditHealthworkerModal'

class HealthworkerPopup extends Component {
  state = {
    showModal: false,
    healthworkerId: ''
  }

  componentDidMount() {
    this.props.getHealthworkers()
  }

  componentDidUpdate(prevProps) {
  let { healthworkersData } = this.props

  if ((!prevProps.mapView.graphics && this.props.mapView.graphics && healthworkersData) || (!prevProps.healthworkersData.length && this.props.healthworkersData.length && this.props.mapView.graphics)) {

  loadModules([
    'esri/Graphic',
    "esri/geometry/Point",
    "esri/geometry/SpatialReference"
  ]).then(([Graphic, Point, SpatialReference]) => {
      healthworkersData.forEach( healthworker => {

      const point = new Point({
        type: "point", // autocasts as new Point()
        longitude: healthworker.longitude,
        latitude: healthworker.latitude,
        spatialReference: new SpatialReference({ wkid: 3857 }),
      })

      this.props.healthworkerPointGeometry.push(point)   

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
        }],
        actions: [{
          title: "Edit HealthWorker",
          id: `${healthworker.id}`, 
          className: "esri-icon-user" }]
      }

      // Edit Healthworker button 
     let { showEditModal } = this
     this.props.mapView.popup.on('trigger-action', function(event){
       if (event.action.title === "Edit Healthworker") {
         showEditModal(event.action.id)
       }
     })

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
  showEditModal = (healthworker_id) => {
    this.setState ({ 
      showModal: true,
      healthworkerId: healthworker_id
    })
  }
  hideEditModal = () => { this.setState({ showModal: false})}

  render () {
    // console.log(77777777777, this.props.healthworkerPointGeometry)
    return (
      <div>
        {
          this.state.showModal 
          &&
          <EditHealthworkerModal
            showModal ={this.state.showModal}
            hideModal={this.state.hideEditModal}
            healthworkersData={this.props.healthworkersData}
            healthworkerId={this.state.healthworkerId}
          />
        }
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    healthworkersData: state.healthworkers.healthworkersData, 
    mapView: state.map.mapView,
    healthworkerGraphic: state.healthworkers.healthworkerGraphic,
    healthworkerPointGeometry: state.healthworkers.healthworkerPointGeometry
  }
}

export default connect(mapStateToProps, {getHealthworkerGraphic, getHealthworkers})(HealthworkerPopup)