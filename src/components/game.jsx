import React, { Component } from 'react'

import Supply from './supply'
import Dashboard from './dashboard'
import Sidebar from './sidebar'

import Game from '../logic/game'

export default class GamePanel extends Component {
  constructor (props) {
    super(props)
  
    this.state = { }
  }

  componentDidMount () {
    this.setState({ game: new Game() })
  }

  render () {
    if (!this.state.game) {
      return <div>Loading...</div>
    }
    return <div className="game">
      <Supply supply={this.state.game.supply}></Supply>
      <Sidebar game={this.state.game}></Sidebar>
      <Dashboard player={this.state.game.players[0]}></Dashboard>
    </div>
  }
}