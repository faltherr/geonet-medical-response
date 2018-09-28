import React, { Component } from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import PieCharts from '../components/PieCharts'
import LineCharts from '../components/LineCharts'

const styles = {
  fontFamily: 'sans-serif',
  padding: '15px',
  color: '#D8DBE7'
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
  render () {
    return (
      <div style={styles}>
        <button onClick={this.openSlider}>Open Slider</button>
        <Slider
          isOpen={this.state.isOpen}
          onOutsideClick={this.closeSlider}>
            <h3>HIV Status and Family Planning</h3>
            <PieCharts/>
            <h3>Maternal and Neonatal Mortality Rates</h3>
            <LineCharts />
          </Slider>
      </div>
      );
  };
}

export default Slideout
