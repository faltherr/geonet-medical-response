const GET_MAP = 'GET_MAP'
const GEOCODE_CLICKER_ON = 'GEOCODE_CLICKER_ON'
const GEOCODE_CLICKER_OFF = 'GEOCODE_CLICKER_OFF'
const ADD_MENU_CONTENT_ON = 'ADD_MENU_CONTENT_ON'
const ADD_MENU_CONTAINER_ON = 'ADD_MENU_CONTAINER_ON'
const ADD_MENU_OFF = 'ADD_MENU_OFF'
// const OPEN_ADD_MODAL = 'OPEN_ADD_MODAL'
// const GET_MAPVIEW = 'GET_MAPVIEW'


let initialState = {
  map: {},
  mapView: {},
  toggleGeoCoderClicker: false,
  modalDisplay: "none",
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MAP:
      return {
        ...state,
        map: action.payload.map,
        mapView: action.payload.mapView
      }
    case GEOCODE_CLICKER_ON:
      return {
        ...state,
        toggleGeoCoderClicker: action.payload
      }
    case GEOCODE_CLICKER_OFF:
      return {
        ...state,
        toggleGeoCoderClicker: action.payload
      }
    case ADD_MENU_CONTENT_ON:
      return {
        ...state,
        toggleGeoCoderClicker: action.payload
      }
    case ADD_MENU_CONTAINER_ON:
      return {
        ...state,
        toggleGeoCoderClicker: action.payload
      }
    case ADD_MENU_OFF:
      return {
        ...state,
        toggleGeoCoderClicker: action.payload
      }
    default:
      return state
  }
}

export function getMap(mapObj) {
  return {
    type: GET_MAP,
    payload: mapObj
  }
}

export function toggleGeoCoderClickerOn() {
  return {
    type: GEOCODE_CLICKER_ON,
    payload: true
  }
}

export function toggleGeoCoderClickerOff() {
  return {
    type: GEOCODE_CLICKER_OFF,
    payload: false
  }
}

// // This sets the class name display to block for the container when invoked to pull up the container again
// export function addMenuContent() {
//   return {
//     type: ADD_MENU_CONTENT_ON,
//     payload: 'block'
//   }
// }

// // This sets the class name display to flex for the content (Middle items) when invoked to pull up the container again
// export function addMenuContainer() {
//   return {
//     type: ADD_MENU_CONTAINER_ON,
//     payload: 'flex'
//   }
// }

// // This sets the class name display to none when invoked
// export function addMenuOff() {
//   return {
//     type: ADD_MENU_OFF,
//     payload: 'none'
//   }
// }

// // This sets the class name display to none when invoked
// export function openAddModal() {
//   return {
//     type: OPEN_ADD_MODAL,
//     payload: true
//   }
// }



