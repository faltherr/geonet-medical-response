import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOutpostGraphic, getOutposts , deleteOutpost} from '../redux/reducers/outpostReducer'
import { loadModules } from 'esri-loader'
import '../CSS/outpostPopup.css'

class OutpostPopup extends Component {

componentDidMount () {
  this.props.getOutposts()
}

componentDidUpdate(prevProps) {
  let { outpostsData } = this.props

  if((!prevProps.mapView.graphics && this.props.mapView.graphics && outpostsData) || (!prevProps.outpostsData.length && this.props.outpostsData.length && this.props.mapView.graphics)) {
      
      loadModules([
        'esri/Graphic', 
        "esri/layers/GraphicsLayer",
        "esri/symbols/PictureMarkerSymbol",
        "esri/geometry/geometryEngine",
        "esri/geometry/Point",
        "esri/geometry/support/webMercatorUtils",
        "esri/geometry/SpatialReference",
        "esri/tasks/support/BufferParameters"
        // You need to maintain the order of the modules that you import so that the variable name you set in the .then references the correct module
      ]).then(([Graphic, GraphicsLayer, PictureMarkerSymbol, geometryEngine, Point, webMercatorUtils, SpatialReference, BufferParameters]) => {
        outpostsData.forEach( outpost => {
          if (outpost.latitude && outpost.longitude){
          let pointGeometry = new Point({
            type: "point",
            longitude: outpost.longitude,
            latitude: outpost.latitude,
          })
          
          // Here we calculate the buffers for each health center
          var ptBuff = geometryEngine.geodesicBuffer(pointGeometry, [25], "kilometers")
          // console.log(ptBuff)
          
          // Add the symbol styling here
          let markerSymbol = {
              type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
              url: require('./symbols/hut_white_outline_filled.png'),
              contentType: 'image/png',
              width: "22px",
              height: "22px"
            };

            let fillSymbol = {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: [227, 139, 79, 0.4],
              outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
              }
            }
            
      let PopupTemplate = {}

      if (this.props.adminLoggedIn){
      if (this.props.adminLoggedIn.admin){
        PopupTemplate = {
          title: "Community Outposts",
          content: [{
          type: "text",
          text: `
            <span><h4>Location:  ${outpost.location}</h4></span>
            <span><h4>Coordinates: ${outpost.latitude}, ${outpost.longitude}</h4></span>
                `
          }],
          actions: [{
            title: "Delete Outpost",
            outpost: outpost.id,
            className: "esri-icon-trash" 
          }]
        }
      } else {
        PopupTemplate = {
          title: "Community Outposts",
          content: [{
          type: "text",
          text: `
            <span><h4>Location:  ${outpost.location}</h4></span>
            <span><h4>Coordinates: ${outpost.latitude}, ${outpost.longitude}</h4></span>
                `
          }]
      }
    }
  } else {
    PopupTemplate = {
      title: "Community Outposts",
      content: [{
      type: "text",
      text: `
        <span><h4>Location:  ${outpost.location}</h4></span>
        <span><h4>Coordinates: ${outpost.latitude}, ${outpost.longitude}</h4></span>
            `
      }]
  }
  }

      const outpostGraphic = new Graphic ({
        geometry: pointGeometry,
        symbol: markerSymbol,
        popupTemplate: PopupTemplate
      })

      let ptBufferGraphic = new Graphic({
        geometry: ptBuff,
        symbol: fillSymbol
      })

      this.props.mapView.popup.on('trigger-action', event => {
        if (event.action.title === "Delete Outpost") {
         if(outpost.id === +event.action.outpost) {
           console.log(outpostGraphic, ptBufferGraphic)
           this.props.mapView.graphics.remove(outpostGraphic)
           this.props.mapView.graphics.remove(outpostGraphic.popupTemplate.content)
           this.props.mapView.graphics.remove(ptBufferGraphic)
         } 
          this.props.deleteOutpost(event.action.outpost)
        }
      })
        this.props.mapView.graphics.add(outpostGraphic)
        this.props.mapView.graphics.add(ptBufferGraphic)
      
    }
      })
    })
  }
}

    render() {
      return (
        <div>
        </div>
      )
    }
}


let mapStateToProps = state => {
  return {
    outpostGraphic: state.outposts.outpostGraphic,
    outpostsData: state.outposts.outpostsData,
    mapView: state.map.mapView, 
    map: state.map.map,
    adminLoggedIn: state.logout.adminLoggedIn
  }
}

export default connect(mapStateToProps, {getOutpostGraphic, getOutposts, deleteOutpost })(OutpostPopup)