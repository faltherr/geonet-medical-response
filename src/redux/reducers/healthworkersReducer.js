import axios from 'axios'

const GET_HEALTH_WORKER_GRAPHIC = 'GET_HEALTH_WORKER_GRAPHIC'
const GET_HEALTH_WORKERS = 'GET_HEALTH_WORKERS'
const FULFILLED = '_FULFILLED' 

let initialState = {
  healthWorkerGraphic: {},
  healthWorkersData: []
}

export default function reducer (state = initialState, action) {
  console.log('1111111',action.payload)
  switch (action.type) {
    case GET_HEALTH_WORKER_GRAPHIC:
      return { ...state, healthWorkerGraphic: action.payload}
    case GET_HEALTH_WORKERS + FULFILLED:
      return { ...state, healthWorkersData: action.payload}
    default:
      return state
  }
}

export function getHealthWorkerGraphic (healthWorkerGraphic) {
  return {
    type: GET_HEALTH_WORKER_GRAPHIC,
    payload: healthWorkerGraphic
  }
}

export function getHealthWorkers () {
  let healthWorkers = axios.get('/api/healthworkers').then(response => {
    return response.data
  })
  return {
    type: GET_HEALTH_WORKERS,
    payload: healthWorkers
  }
}