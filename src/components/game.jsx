import React, { Component } from 'react'

import Supply from './supply'
import Players from './players'
import Status from './status'
import Turn from './turn'
import Hand from './hand'

import ChoiceDialog from './choice_dialog'
import Stats from './stats'

import Game from '../logic/game'
import Choices from '../logic/choices'

export default class GamePanel extends Component {
  constructor (props) {
    super(props)
  
    this.state = { }
    this.choicesManager = new Choices()
  }

  async componentDidMount () {
    await this.setState({
      game: new Game({ onUpdate: () => { this.onUpdate() } })
    })

    this.choicesManager.on('starting choice', () => { this.forceUpdate() })

    setTimeout(() => this.next(), 1000)
  }

  async next () {
    await this.state.game.next(this.choicesManager)
    this.forceUpdate()
    // After each event in the game, we sync. Also after each choice.
    if (this.state.game.over()) {
      this.setState({ over: true })
    }
  }

  onUpdate () {
    if (this.state.game.myTurn()) {
      this.next()
    }
  }

  handleEvent (event) {
    if (this.state.over) {
      return
    }
    this.choicesManager.handleEvent(event)
    this.forceUpdate()
  }

  render () {
    if (!this.state.game) {
      return <div>Loading...</div>
    }

    return <div className="game">
      <Supply supply={this.state.game.supply} handleEvent={event => this.handleEvent(event)}></Supply>
      <Players game={this.state.game}></Players>
      <Status game={this.state.game} handleEvent={event => this.handleEvent(event)} choice={this.choicesManager.choice}></Status>
      <Turn turn={this.state.game.turn} handleEvent={event => this.handleEvent(event)} choice={this.choicesManager.choice}></Turn>
      <Hand player={this.state.game.localPlayer} handleEvent={event => this.handleEvent(event)}>
      </Hand>
      <ChoiceDialog player={this.state.game.localPlayer} game={this.state.game} choice={this.choicesManager.choice} handleEvent={event => this.handleEvent(event)}></ChoiceDialog>
      {this.state.over ? <Stats game={this.state.game} /> : ''}
    </div>
  }
}