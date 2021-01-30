/**
 * The Game API:
 * // @players is the amount of players. Default to 2
 * // @actions is the action cards for this game. If not givven generated randomly
 * const game = new Game(player, actions)
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

  async next (choose) {
    if (!this.turn) {
      const player = this.players[this.nextPlayerIndex]
      this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.players.length
      this.turn = new Turn(player, this)
    }
    
    await this.turn.next(choose, () => this.end())
  }

  end () {
    this.turn = null
  }
}