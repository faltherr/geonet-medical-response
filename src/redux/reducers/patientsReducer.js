import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_PATIENTS = 'GET_PATIENTS'
const GET_PATIENTGRAPHIC = 'GET_PATIENTGRAPHIC'


let initialState = {
  patientsData: [],
  patientGraphic: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS + FULFILLED:
      return { ...state, patientsData: action.payload}
    case GET_PATIENTGRAPHIC:
      return { ...state, patientGraphic: action.payload}
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
