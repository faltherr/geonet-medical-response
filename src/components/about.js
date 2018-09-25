import React, { Component } from 'react'
import description from './writeups/description'
import '../CSS/about.css'
import Tabs from './tabs/tabs'
import healthGrids_demo from '../images/HealthGrid_explained_White.png'

export default class About extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        // console.log(description)
        return (
            <div className='about-page-container'>
                <div className='description-container'>
                    {/* <div className="about-tabs">
                        <button className="tablinks" onClick="openInfo(event, 'What')">What is GeoNet Health Services?</button>
                        <button className="tablinks" onClick="openInfor(event, 'How')">How does it work?</button>
                    </div> */}

                    <Tabs>
                        <div label='Mission' className= 'tab-header'>
                            <h3 className='description-titles'>Our Mission:</h3>
                            <p className='description-text'> {description.mission} </p>
                        </div>
                        <div label='Description'>
                            <h3 className='description-titles'>About Us:</h3>
                            <p className='description-text'> {description.description_p1} </p>
                            <p className='description-text'> {description.description_p2} </p>
                            <p className='description-text'> {description.description_p3} </p>
                            <p className='description-text'> {description.description_p4} </p>
                        </div>
                        <div label='How does it work?'>
                            <h3 className='description-titles'>How does it work? </h3>
                            <p className='description-text'>{description.howItWorks}</p>
                            <div className='flow-chart-container'>
                                <img src={healthGrids_demo} alt = 'flow' className='flowchart'/>
                            </div>
                        </div>
                    </Tabs>


                </div>
            </div>
        )
    }
}