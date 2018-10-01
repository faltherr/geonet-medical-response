import axios from 'axios'

const GET_HEALTHWORKER_GRAPHIC = 'GET_HEALTHWORKER_GRAPHIC'
const GET_HEALTHWORKERS = 'GET_HEALTHWORKERS'
const FULFILLED = '_FULFILLED' 
const ADD_HEALTHWORKER = 'ADD_HEALTHWORKER'
const UPDATE_HEALTHWORKER = 'UPDATE_HEALTHWORKER'
const SET_CURRENT_HEALTHWORKER = 'SET_CURRENT_HEALTHWORKER'


let initialState = {
  healthworkerGraphic: {},
  currentHealthworker: {},
  healthworkersData: [],
  healthworkerPointGeometry: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_HEALTHWORKER_GRAPHIC:
      return { ...state, healthworkerGraphic: action.payload}
    case GET_HEALTHWORKERS + FULFILLED:
      return { ...state, healthworkersData: action.payload}
    case UPDATE_HEALTHWORKER + FULFILLED: 
      return { ...state, healthworkersData: action.payload}
    case SET_CURRENT_HEALTHWORKER:
      return { ...state, currentHealthworker: action.payload}
    default:
      return state
  }
}

export function getHealthworkerGraphic (healthworkerGraphic) {
  return {
    type: GET_HEALTHWORKER_GRAPHIC,
    payload: healthworkerGraphic
  }
}

export function getHealthworkers () {
  let healthworkers = axios.get('/api/healthworkers').then(response => {
    return response.data
  })
  return {
    type: GET_HEALTHWORKERS,
    payload: healthworkers
  }
}

export function addHCW (state) {

  let hcwData ={
    name: state.hcwName,
    phone: state.hcwPhone,
    address: state.hcwAddress,
    outpost_id: state.hcwOutpost,
    email: state.hcwEmail,
    latitude: state.hcwLatitude,
    longitude: state.hcwLongitude,
    location: state.hcwAddress
  }

  let outposts = axios.post('/api/healthworkers', hcwData).then(response => {
    return response.data
  })
  return {
    type: ADD_HEALTHWORKER,
    payload: outposts
  }
}

export function updateHealthworker ( id, healthworker, cb) {
  let update = axios.put(`/api/healthworkers/${id}`, healthworker).then( response => {
    cb && cb()
    return response.data
  })
  return {
    type: UPDATE_HEALTHWORKER,
    payload: update
  }
}

export function setCurrentHealthworker (healthworker) {
  return {
    type: SET_CURRENT_HEALTHWORKER,
    payload: healthworker
  }
}