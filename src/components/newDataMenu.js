import React, { Component } from 'react'
import Tabs from './tabs/tabs'
import '../CSS/dashboard.css'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios'
import { getHealthworkers, addHCW } from '../redux/reducers/healthworkersReducer'
import { addPatientSurvey } from '../redux/reducers/patientsReducer'
import {getOutposts, addOutpost} from '../redux/reducers/outpostReducer'
import '../CSS/newDataMenu.css'

import 'react-datepicker/dist/react-datepicker.css';

import {handlePTInputName, handlePTInputPhone, handlePTInputAddress, handlePTInputCoordinates, handlePTInputAge, handlePTInputFamPlan, handlePTInputHIV, handlePTInputParity, handlePTInputDueDate, handlePTInputAssignedHW, handleHWInputName, handleHWInputPhone, handleHWInputAddress, handleHWInputOutpost, handleHWInputEmail, handleHWInputCoordinates, handleOutpostInputName, handleOutpostInputAddress, handleOutpostInputCoordinates, resetFormInputs, hideModal, showMask, turnOnGeocoder, patientAddressSelectorOn, hcwAddressSelectorOn, outpostAddressSelectorOn} from '../redux/reducers/formReducer'

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
            patientAssignedHW: '',
            hcwName: '',
            hcwPhone: '',
            hcwAddress: '',
            hcwOutpost: '',
            hcwEmail: '',
            hcwLatitude: '',
            hcwLongitude: '',
            outpostName: '',
            outpostAddress: '',
        }
    }

    componentDidMount() {
        this.props.getHealthworkers()
        this.props.getOutposts()
    }

    // handleChange = (e) => {
    //     let change = {}
    //     change[e.target.name] = e.target.value
    //     this.setState(change)
    // }

    handleDatePickerChange = (date) => {
        this.props.handlePTInputDueDate(date)
    }

    goToMap = (typeOfSelector) => {
        this.props.hideModal()
        this.props.turnOnGeocoder()
        this.props.showMask()
        let addressType = `${typeOfSelector}AddressSelectorOn`
        this.props[addressType]()
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://api.what3words.com/v2/forward?addr=${this.props.patientAddress}&key=${process.env.REACT_APP_W3W_KEY}`).then(response => {
            // console.log('W3W response', response.status)
            if (+response.data.geometry.lng < -13.307377 || +response.data.geometry.lng > -10.256908 || +response.data.geometry.lat > 10.0316 || +response.data.geometry.lat < 6.791397) {
                alert("You're selected address is not in Sierra Leone. Please enter a valid address.")
            } else {
                this.props.handlePTInputCoordinates(response.data.geometry.lat, response.data.geometry.lng)

                addPatientSurvey(this.props)
                // document.getElementById("create-form").reset()
                this.props.resetFormInputs()
                this.props.closeModal()

            }
        }).catch(err => {
            // console.log(err.response.status)
            alert("The address you entered is not valid. Please enter a valid address or check the console for more details.")
            console.log('Error', err)
        })
    }

    handleSubmitHCW = (event) => {
        event.preventDefault();

        axios.get(`https://api.what3words.com/v2/forward?addr=${this.props.hcwAddress}&key=${process.env.REACT_APP_W3W_KEY}`).then(response => {
            console.log('W3W response', response.data.geometry)
            if (+response.data.geometry.lng < -13.307377 || +response.data.geometry.lng > -10.256908 || +response.data.geometry.lat > 10.0316 || +response.data.geometry.lat < 6.791397) {
                alert("You're selected address is not in Sierra Leone. Please enter a new valid address.")
            } else {
                this.props.handleHWInputCoordinates(response.data.geometry.lat, response.data.geometry.lng)
                addHCW(this.props)
                // document.getElementById("create-form").reset()
                this.props.resetFormInputs()
                this.props.closeModal()

            }
        }).catch(err => {
            // console.log(err.response.status)
            alert("The address you entered is not valid. Please enter a valid address or check the console for more details.")
            console.log('Error', err)
        })
    }

    handleSubmitOutpost = (event) => {
        event.preventDefault();

        axios.get(`https://api.what3words.com/v2/forward?addr=${this.props.outpostAddress}&key=${process.env.REACT_APP_W3W_KEY}`).then(response => {
            console.log('W3W response', response.status)
            if (+response.data.geometry.lng < -13.307377 || +response.data.geometry.lng > -10.256908 || +response.data.geometry.lat > 10.0316 || +response.data.geometry.lat < 6.791397) {
                alert("You're selected address is not in Sierra Leone. Please enter a new valid address.")
            } else {
                this.props.handleOutpostInputCoordinates(response.data.geometry.lat, response.data.geometry.lng)
                addOutpost(this.props)
                // document.getElementById("create-form").reset()
                this.props.resetFormInputs()
                this.props.closeModal()
            }
        }).catch(err => {
            // console.log(err.response.status)
            alert("The address you entered is not valid. Please enter a valid address or check the console for more details.")
            console.log('Error', err)
        })
    }

    render() {
        // console.log(this.props.healthWorkers)

        let dropdownOption = []
        for (let i = 0; i <= 20; i++) {
            dropdownOption.push(<option key={i} value={i}>{i}</option>)
        }

        let HWOption = []
        if (this.props.healthWorkers) {
            for (let i = 0; i < this.props.healthWorkers.length; i++) {
                if (this.props.healthWorkers[i].id){
                    let name = this.props.healthWorkers[i].name
                    let id = this.props.healthWorkers[i].id
                    HWOption.push(<option key={id} value={id}>{name}</option>)
                }
            }
        }

        let outpostDropdownOption = []
        if (this.props.outposts) {
            for (let i = 0; i < this.props.outposts.length; i++) {
                // console.log(this.props.outposts[i])
                let id = this.props.outposts[i].id
                outpostDropdownOption.push(<option key={id} value={id}>{id}</option>)
            }
        }
        
        let {handlePTInputName, handlePTInputPhone, handlePTInputAddress, handlePTInputAge, handlePTInputFamPlan, handlePTInputHIV, handlePTInputParity, handlePTInputAssignedHW, handleHWInputName, handleHWInputPhone, handleHWInputAddress, handleHWInputOutpost, handleHWInputEmail, handleOutpostInputName, handleOutpostInputAddress} = this.props
        // console.log("The props mega object", this.props)
        return (
            <div className='add-menu-container'>
                <Tabs>
                    <div label='Patient' className='new-patient-form-container'>
                    <div className='form-header-container'>
                        <h3 className='add-tab-title'>Add a new patient:</h3>
                        </div>
                        <form id="create-form" onSubmit={this.handleSubmit}>
                            <div className='form-input'><h4>Name:</h4><input name='patientName' onChange={handlePTInputName} value={this.props.patientName}/></div>
                            <div className='form-input'><h4>Phone:</h4><input name='patientPhone' onChange={handlePTInputPhone} value={this.props.patientPhone}/></div>
                            {/* <div className='form-input'><h4>Address: </h4> <p>Use the<a href='https://map.what3words.com/mills.oilier.glitches' target='_blank' rel="noopener noreferrer">What3Words Map</a> to find a new address </p><input name='patientAddress' onChange={this.handleChange} /></div> */}
                            <div className='form-input'><h4>Address: </h4> <div><button type="button" className='go-to-add-address-button' onClick={() => this.goToMap("patient")}>Get address from map    <i className="fas fa-map-marker-alt"></i></button> <input name='patientAddress' onChange={handlePTInputAddress} value={this.props.patientAddress}/></div></div>
                            <div className='form-input'><h4>Age:</h4><input name='patientAge' onChange={handlePTInputAge} value={this.props.patientAge}/></div>
                            {/* <div className='form-input'><h4>Did the patient use family planning?</h4><input name='patientFamPlan'onChange={this.handleChange} value={this.state.patientFamPlan}/></div> */}
                            <div className='form-input'><h4>Did the patient use family planning?</h4>
                                <div className='radio-button-container'>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientFamPlan'
                                            value="yes"
                                            checked={this.props.patientFamPlan === "yes"}
                                            onChange={handlePTInputFamPlan}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientFamPlan'
                                            value="no"
                                            checked={this.props.patientFamPlan === "no"}
                                            onChange={handlePTInputFamPlan}
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
                                            checked={this.props.patientHIV === "yes"}
                                            onChange={handlePTInputHIV}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name='patientHIV'
                                            value="no"
                                            checked={this.props.patientHIV === "no"}
                                            onChange={handlePTInputHIV}
                                        />
                                        No
                                </label>
                                </div>
                            </div>
                            <div className='form-input'><h4>How many previous children has the patient had?</h4>
                                {/* <input name='patientParity'onChange={this.handleChange} value={this.state.patientParity}/> */}
                                <select name='patientParity' onChange={handlePTInputParity} value={this.props.patientParity}>
                                    <option value="">Select An Option</option>
                                    {dropdownOption}
                                </select>
                            </div>
                            <div className='form-input'><h4>What is the expected due date?</h4>
                                {/* <input name='patientDueDate'onChange={this.handleChange} value={this.state.patientDueDate}/> */}
                                <DatePicker
                                    name='patientDueDate'
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.props.patientDueDate}
                                    onChange={this.handleDatePickerChange}
                                    filterDate={(date) => {
                                        // This limits the ability of the user to select a past due date or a date > 10 months in the future
                                        return moment().subtract(1, 'days') < date && moment().add(10, 'months') > date
                                    }}
                                />
                            </div>
                            <div className='form-input'><h4>Who is the patient's health worker?</h4>
                                {/* <input name='patientParity'onChange={this.handleChange} value={this.state.patientParity}/> */}
                                <select name='patientAssignedHW' onChange={handlePTInputAssignedHW} value={this.props.patientAssignedHW}>
                                    <option value="">Select An Option</option>
                                    {HWOption}
                                </select>
                            </div>
                            <div className='form-button-container'>
                            <button className='add-new-button' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div label='Health Worker'>
                        <div label='Patient' className='new-patient-form-container'>
                        <div className='form-header-container'>
                            <h3 className='add-tab-title'>Hire a new health worker:</h3>
                            </div>
                            <form id="create-form" onSubmit={this.handleSubmitHCW}>
                                <div className='form-input'><h4>Name:</h4><input name='hcwName' onChange={handleHWInputName} value={this.props.hcwName} /></div>
                                <div className='form-input'><h4>Phone:</h4><input name='hcwPhone' onChange={handleHWInputPhone} value={this.props.hcwPhone}/></div>
                                <div className='form-input'><h4>Location: </h4> <div><button type="button" className='go-to-add-address-button' onClick={() => this.goToMap("hcw")}>Get address from map    <i className="fas fa-map-marker-alt"></i></button>  <input name='hcwAddress' onChange={handleHWInputAddress} value={this.props.hcwAddress}/></div></div>
                                <div className='form-input'><h4>Outpost:</h4>
                                    <select name='hcwOutpost' onChange={handleHWInputOutpost} value={this.state.value}>
                                        <option value="">Select An Outpost by ID</option>
                                        {outpostDropdownOption}
                                    </select>
                                </div>
                                <div className='form-input'><h4>Email:</h4><input name='hcwEmail' onChange={handleHWInputEmail}/></div>
                                <div className='form-button-container'>
                                <button className='add-new-button' type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div label='Outpost'>
                    <div label='Patient' className='new-patient-form-container'>
                        <div className='form-header-container'>
                        <h3 className='add-tab-title'>Create a new outpost:</h3>
                            </div>
                            <form id="create-form" onSubmit={this.handleSubmitOutpost}>
                                <div className='form-input'><h4>Name:</h4><input name='outpostName' onChange={handleOutpostInputName} value={this.props.outpostName} /></div>
                                <div className='form-input'><h4>Location: </h4> <div><button type="button" className='go-to-add-address-button' onClick={() => this.goToMap("outpost")}>Get address from map    <i className="fas fa-map-marker-alt"></i></button>  <input name='outpostAddress' onChange={handleOutpostInputAddress} value={this.props.outpostAddress} /></div></div>
                                <div className='form-button-container'>
                                <button className='add-new-button' type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        healthWorkers: state.healthworkers.healthworkersData,
        outposts: state.outposts.outpostsData,
        patientName: state.newForm.patientName,
        patientPhone: state.newForm.patientPhone,
        patientAddress: state.newForm.patientAddress,
        patientLatitude: state.newForm.patientLatitude,
        patientLongitude: state.newForm.patientLongitude,
        patientAge: state.newForm.patientAge,
        patientFamPlan: state.newForm.patientFamPlan,
        patientHIV: state.newForm.patientHIV,
        patientParity: state.newForm.patientParity,
        patientDueDate: state.newForm.patientDueDate,
        patientAssignedHW: state.newForm.patientAssignedHW,
        hcwName: state.newForm.hcwName,
        hcwPhone: state.newForm.hcwPhone,
        hcwAddress: state.newForm.hcwAddress,
        hcwOutpost: state.newForm.hcwOutpost,
        hcwEmail: state.newForm.hcwEmail,
        hcwLatitude: state.newForm.hcwLatitude,
        hcwLongitude: state.newForm.hcwLongitude,
        outpostName: state.newForm.outpostName,
        outpostAddress: state.newForm.outpostAddress
    }
}

export default connect(mapStateToProps, { getHealthworkers, addPatientSurvey, getOutposts, addHCW, addOutpost, handlePTInputName, handlePTInputPhone, handlePTInputAddress, handlePTInputCoordinates, handlePTInputAge, handlePTInputFamPlan, handlePTInputHIV, handlePTInputParity, handlePTInputDueDate, handlePTInputAssignedHW, handleHWInputName, handleHWInputPhone, handleHWInputAddress, handleHWInputOutpost, handleHWInputEmail, handleHWInputCoordinates, handleOutpostInputName, handleOutpostInputAddress, handleOutpostInputCoordinates, resetFormInputs, hideModal, showMask, turnOnGeocoder, patientAddressSelectorOn, hcwAddressSelectorOn, outpostAddressSelectorOn })(NewDataMenu)

