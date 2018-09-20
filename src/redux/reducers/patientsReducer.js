import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_PATIENTS = 'GET_PATIENTS'

let initialState = {
  patientData: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS + FULFILLED:
      return { ...state, patientData: action.payload}
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