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
                        <div label='Mission' className='tab-header'>
                            <h1 className='description-titles'>Our Mission:</h1>
                            <h3 className='description-text'> {description.mission} </h3>
                            <img style={{maxWidth: '400px', maxHeight:'350px', borderRadius: '5px', alignContent: 'center'}}src={'https://www.goodfreephotos.com/albums/sierra-leone/mother-carrying-baby-on-back-in-sierra-leone.jpg'}></img>
                        </div>
                        <div label='Description'>
                            <h1 className='description-titles'>About Us:</h1>
                            <p className='description-text'> {description.description_p1} </p>
                            <p className='description-text'> {description.description_p2} </p>
                            <p className='description-text'> {description.description_p3} </p>
                            <p className='description-text'> {description.description_p4} </p>
                        </div>
                        <div label='How does it work?'>
                            <h1 className='description-titles'>How does it work? </h1>
                            <p className='description-text'>{description.howItWorks}</p>
                            <div className='flow-chart-container'>
                                <img src={healthGrids_demo} alt='flow' className='flowchart' />
                            </div>
                        </div>
                    </Tabs>

                </div>
            </div>
        )
    }
}