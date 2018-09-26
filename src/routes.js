import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Dashboard from './components/dashboard'
import Landing from './components/landing'
import About from './components/about'

export default (
  <Switch>
      <Route exact path='/' component={ Landing }/>
      <Route path='/dashboard' component={ Dashboard }/>
      <Route path='/about' component={ About }/>
  </Switch> 

)