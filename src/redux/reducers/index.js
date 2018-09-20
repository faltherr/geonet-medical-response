import { combineReducers } from 'redux'
import patients from './patientsReducer'
import map from './mapReducer'
import healthworkers from './healthworkersReducer'
import outposts from './outpostReducer'


export default combineReducers({patients, map, healthworkers, outposts})