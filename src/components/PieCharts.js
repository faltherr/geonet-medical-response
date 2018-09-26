import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';
import { getPatients } from '../redux/reducers/patientsReducer';

class PieCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data1: [],
      data2: []
      // opacity: {}
    }
  }

  componentDidMount() {
    this.props.getPatients()
  }

  componentDidUpdate(prevProps) {
    if (this.props.patientsData !== prevProps.patientsData) {
      let yesCounter = 0
      let noCounter = 0
      for (let i = 0; i < this.props.patientsData.length; i++) {
        if (this.props.patientsData[i].hiv === "yes") {
          yesCounter++
        } else if (this.props.patientsData[i].hiv === "no") {
          noCounter++
        }
      }
      let total = yesCounter + noCounter
      let yesPercentage = Math.floor(((yesCounter / total) * 100) * 100) / 100
      let noPercentage = Math.floor(((noCounter / total) * 100) * 100) / 100
      this.setState({
        data1: [{ name: 'HIV+ Women', value: yesPercentage }, { name: 'HIV- Women', value: noPercentage }]
      })
      let yesFamplanCounter = 0
      let noFamplanCounter = 0
      for (let i = 0; i < this.props.patientsData.length; i++) {
        if (this.props.patientsData[i].famplan === "yes") {
          yesFamplanCounter++
        } else if (this.props.patientsData[i].famplan === "no") {
          noFamplanCounter++
        }
      }
      let famTotal = yesFamplanCounter + noFamplanCounter
      let yesFamPercentage = Math.floor(((yesFamplanCounter / famTotal) * 100) * 100) / 100
      let noFamPercentage = Math.floor(((noFamplanCounter / famTotal) * 100) * 100) / 100
      this.setState({
        data2: [{ name: 'Women Using Family Planning', value: yesFamPercentage }, { name: 'Women Not Using Family Planning', value: noFamPercentage }]
      })
    }
  }

  render() {
    return (
      this.props.patientsData.length ?
        <div>
          <PieChart width={800} height={400}>
            <Pie data={this.state.data1} cx={200} cy={200} outerRadius={60} fill="#8884d8"
            />
            <Pie data={this.state.data2} cx={200} cy={200} outerRadius={90} innerRadius={70} fill="#82ca9d" label />
            <Tooltip />
            <Legend verticalAlign="bottom" align="right" iconType="square" />
          </PieChart>
        </div>
        :
        <div>
          No Data Available
        </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    patientsData: state.patients.patientsData
  }
}

export default connect(mapStateToProps, { getPatients })(PieCharts);