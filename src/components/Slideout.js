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
    console.log("firefire")
  }
  closeSlider = () => {
    this.setState({
      isOpen: false
    });
  }
  render() {
    return (
      <div style={styles}>
        <button className="slider-button" type="button" onClick={this.openSlider}><i className="fas fa-bars"></i></button>
        <Slider
          isOpen={this.state.isOpen}
          onOutsideClick={this.closeSlider}>
            <h3 style={{color: '#D8DBE7'}}>HIV Status and Family Planning</h3>
            <PieCharts/>
            <h3 style={{color: '#D8DBE7'}}>Maternal and Neonatal Mortality Rates</h3>
            <LineCharts />
          </Slider>
      </div>
    );
  };
}

export default Slideout
