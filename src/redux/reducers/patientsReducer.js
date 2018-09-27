import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_PATIENTS = 'GET_PATIENTS'
const GET_PATIENTGRAPHIC = 'GET_PATIENTGRAPHIC'
const UPDATE_PATIENT = 'UPDATE_PATIENT'
const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT'

let initialState = {
  patientsData: [],
  patientGraphic: {},
  currentPatient: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS + FULFILLED:
      return { ...state, patientsData: action.payload }
    case GET_PATIENTGRAPHIC:
      return { ...state, patientGraphic: action.payload }
    case UPDATE_PATIENT + FULFILLED: 
      return {... state, patientsData: action.payload }
    case SET_CURRENT_PATIENT:
      return { ...state, currentPatient: action.payload }
    default:
      return state
  }
}

export function getPatients () {
  let patients = axios.get('/api/patients').then(response => {
    return response.data
  })
  return {
    type: GET_PATIENTS,
    payload: patients
  }
}

export function getPatientGraphic (patientGraphic) {
  return {
    type: GET_PATIENTGRAPHIC,
    payload: patientGraphic
  }
}

export function updatePatient (id, patient, cb) {
  let update = axios.put(`/api/surveys/${id}`, patient).then( response => {
    cb && cb()
    return response.data
  })
  return {
    type: UPDATE_PATIENT,
    payload: update
  }
}

export function setCurrentPatient (patient) {
  return {
    type: SET_CURRENT_PATIENT,
    payload: patient
  }
}
