import moment from 'moment';

const PT_NAME_INPUT = 'PT_NAME_INPUT'
const PT_PHONE_INPUT = 'PT_PHONE_INPUT'
const PT_ADDRESS_INPUT = 'PT_ADDRESS_INPUT'
const PT_INPUT_COORDINATES = 'PT_INPUT_COORDINATES'
const PT_AGE_INPUT = 'PT_AGE_INPUT'
const PT_FAM_PLAN_INPUT = 'PT_FAM_PLAN'
const PT_HIV_INPUT = 'PT_HIV_INPUT'
const PT_PARITY_INPUT = 'PT_PARITY_INPUT'
const PT_DUE_DATE_INPUT = 'PT_DUE_DATE_INPUT'
const PT_ASSINGED_HW_INPUT = 'PT_ASSINGED_HW_INPUT'
const HW_NAME_INPUT = 'HW_NAME_INPUT'
const HW_PHONE_INPUT = 'HW_PHONE_INPUT'
const HW_ADDRESS_INPUT = 'HW_ADDRESS_INPUT'
const HW_OUTPOST_INPUT = 'HW_OUTPOST_INPUT'
const HW_EMAIL_INPUT = 'HW_EMAIL_INPUT'
const HW_INPUT_COORDINATES = 'HW_INPUT_COORDINATES'
const OUTPOST_NAME_INPUT = 'OUTPOST_NAME_INPUT'
const OUTPOST_ADDRESS_INPUT = 'OUTPOST_ADDRESS_INPUT'
const OUTPOST_COORDINATE_INPUT = 'OUTPOST_COORDINATE_INPUT'
const RESET_FORM_INPUT = 'RESET_FORM_INPUT'
const HIDE_MODAL = 'HIDE_MODAL'
const SHOW_MODAL = 'SHOW_MODAL'
const SHOW_MASK = 'SHOW_MASK'
const HIDE_MASK = 'HIDE_MASK'
const TURN_ON_GEOCODER = 'TURN_ON_GEOCODER'
const TURN_OFF_GEOCODER = 'TURN_OFF_GEOCODER'

const PATIENT_ADDRESS_SELECTOR_ON = 'PATIENT_ADDRESS_SELECTOR_ON'
const HCW_ADDRESS_SELECTOR_ON = 'HCW_ADDRESS_SELECTOR_ON'
const OUTPOST_ADDRESS_SELECTOR_ON = 'OUTPOST_ADDRESS_SELECTOR_ON'
const PATIENT_ADDRESS_SELECTOR_OFF = 'PATIENT_ADDRESS_SELECTOR_OFF'
const HCW_ADDRESS_SELECTOR_OFF = 'HCW_ADDRESS_SELECTOR_OFF'
const OUTPOST_ADDRESS_SELECTOR_OFF = 'OUTPOST_ADDRESS_SELECTOR_OFF'

const CLICKED_PT_ADDRESS = 'CLICKED_PT_ADDRESS'
const CLICKED_HW_ADDRESS = 'CLICKED_HW_ADDRESS'
const CLICKED_OUTPOST_ADDRESS = 'CLICKED_OUTPOST_ADDRESS'

let initialState = {
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
    outpostLatitude: '',
    outpostLongitude: '',
    openModal: false,
    toggleMask: false,
    toggleGeocoder: false,
    patientAddressSelector: false,
    hcwAddressSelector: false,
    outpostAddressSelector: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case PT_NAME_INPUT:
        return {
          ...state,
          patientName: action.payload
        }
      case PT_PHONE_INPUT:
        return {
          ...state,
          patientPhone: action.payload
        }
      case PT_ADDRESS_INPUT:
        return {
          ...state,
          patientAddress: action.payload
        }
      case PT_INPUT_COORDINATES:
        return {
          ...state,
          patientLatitude: action.payload.latitude,
          patientLongitude: action.payload.longitude
        }
      case PT_AGE_INPUT:
        return {
          ...state,
          patientAge: action.payload
        }
      case PT_FAM_PLAN_INPUT:
        return {
          ...state,
          patientFamPlan: action.payload
        }
      case PT_HIV_INPUT:
        return {
          ...state,
          patientHIV: action.payload
        }
      case PT_PARITY_INPUT:
        return {
          ...state,
          patientParity: action.payload
        }
      case PT_DUE_DATE_INPUT:
        return {
          ...state,
          patientDueDate: action.payload
        }
      case PT_ASSINGED_HW_INPUT:
        return {
          ...state,
          patientAssignedHW: action.payload
        }
      case HW_NAME_INPUT:
        return {
          ...state,
          hcwName: action.payload
        }
      case HW_PHONE_INPUT:
        return {
          ...state,
          hcwPhone: action.payload
        }
      case HW_ADDRESS_INPUT:
        return {
          ...state,
          hcwAddress: action.payload
        }
      case HW_OUTPOST_INPUT:
        return {
          ...state,
          hcwOutpost: action.payload
        }
      case HW_EMAIL_INPUT:
        return {
          ...state,
          hcwEmail: action.payload
        }
        case HW_INPUT_COORDINATES:
          return {
            ...state,
            hcwLatitude: action.payload.latitude,
            hcwLongitude: action.payload.longitude
          }
      case OUTPOST_NAME_INPUT:
        return {
          ...state,
          outpostName: action.payload
        }
      case OUTPOST_ADDRESS_INPUT:
        return {
          ...state,
          outpostAddress: action.payload
        }
      case OUTPOST_COORDINATE_INPUT:
        return {
          ...state,
          outpostLatitude: action.payload.latitude,
          outpostLongitude: action.payload.longitude
        }
      case HIDE_MODAL:
      console.log(state)
        return {
          ...state,
          openModal: action.payload,
        }
      case SHOW_MODAL:
        return {
          ...state,
          openModal: action.payload,
        }
      case SHOW_MASK:
        return {
          ...state,
          toggleMask: action.payload,
        }
      case HIDE_MASK:
        return {
          ...state,
          toggleMask: action.payload,
        }
      case TURN_ON_GEOCODER:
        return {
          ...state,
          toggleGeocoder: action.payload
        }
      case TURN_OFF_GEOCODER:
        return {
          ...state,
          toggleGeocoder: action.payload
        }
        case PATIENT_ADDRESS_SELECTOR_ON:
        return {
          ...state,
          patientAddressSelector: action.payload
        }
        case PATIENT_ADDRESS_SELECTOR_OFF:
        return {
          ...state,
          patientAddressSelector: action.payload
        }
        case HCW_ADDRESS_SELECTOR_ON:
        return {
          ...state,
          hcwAddressSelector: action.payload
        }
        case HCW_ADDRESS_SELECTOR_OFF:
        return {
          ...state,
          hcwAddressSelector: action.payload
        }
        case OUTPOST_ADDRESS_SELECTOR_ON:
        return {
          ...state,
          outpostAddressSelector: action.payload
        }
        case OUTPOST_ADDRESS_SELECTOR_OFF:
        return {
          ...state,
          outpostAddressSelector: action.payload
        }
        case CLICKED_PT_ADDRESS:
        return {
          ...state,
          patientAddress: action.payload
        }
        case CLICKED_HW_ADDRESS:
        return {
          ...state,
          hcwAddress: action.payload
        }
        case CLICKED_OUTPOST_ADDRESS:
        return {
          ...state,
          outpostAddress: action.payload
        }
      case RESET_FORM_INPUT:
        return initialState
      default:
        return state
    }
  }
  
  export function handlePTInputName(event) {
    let name = event.target.value
    return {
      type: PT_NAME_INPUT,
      payload: name
    }
  }
  export function handlePTInputPhone(event) {
    let phone = event.target.value
    return {
      type: PT_PHONE_INPUT,
      payload: phone
    }
  }
  export function handlePTInputAddress(event) {
    let address = event.target.value
    return {
      type: PT_ADDRESS_INPUT,
      payload: address
    }
  }
  export function handlePTInputCoordinates(latitude, longitude){
      let coordinates = {
          latitude: latitude,
          longitude: longitude
      }
      return{
          type: PT_INPUT_COORDINATES,
          payload: coordinates
      }
  }
  export function handlePTInputAge(event){
      return{
          type: PT_AGE_INPUT,
          payload: event.target.value
      }
  }
  export function handlePTInputFamPlan(event){
    return{
        type: PT_FAM_PLAN_INPUT,
        payload: event.target.value
    }
}
  export function handlePTInputHIV(event){
    return{
        type: PT_HIV_INPUT,
        payload: event.target.value
    }
}
  export function handlePTInputParity(event){
    return{
        type: PT_PARITY_INPUT,
        payload: event.target.value
    }
}
export function handlePTInputDueDate(event){
    return{
        type: PT_DUE_DATE_INPUT,
        payload: event
    }
}
export function handlePTInputAssignedHW(event){
    return{
        type: PT_ASSINGED_HW_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputName(event){
    return{
        type: HW_NAME_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputPhone(event){
    return{
        type: HW_PHONE_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputAddress(event){
    return{
        type: HW_ADDRESS_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputOutpost(event){
    return{
        type: HW_OUTPOST_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputEmail(event){
    return{
        type: HW_EMAIL_INPUT,
        payload: event.target.value
    }
}
export function handleHWInputCoordinates(latitude, longitude){
    let coordinates = {
        latitude: latitude,
        longitude: longitude
    }
    return{
        type: HW_INPUT_COORDINATES,
        payload: coordinates
    }
}
export function handleOutpostInputName(event){
    return{
        type: OUTPOST_NAME_INPUT,
        payload: event.target.value
    }
}
export function handleOutpostInputAddress(event){
    return{
        type: OUTPOST_ADDRESS_INPUT,
        payload: event.target.value
    }
}
export function handleOutpostInputCoordinates(latitude, longitude){
  let coords ={
    latitude: latitude,
    longitude: longitude
  }
    return{
        type: OUTPOST_COORDINATE_INPUT,
        payload: coords
    }
}

export function resetFormInputs(){
  return{
    type: RESET_FORM_INPUT
}
}

export function hideModal(){
  return{
    type: HIDE_MODAL,
    payload: false
  }
}
export function showModal(){
  return{
    type: SHOW_MODAL,
    payload: true
  }
}
export function showMask(){
  return{
    type: SHOW_MASK,
    payload: true
  }
}

export function hideMask(){
  return{
    type: HIDE_MASK,
    payload: false
  }
}

export function turnOnGeocoder(){
  return{
    type: TURN_ON_GEOCODER,
    payload: true
  }
}

export function turnOffGeocoder(){
  return{
    type: TURN_OFF_GEOCODER,
    payload: false
  }
}

// Know which menu to populate

export function patientAddressSelectorOn(){
  return{
    type: PATIENT_ADDRESS_SELECTOR_ON,
    payload: true
  }
}
export function hcwAddressSelectorOn(){
  return{
    type: HCW_ADDRESS_SELECTOR_ON,
    payload: true
  }
}
export function outpostAddressSelectorOn(){
  return{
    type: OUTPOST_ADDRESS_SELECTOR_ON,
    payload: true
  }
}

export function patientAddressSelectorOff(){
  return{
    type: PATIENT_ADDRESS_SELECTOR_OFF,
    payload: false
  }
}
export function hcwAddressSelectorOff(){
  return{
    type: HCW_ADDRESS_SELECTOR_OFF,
    payload: false
  }
}
export function outpostAddressSelectorOff(){
  return{
    type: OUTPOST_ADDRESS_SELECTOR_OFF,
    payload: false
  }
}

export function clickedPatientAddress(address){
  return{
    type: CLICKED_PT_ADDRESS,
    payload: address
  }
}

export function clickedHWAddress(address){
  return{
    type: CLICKED_HW_ADDRESS,
    payload: address
  }
}

export function clickedOutpostAddress(address){
  return{
    type: CLICKED_OUTPOST_ADDRESS,
    payload: address
  }
}

