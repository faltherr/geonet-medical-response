import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes'
import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* { routes } */}
        HELLO
        <Dashboard />
      </div>
    );
  }
}

export default App;
