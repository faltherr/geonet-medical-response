import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import '../CSS/Charts.css'
import PieCharts from '../components/PieCharts'
import LineCharts from '../components/LineCharts'
// import hamburgers from 'hamburgers';

const styles = {
  fontFamily: 'sans-serif',
  padding: '15px',
  display: 'flex',
  justifyContent: 'flex-end'
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
        <button class="hamburger hamburger--slider-r" type="button" onClick={this.openSlider}>
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
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
