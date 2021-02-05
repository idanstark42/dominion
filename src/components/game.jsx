import React, { Component, createRef } from 'react'

import Supply from './supply'
import Players from './players'
import Status from './status'
import Turn from './turn'
import Hand from './hand'
import PlayerChoiceProvider from './player_choice_provider'

import Game from '../logic/game'

export default class GamePanel extends Component {
  constructor (props) {
    super(props)
  
    this.state = { }
    this.playerChoiceProvider = createRef()
  }

  async componentDidMount () {
    await this.setState({ game: new Game({ onUpdate: () => { this.onUpdate() } }) })

    setTimeout(() => this.next(), 1000)
  }

  async next () {
    await this.state.game.next(this.playerChoiceProvider.current.choose)
    this.forceUpdate()
    // After each event in the game, we sync. Also after each choice.
  }

  onUpdate () {
    if (this.state.game.myTurn()) {
      this.next()
    }
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
    console.log('game rendering', this.playerChoiceProvider.current && this.playerChoiceProvider.current.currentChoice().valid())
    return <div className="game">
      <PlayerChoiceProvider ref={this.playerChoiceProvider} onChoosing={() => this.forceUpdate()}/>

      <Supply supply={this.state.game.supply} handleEvent={event => this.handleEvent(event)}></Supply>
      <Players game={this.state.game}></Players>
      <Status game={this.state.game} handleEvent={event => this.handleEvent(event)} playerChoiceProvider={this.playerChoiceProvider.current}></Status>
      <Turn turn={this.state.game.turn} handleEvent={event => this.handleEvent(event)} playerChoiceProvider={this.playerChoiceProvider.current}></Turn>
      <Hand player={this.state.game.localPlayer} handleEvent={event => this.handleEvent(event)}>
      </Hand>
    </div>
  }
}