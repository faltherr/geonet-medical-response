import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_OUTPOSTS = 'GET_OUTPOSTS'
const GET_OUTPOSTGRAPHIC = 'GET_OUTPOSTGRAPHIC'
const DELETE_OUTPOST = 'DELETE_OUTPOST'
const ADD_OUTPOST = 'ADD_OUTPOST'

let initialState = {
  outpostsData: [],
  outpostGraphic: {}
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_OUTPOSTS + FULFILLED:
      return {...state, outpostsData: action.payload}
    case GET_OUTPOSTGRAPHIC:
      return {...state, outpostGraphic: action.payload}
    case ADD_OUTPOST + FULFILLED:
      return {...state, outpostData: action.payload}
    case DELETE_OUTPOST + FULFILLED: 
      let { id } = action.payload
      let newOutpostsData = state.outpostsData.filter (outposts => {
        return !(outposts.id === Number(id))
      })
      return { ...state, outpostsData: newOutpostsData }
    default:
    return state
  }
}


export function getOutposts () {
  let outposts = axios.get('api/outposts').then(response => {
    return response.data
  })
  return {
    type: GET_OUTPOSTS,
    payload: outposts
  }
}

export function getOutpostGraphic (outpostGraphic) {
  return {
    type: GET_OUTPOSTGRAPHIC,
    payload: outpostGraphic
  }
}

export function deleteOutpost (id) {
  let deleted = axios.delete(`/api/outposts/${id}`).then( response => {
    return response.data
  })
  return {
    type: DELETE_OUTPOST,
    payload: deleted
  }
}

export function addOutpost (props) {

  let outpostData ={
    name: props.outpostName,
    location: props.outpostAddress,
    latitude: props.outpostLatitude,
    longitude: props.outpostLongitude,
  }
  let outposts = axios.post('api/outposts', outpostData).then(response => {
    return response.data
  })
  return {
    type: ADD_OUTPOST,
    payload: outposts
  }
}