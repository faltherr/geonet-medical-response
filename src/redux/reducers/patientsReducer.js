import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_PATIENTS = 'GET_PATIENTS'
const GET_PATIENTGRAPHIC = 'GET_PATIENTGRAPHIC'
const ADD_NEW_SURVEY = 'ADD_NEW_SURVEY'


let initialState = {
  patientsData: [],
  patientGraphic: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS + FULFILLED:
      return { ...state, patientsData: action.payload }
    case GET_PATIENTGRAPHIC:
      return { ...state, patientGraphic: action.payload }
    case ADD_NEW_SURVEY + FULFILLED:
      return { ...state, patientsData: action.payload }
    default:
      return state
  }
}

export function getPatients() {
  let patients = axios.get('/api/patients').then(response => {
    return response.data
    // console.log('response', response.data)
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
    completed: true
  }

  let newPatientSurvey = axios.post('/api/surveys', patientSurveyData).then(response => {
    return response.data
  })
  return {
    type: ADD_NEW_SURVEY,
    payload: newPatientSurvey
  }
}
