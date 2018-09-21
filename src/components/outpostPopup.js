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
          type: "point", // autocasts as new Point()
          longitude: -11.244751,
          latitude: 8.539315
        }
  
        const markerSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [116, 119, 40],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        }
  
        const outpostGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        })
      //  const polygon = {
      //   type: "polygon", // autocasts as new Polygon()
      //   rings: [
      //     [-11.244751, 8.539315],
      //     [-11.244076, 8.543280],
      //     [-11.241607, 8.541294],
      //     [-11.244751, 8.539315]
      //   ]
      // }

      // const fillSymbol = {
      //   type: "simple-fill", // autocasts as new SimpleFillSymbol()
      //   color: [227, 139, 79, 0.8],
      //   outline: { // autocasts as new SimpleLineSymbol()
      //     color: [255, 255, 255],
      //     width: 1
      //   }
      // }

      // const outpostGraphic = new Graphic({
      //   geometry: polygon,
      //   symbol: fillSymbol
      // })
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