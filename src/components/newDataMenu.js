import React, { Component } from 'react'
import Tabs from './tabs/tabs'
import '../CSS/dashboard.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {connect} from 'react-redux'
import axios from 'axios'
import {getHealthworkers} from '../redux/reducers/healthworkersReducer'
import {addPatientSurvey} from '../redux/reducers/patientsReducer'

import 'react-datepicker/dist/react-datepicker.css';

class NewDataMenu extends Component {
    constructor() {
        super()
        this.state = {
            patientName: '',
            patientPhone: '',
            patientAddress: '',
            patientLatitude: '',
            patientLongitude: '',
            patientAge: '',
            patientFamPlan: '',
            patientHIV: '',
            patientParity: '',
            patientDueDate: moment(),
            patientAssignedHW: ''
        }
    }

    componentDidMount(){
        this.props.getHealthworkers()
        console.log('Due date formatted', this.state.patientDueDate.format('YYYY/MM/d'))
    }


    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleDatePickerChange = (date) => {
        this.setState({
            patientDueDate: date
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get(`https://api.what3words.com/v2/forward?addr=${this.state.patientAddress}&key=${process.env.REACT_APP_W3W_KEY}`).then( response =>{
            console.log('W3W response', response.status)
            if (+response.data.geometry.lng<-13.307377 || +response.data.geometry.lng>-10.256908 || +response.data.geometry.lat>10.0316 || +response.data.geometry.lat<6.791397){
                alert("You're selected address is not in Sierra Leone. Please enter a new valid address.")
            } else {
                this.setState({
                    patientLatitude: response.data.geometry.lat,
                    patientLongitude: response.data.geometry.lng
                })
                addPatientSurvey(this.state)
            }
        }).catch(err =>{
            // console.log(err.response.status)
            alert("The address you entered is not valid. Please enter a valid address or check the console for more details.")
            console.log('Error', err)
        })
    }

    render() {
        console.log(this.state)
        console.log(this.props.healthWorkers)
        // let parityDropDownOptions = function => (){for(let i = 0; i<=20; i++){

        // }}
        let dropdownOption = []
        for (let i = 0; i <= 20; i++) {
            dropdownOption.push(<option key={i} value={i}>{i}</option>)
        }
        let HWOption = []
        if (this.props.healthWorkers){
            for (let i = 0; i < this.props.healthWorkers.length; i++) {
                let name = this.props.healthWorkers[i].name
                let id = this.props.healthWorkers[i].id
                console.log(id)
                HWOption.push(<option key={id} value={name}>{name}</option>)
            }
        }
        return (
            <div className='add-menu-container'>
                <Tabs>
                    <div label='Patient' className='new-patient-form-container'>
                        <h3 className='add-tab-title'>Add a new patient:</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-input'><h4>Name:</h4><input name='patientName' onChange={this.handleChange} /></div>
                            <div className='form-input'><h4>Phone:</h4><input name='patientPhone' onChange={this.handleChange} /></div>
                            <div className='form-input'><h4>Address: <a href='https://map.what3words.com/mills.oilier.glitches'>What3Words Map</a> </h4><input name='patientAddress' onChange={this.handleChange} /></div>
                            <div className='form-input'><h4>Age:</h4><input name='patientAge' onChange={this.handleChange} value={this.state.patientAge} /></div>
                            {/* <div className='form-input'><h4>Did the patient use family planning?</h4><input name='patientFamPlan'onChange={this.handleChange} value={this.state.patientFamPlan}/></div> */}
                            <div className='form-input'><h4>Did the patient use family planning?</h4>
                                <div className='radio-button-container'>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientFamPlan'
                                            value="yes"
                                            checked={this.state.patientFamPlan === "yes"}
                                            onChange={this.handleChange}
                                        />
                                        Yes
            </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientFamPlan'
                                            value="no"
                                            checked={this.state.patientFamPlan === "no"}
                                            onChange={this.handleChange}
                                        />
                                        No
            </label>
                                </div>
                            </div>
                            <div className='form-input'><h4>Has the patient been diagnosed with HIV?</h4>
                                {/* <input name='patientHIV'onChange={this.handleChange} value={this.state.patientHIV}/> */}
                                <div className='radio-button-container'>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientHIV'
                                            value="yes"
                                            checked={this.state.patientHIV === "yes"}
                                            onChange={this.handleChange}
                                        />
                                        Yes
            </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientHIV'
                                            value="no"
                                            checked={this.state.patientHIV === "no"}
                                            onChange={this.handleChange}
                                        />
                                        No
            </label>
                                </div>
                            </div>
                            <div className='form-input'><h4>How many previous children has the patient had?</h4>
                                {/* <input name='patientParity'onChange={this.handleChange} value={this.state.patientParity}/> */}
                                <select name='patientParity' onChange={this.handleChange} value={this.state.value}>
                                    <option value="">Select An Option</option>
                                    {dropdownOption}
                                </select>
                            </div>
                            <div className='form-input'><h4>What is the expected due date?</h4>
                                {/* <input name='patientDueDate'onChange={this.handleChange} value={this.state.patientDueDate}/> */}
                                 <DatePicker
                                    name = 'patientDueDate'
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.state.patientDueDate}
                                    onChange={this.handleDatePickerChange}
                                    filterDate={(date) => {
                                        // This limits the ability of the user to select a past due date or a date > 10 months in the future
                                        return moment().subtract(1, 'days') < date && moment().add(10, 'months') > date
                                    }}
                                />
                            </div>
                            <div className='form-input'><h4>Who is the patient's health worker?</h4>
                                {/* <input name='patientParity'onChange={this.handleChange} value={this.state.patientParity}/> */}
                                <select name='patientAssignedHW' onChange={this.handleChange} value={this.state.value}>
                                    <option value="">Select An Option</option>
                                    {HWOption}
                                </select>
                            </div>
                            <button className='add-new-button' type='submit'>Submit</button>
                        </form>
                    </div>
                    <div label='Health Worker'>
                        <h3 className='add-tab-title'>Add a new health worker:</h3>
                    </div>
                    <div label='Outpost'>
                        <h3 className='add-tab-title'>Add a new outpost:</h3>
                    </div>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        healthWorkers: state.healthworkers.healthworkersData
    }
}

export default connect(mapStateToProps, {getHealthworkers, addPatientSurvey})(NewDataMenu)

