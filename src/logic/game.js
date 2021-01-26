/**
 * The Game API:
 * // @players is the amount of players. Default to 2
 * // @actions is the action cards for this game. If not givven generated randomly
 * const game = new Game(player, actions)
 * 
 * // To get the next turn:
 * const turn = game.next()
 * 
 */

import Player from './player'
import Supply from './supply'
import Turn from './turn'

export default class Game {
  constructor (players=2, actions=null) {
    this.supply = new Supply(actions)
    this.players = Array(players).fill(new Player(this.supply))
    this.nextPlayerIndex = Math.floor(Math.random() * players)
  }

  next () {
    const player = this.players[this.nextPlayerIndex]
    this.nextPlayerIndex = this.nextPlayerIndex + 1
    return new Turn(player, this)
  }
}