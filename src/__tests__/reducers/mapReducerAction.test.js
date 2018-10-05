import * as mapReducer from '../../redux/reducers/mapReducer'
import reducer from '../../redux/reducers/mapReducer'

const initialState = {
    map: {},
    mapView: {},
    toggleGeoCoderClicker: false,
    modalDisplay: "none",
}

const GEOCODE_CLICKER_ON = 'GEOCODE_CLICKER_ON'

// Testing the action creator is built correctly

describe('Map Reducer Actions', () => {
    it('should create action creator that matches the map reducer', ()=>{
        const expectedAction = {
            type: 'GEOCODE_CLICKER_OFF',
            payload: false
        }
        expect(mapReducer.toggleGeoCoderClickerOff()).toEqual(expectedAction)
    })
})

//Testing the initial state is as expected AND Testing the geocode toggle flips to false when OFF
describe('Map reducer', () => {
        it('returns the initial state', () => {
          expect(reducer(undefined, {})).toEqual(initialState)
        })
        it('handles geocode toggler', () => {
            expect(reducer(initialState, {type: GEOCODE_CLICKER_ON, payload:true})).toEqual({
              ...initialState,
              toggleGeoCoderClicker: true
            });
          });
    })
