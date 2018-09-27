import React, { Component } from 'react'
import Tabs from './tabs/tabs'
import '../CSS/dashboard.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class NewDataMenu extends Component {
    constructor() {
        super()
        this.state = {
            patientName: '',
            patientPhone: '',
            patientAddress: '',
            patientAge: '',
            patientFamPlan: '',
            patientHIV: '',
            patientParity: '',
            patientDueDate: moment(),
            // startDate: moment()
        }
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

        alert(this.state.patientName);
    }

    render() {
        console.log(this.state)
        // let parityDropDownOptions = function => (){for(let i = 0; i<=20; i++){

        // }}
        let dropdownOption = []
        for (let i = 0; i <= 20; i++) {
            dropdownOption.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div className='add-menu-container'>
                <Tabs>
                    <div label='Patient' className='new-patient-form-container'>
                        <h3 className='add-tab-title'>Add a new patient:</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-input'><h4>Name:</h4><input name='patientName' onChange={this.handleChange} /></div>
                            <div className='form-input'><h4>Phone:</h4><input name='patientPhone' onChange={this.handleChange} /></div>
                            <div className='form-input'><h4>Address:</h4><input name='patientAddress' onChange={this.handleChange} /></div>
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
                                    selected={this.state.startDate}
                                    onChange={this.handleDatePickerChange}
                                />
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

