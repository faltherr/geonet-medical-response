import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOutpostGraphic, getOutposts } from '../redux/reducers/outpostReducer'

import { loadModules } from 'esri-loader'

class OutpostPopup extends Component {
componentDidMount () {
  this.props.getOutposts()
}
  componentDidUpdate(prevProps) {
    let { outpostsData } = this.props
    if((!prevProps.mapView.graphics && this.props.mapView.graphics && outpostsData) || (!prevProps.outpostsData.length && this.props.outpostsData.length && this.props.mapView.graphics)) {
      loadModules([
        'esri/Graphic'
      ]).then(([Graphic]) => {
        console.log('oeruwouerakflf', outpostsData)
        outpostsData.forEach( outpost => {
          const point = {
            type: "point",
            longitude: outpost.longitude,
            latitude: outpost.latitude
          }
          console.log('outpostLatitude', outpost.latitude)
    
          const markerSymbol = {
            type: "simple-marker",
            style: 'square',
            outline: {
              color: [128, 0, 128],
              width: 2
            }
          }
       
        const PopupTemplate = {
            content: [{
              title: "Healthworker",
              type: "text",
              text: `
                    <h4>Location:</h4> <p>${outpost.location}</p>
                    <h4>Coordinates:</h4> <p>${outpost.latitude}, ${outpost.longitude}</p>
                    `
            }]
          }

          const outpostGraphic = new Graphic({
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
    mapView: state.map.mapView
  }
}

export default connect(mapStateToProps, {getOutpostGraphic, getOutposts })(OutpostPopup)