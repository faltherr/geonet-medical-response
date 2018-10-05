import * as newFormReducer from '../../redux/reducers/formReducer'
import reducer from '../../redux/reducers/formReducer'

Date.now = jest.fn(() => 1487076708000) //14.02.2017

const initialState = {
    patientName: '',
    patientPhone: '',
    patientAddress: '',
    patientLatitude: '',
    patientLongitude: '',
    patientAge: '',
    patientFamPlan: '',
    patientHIV: '',
    patientParity: '',
    patientDueDate: 'MockDate',
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
    outpostLatitude: '',
    outpostLongitude: '',
    openModal: false,
    toggleMask: false,
    toggleGeocoder: false,
    patientAddressSelector: false,
    hcwAddressSelector: false,
    outpostAddressSelector: false,
}

let patientInputEvent = {
    target: {
        value: 'Forest'
    }
}

const latitude = 12.000000
const longitude = 11.00000

// Return a fixed timestamp as a mock for call to moment
jest.mock('moment', () => () => ('MockDate'));




describe('Form Reducer', () => {
    it('returns the initial state', () => {
        expect (reducer(undefined, {})).toEqual({
            ...initialState
        })
    })
})

describe('Input coordinates function', () => {
    it('Returns the expected value of the patient input coordinates to be truthy', () => {
        expect(newFormReducer.handlePTInputCoordinates(latitude, longitude)).toBeTruthy()
    })
    it ('Returns the correct action', () =>{
        expect(newFormReducer.handlePTInputCoordinates(latitude, longitude)).toEqual(
            {
                type: 'PT_INPUT_COORDINATES',
                payload: {
                    latitude,
                    longitude
                }
            }
        )
    })
})

describe('Input patient name', () => {
    it('Returns the patient name as the payload', () => {
        expect(newFormReducer.handlePTInputName(patientInputEvent).payload).toContain('Forest')
    })
    it('Returns the action object', () => {
        expect(newFormReducer.handlePTInputName(patientInputEvent)).toEqual(
            {
                type: 'PT_NAME_INPUT',
                payload: 'Forest'
            }
        )
    })
})