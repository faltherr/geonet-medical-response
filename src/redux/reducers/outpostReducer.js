import axios from 'axios'

const FULFILLED = '_FULFILLED'
const GET_OUTPOSTS = 'GET_OUTPOSTS'
const GET_OUTPOSTGRAPHIC = 'GET_OUTPOSTGRAPHIC'

let initialState = {
  outpostData: [],
  outpostGraphic: {}
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case GET_OUTPOSTS + FULFILLED:
      return {...state, outpostData: action.payload}
    case GET_OUTPOSTGRAPHIC:
      return {...state, outpostGraphic: action.payload}
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