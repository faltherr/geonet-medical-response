import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_PATIENTS = 'GET_PATIENTS'
const GET_PATIENTGRAPHIC = 'GET_PATIENTGRAPHIC'
const ADD_NEW_SURVEY = 'ADD_NEW_SURVEY'
const UPDATE_PATIENT = 'UPDATE_PATIENT'
const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT'
const ASSIGN_HEALTHWORKER_TO_PATIENT = 'ASSIGN_HEALTHWORKER_TO_PATIENT'


let initialState = {
  patientsData: [],
  patientGraphic: {},
  currentPatient: {},
  patientPointGeometry: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS + FULFILLED:
      return { ...state, patientsData: action.payload }
    case GET_PATIENTGRAPHIC:
      return { ...state, patientGraphic: action.payload }
    case ADD_NEW_SURVEY + FULFILLED:
      return { ...state, patientsData: action.payload }
    case UPDATE_PATIENT + FULFILLED: 
      return {...state, patientsData: action.payload }
    case SET_CURRENT_PATIENT:
      return { ...state, currentPatient: action.payload }
    case ASSIGN_HEALTHWORKER_TO_PATIENT + FULFILLED:
      return { ...state, patientsData: action.payload}

    default:
      return state
  }
}

export function getPatients() {
  let patients = axios.get('/api/patients').then(response => {
    return response.data
  })
  return {
    type: GET_PATIENTS,
    payload: patients
  }
}

export function getPatientGraphic(patientGraphic) {
  return {
    type: GET_PATIENTGRAPHIC,
    payload: patientGraphic
  }
}

export function addPatientSurvey(state) {

  console.log(state)
  
  let formattedDate = state.patientDueDate.format('YYYY/MM/d')

  let patientSurveyData = {
    name: state.patientName,
    phone: state.patientPhone ,
    location: state.patientAddress,
    latitude: state.patientLatitude,
    longitude: state.patientLongitude,
    age: state.patientAge,
    famplan: state.patientFamPlan,
    hiv: state.patientHIV,
    parity: state.patientParity,
    duedate: formattedDate,
    completed: true,
    HWID: state.patientAssignedHW,
  }

  let newPatientSurvey = axios.post('/api/surveys', patientSurveyData).then(response => {
    return response.data
  })
  return {
    type: ADD_NEW_SURVEY,
    payload: newPatientSurvey
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

export function assignHealthworkerToPatient (id) {
  let assign = axios.put(`/api/patients/${id}`).then( response => {
    return response.data
  })
  return {
    type: ASSIGN_HEALTHWORKER_TO_PATIENT,
    payload: assign
  }
}
