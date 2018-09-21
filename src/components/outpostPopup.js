import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOutpostGraphic } from '../redux/reducers/outpostReducer'

import { loadModules } from 'esri-loader'

class OutpostPopup extends Component {

  componentDidUpdate(prevProps) {
    
    if(!prevProps.mapView.graphics) {
      loadModules([
        'esri/Graphic'
      ]).then(([Graphic]) => {
  

        const point = {
          type: "point",
          longitude: -11.244751,
          latitude: 8.539315
        }
  
        const markerSymbol = {
          type: "simple-marker",
          color: [116, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 2
          }
        }
  
        const outpostGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        })
        this.props.mapView.graphics.add(outpostGraphic)
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
    mapView: state.map.mapView
  }
}

export default connect(mapStateToProps, {getOutpostGraphic})(OutpostPopup)