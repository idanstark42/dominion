import React, { Component, createRef } from 'react'

import Supply from './supply'
import Dashboard from './dashboard'
import Sidebar from './sidebar'
import PlayerChoiceProvider from './player_choice_provider'

import Game from '../logic/game'

export default class GamePanel extends Component {
  constructor (props) {
    super(props)
  
    this.state = { }
    this.playerChoiceProvider = createRef()
  }

  async componentDidMount () {
    await this.setState({ game: new Game() })

    setTimeout(() => {
      this.next()
      this.forceUpdate()
    }, 1000) // Starting the game
  }

  async next () {
    await this.state.game.next(this.playerChoiceProvider.current.choose)
    // After each event in the game, we sync. Also after each choice.
  }

  handleEvent (event) {
    if (this.playerChoiceProvider.current  && this.playerChoiceProvider.current.choosing()) {
      this.playerChoiceProvider.current.handleEvent(event)
    } else {
      // Show card in big mode, width explanation
    }
    this.forceUpdate()
  }

  render () {
    if (!this.state.game) {
      return <div>Loading...</div>
    }
    console.log('game rendering')
    return <div className="game">
      <PlayerChoiceProvider ref={this.playerChoiceProvider}/>
      <Supply supply={this.state.game.supply} handleEvent={event => this.handleEvent(event)}></Supply>
      <Sidebar game={this.state.game}></Sidebar>
      <Dashboard player={this.state.game.players[0]} turn={this.state.game.turn}
        handleEvent={event => this.handleEvent(event)}
        valid={this.playerChoiceProvider.current && this.playerChoiceProvider.current.valid()}
        doneAction={this.playerChoiceProvider.current ? this.playerChoiceProvider.current.doneAction() : 'No action'}>
      </Dashboard>
    </div>
  }
}