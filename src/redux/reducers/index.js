import { combineReducers } from 'redux'
import patients from './patientsReducer'
import map from './mapReducer'
import healthworkers from './healthworkersReducer'
import outposts from './outpostReducer'
import survey from './surveyReducer'
import logout from './verifiedUser'

export default combineReducers({patients, map, healthworkers, outposts, survey, logout})
