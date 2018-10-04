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
              <div id="info-div1">
                The maternal mortality ratio throughout Sierra Leone is among the highest in the world. The aim of GeoNet Medical Response (GMR) is to contribute to the reduction of the maternal mortality and neonatal deaths by connecting women and their infant children with emergency medical services in the event of an emergency. Since 2000, both metrics have declined steadily even in the wake of the Ebola crisis. Comparing the rate maternal mortality and neonatal deaths in GMR service areas to the national average can help alert users to the effectiveness of the program and can be used as a metric to strive beyond.
              </div>
              <div id="info-div2">
                Preventing HIV transmission from mother to child over the course of a pregnancy can be achieved with targeted antiretroviral treatments. Ensuring that HIV positive expectant women have access to anti-retroviral treatment throughout the course of their pregnancy is a key to prevent vertical transmission. In this area the percent of expectant women who are HIV positive is about 40%.
              </div>
            </div>
          </div>
            <h3 style={{color: '#D8DBE7'}}>HIV Status and Family Planning</h3>
            <PieCharts/>
            <h3 style={{color: '#D8DBE7'}}>Maternal Mortality Rates</h3>
          <div className='slideout-subheader-question-container'>
            <h2 style={{color: '#D8DBE7'}}> National Indicators of Maternal Health</h2> 
            <div className="question-mark2">
              <i className="fas fa-question-circle"style={{color: '#D8DBE7'}} ></i>
              <div id="info-div3">
                The maternal mortality ratio throughout Sierra Leone is among the highest in the world. The aim of GeoNet Medical Response (GMR) is to contribute to the reduction of the maternal mortality and neonatal deaths by connecting women and their infant children with emergency medical services in the event of an emergency. Since 2000, both metrics have declined steadily even in the wake of the Ebola crisis. Comparing the rate maternal mortality and neonatal deaths in GMR service areas to the national average can help alert users to the effectiveness of the program and can be used as a metric to strive beyond.
              </div>
            </div>
          </div>
            <h3 style={{color: '#D8DBE7'}}>Maternal and Neonatal Mortality Rates</h3>
            <LineCharts />
        </Slider>
      </div>
    );
  };
}

export default Slideout
