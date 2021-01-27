import React, { Component } from 'react'

import Supply from './supply'
import Dashboard from './dashboard'
import Sidebar from './sidebar'
import PlayerChoiceProvider from './player_choice_provider'

import Game from '../logic/game'

export default class GamePanel extends Component {
  constructor (props) {
    super(props)
  
    this.state = { }
    this.playerChoiceProvider = React.createRef()
  }

  componentDidMount () {
    this.setState({ game: new Game() })
  }

  async next () {
    await game.next(this.playerChoiceProvider.allowPlayerChoice)
  }

  render () {
    if (!this.state.game) {
      return <div>Loading...</div>
    }
    return <div className="game">
      <PlayerChoiceProvider ref={this.playerChoiceProvider}/>
      <Supply supply={this.state.game.supply}></Supply>
      <Sidebar game={this.state.game}></Sidebar>
      <Dashboard player={this.state.game.players[0]}></Dashboard>
    </div>
  }
}