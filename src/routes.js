import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Dashboard from './components/dashboard'
import Landing from './components/landing'

export default (
  <Switch>
      <Route exact path='/' component={ Landing }/>
      <Route path='/dashboard' component={ Dashboard }/>
  </Switch> 

)