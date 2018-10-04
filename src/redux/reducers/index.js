import { combineReducers } from 'redux'
import patients from './patientsReducer'
import map from './mapReducer'
import healthworkers from './healthworkersReducer'
import outposts from './outpostReducer'
import survey from './surveyReducer'
import newForm from './formReducer'
import logout from './verifiedUser'

export default combineReducers({patients, map, healthworkers, outposts, survey, newForm, logout})

