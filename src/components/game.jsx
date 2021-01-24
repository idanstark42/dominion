import React, { Component } from 'react'

import Supply from './supply'
import Dashboard from './dashboard'
import Sidebar from './sidebar'

export default class Game extends Component {
  constructor (props) {
    super(props);
  
    this.state = {};
  }

  render () {
    return <div className="game">
      <Supply></Supply>
      <Sidebar></Sidebar>
      <Dashboard></Dashboard>
    </div>
  }
}