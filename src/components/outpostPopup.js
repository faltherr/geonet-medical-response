import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOutpostGraphic, getOutposts } from '../redux/reducers/outpostReducer'
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
  ]).then(([Graphic, GraphicsLayer]) => {
    outpostsData.forEach( outpost => {
          
      const point = {
        type: "point",
        longitude: outpost.longitude,
        latitude: outpost.latitude
     }  

      const markerSymbol = {
        type: "simple-marker",
        style: 'x',

        outline: {
          color: '#4A148C',
          width: 3
        }
      }
       
      const PopupTemplate = {
        title: "Community Outposts",
        content: [{
        type: "text",
        text: `
          <span><h4>Location:  ${outpost.location}</h4></span>
          <span><h4>Coordinates: ${outpost.latitude}, ${outpost.longitude}</h4></span>
                    `
        }]
      }

      const outpostGraphic = new Graphic ({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: PopupTemplate
      })

      this.props.mapView.graphics.add(outpostGraphic)
         
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
    map: state.map.map
  }
}

export default connect(mapStateToProps, {getOutpostGraphic, getOutposts })(OutpostPopup)