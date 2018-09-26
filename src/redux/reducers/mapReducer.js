const GET_MAP = 'GET_MAP'
// const GET_MAPVIEW = 'GET_MAPVIEW'


let initialState = {
  map: {},
  mapView: {}
}

export default function reducer ( state = initialState, action) {
  switch (action.type) {
    case GET_MAP: 
      return {...state, 
        map: action.payload.map,
      mapView: action.payload.mapView}
    default:
      return state
  }
}

export function getMap (mapObj) {
  return {
    type: GET_MAP,
    payload: mapObj
  }
}


