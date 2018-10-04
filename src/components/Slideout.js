import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import '../CSS/Charts.css'
import '../CSS/slideout.css'
import PieCharts from '../components/PieCharts'
import LineCharts from '../components/LineCharts'

const styles = {
  fontFamily: 'sans-serif',
  zIndex: 100
};


class Slideout extends Component{
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  openSlider = () => {
    this.setState({
      isOpen: true
    });
  }
  closeSlider = () => {
    this.setState({
      isOpen: false
    });
  }
  render() {
    return (
      <div style={styles}>
        <button className="slider-button" type="button" onClick={this.openSlider}><i className="fas fa-bars fa-4x"></i></button>
        <Slider
          isOpen={this.state.isOpen}
          onOutsideClick={this.closeSlider}>
          <h2 style={{color: '#D8DBE7'}}> Sierra Leone Snapshot </h2>
          <div className='slideout-subheader-question-container'>
            <h2 style={{color: '#D8DBE7'}}> Indicators of Maternal Health in Study Area </h2>
            <div className="question-mark">
              <i className="fas fa-question-circle"style={{color: '#D8DBE7'}} ></i>
            <div id="info-div">
              <p>
              In Sierra Leone there is a unmet need for family planning. In this area the percent of registered women reporting the use of family planning methods is ____.  Identification of the clusters of low access to family planning better equips the GeoNet Medical Response team to target supplies and personnel to the areas of greatest need.
              </p>
            </div>
            </div>
          </div>
            <h3 style={{color: '#D8DBE7'}}>HIV Status and Family Planning</h3>
            <PieCharts/>
            <h3 style={{color: '#D8DBE7'}}>Maternal Mortality Rates</h3>
          <div className='slideout-subheader-question-container'>
            <h2 style={{color: '#D8DBE7'}}> National Indicators of Maternal Health</h2> <i className="fas fa-question-circle" style={{color: '#D8DBE7'}} ></i>
          </div>
            <h3 style={{color: '#D8DBE7'}}>Maternal and Neonatal Mortality Rates</h3>
            <LineCharts />
        </Slider>
      </div>
    );
  };
}

export default Slideout
