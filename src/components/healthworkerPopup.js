import React, { Component } from 'react'
import { loadModules } from 'esri-loader'
import { connect } from 'react-redux' 
import { getHealthworkerGraphic, getHealthworkers, setCurrentHealthworker } from '../redux/reducers/healthworkersReducer'
import EditHealthworkerModal from './EditHealthworkerModal'

class HealthworkerPopup extends Component {
  state = {
    showModal: false,
    healthworkerId: '', 
    healthworkerGraphics: [],
    currentGraphic: null, 
    currentHealthworker: null

  }

  componentDidMount() {
    this.props.getHealthworkers()
  }

  // componentDidUpdate(prevProps) {
  // let { healthworkersData } = this.props

  // if ((!prevProps.mapView.graphics && this.props.mapView.graphics && healthworkersData) || (!prevProps.healthworkersData.length && this.props.healthworkersData.length && this.props.mapView.graphics))
  componentWillReceiveProps (props) {
    if (props.healthworkersData) {
      this.createGraphics(props)
    }
  }

  createGraphics = (props) => {
  let { healthworkersData } = props
    if ( this.props.mapView.graphics ){
      this.state.healthworkerGraphics.forEach( graphic => {
        this.props.mapView.graphics.remove(graphic)
      })
    }

   if (true) {
    loadModules([
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/geometry/SpatialReference'
    ]).then(([Graphic, Point, SpatialReference]) => {
      healthworkersData.forEach( healthworker => {
        if(healthworker.latitude && healthworker.longitude){
        const point = new Point({
          type: "point", 
          longitude: healthworker.longitude,
          latitude: healthworker.latitude,
          spatialReference: new SpatialReference({ wkid: 3857 }),
        })

      this.props.healthworkerPointGeometry.push(point)   
      const markerSymbol = {
        type: "picture-marker", 
        url: require('../components/symbols/kyle.png'),
        contentType: 'image/png', 
        width: "32px",
        height: "32px"
      }
    
      const PopupTemplate = {
        title: "Field Healthworker Information",
        content: [{
        type: "text",
        text: `
          <span><h4>Name:  ${healthworker.name}</h4></span>
          <span><h4>Phone:  ${healthworker.phone}</h4></span>
          <span><h4>Outpost:  ${healthworker.outpost_id}</h4></span>
          <span><h4>Email:  ${healthworker.email}</h4></span>
          <span><h4>Coordinates:  ${healthworker.latitude}, ${healthworker.longitude}</h4></span>
          <span><h4>In the Field:  ${healthworker.in_field}</h4></span>
            `
        }],
        actions: [{
          title: "Edit Healthworker",
          healthworker: healthworker, 
          className: "esri-icon-user" 
        }]
      }

      // Edit Healthworker button 
      let { showEditModal } = this
      let { healthworkerGraphics } = this.state

      this.props.mapView.popup && 
      this.props.mapView.popup.on('trigger-action', event => {
       if (event.action.title === "Edit Healthworker") {
         let healthworker = event.action.healthworker
         let { uid } = event.target.content.graphic

         let currentGraphic;
         healthworkerGraphics.forEach( graphic => {
           if (+graphic.uid === +uid) {
             currentGraphic = graphic
           }
         })
         showEditModal(healthworker, currentGraphic)
       }
     })

      const healthworkerGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: PopupTemplate
      })

        healthworker.graphic = healthworkerGraphic

        this.setState({
          healthworkerGraphics: [
            ...this.state.healthworkerGraphics, healthworkerGraphic
          ]
        })
          this.props.mapView.graphics && 
          this.props.mapView.graphics.add(healthworkerGraphic)
        }
      })
      })
  
  }
  // showEditModal = (healthworker, graphic) => {
  //   this.setState ({ 
  //     showModal: true,
  //     currentGraphic: graphic,
  //     currentHealthworker: healthworker
  //   })
  // }
  }
  hideEditModal = () => { this.setState({ showModal: false})}

  render () {
    return (
      <div>
        {
          this.state.showModal 
          &&
          <EditHealthworkerModal
            showModal ={this.state.showModal}
            hideModal={this.hideEditModal}
            selectedHealthworker = {this.state.currentHealthworker}
            healthworkerId={this.state.healthworkerId}
            graphic={this.state.currentGraphic}
          />
        }
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    healthworkersData: state.healthworkers.healthworkersData, 
    healthworkerGraphic: state.healthworkers.healthworkerGraphic,
    mapView: state.map.mapView,
    healthworkerPointGeometry: state.healthworkers.healthworkerPointGeometry
  }
}

export default connect(mapStateToProps, {getHealthworkerGraphic, getHealthworkers, setCurrentHealthworker})(HealthworkerPopup)
