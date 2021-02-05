import Player from './player'
import Supply from './supply'
import Turn from './turn'

export default class Game {
  constructor ({ players=1, actions=null, onUpdate=false }) {
    this.supply = new Supply(actions)
    this.players = Array(players).fill('A').map((a, index) => new Player(this.supply, index))
    this.onUpdate = onUpdate

    this.nextPlayerIndex = Math.floor(Math.random() * players)
    this.localPlayer = this.players[0]
  }

  async next (choose) {
    if (!this.turn) {
      this.nextTurn()
    }

    await this.turn.run(choose)
    this.nextTurn()
    await this.push() // Upon synchronization data recieving, if the turn is mine, the I would run it.
  }

  async push () {
    // TODO
    await this.pull()
  }

  async pull () {
    // TODO

    if (this.onUpdate) {
      this.onUpdate()
    }
  }

  myTurn () {
    return this.localPlayer === this.turn.player
  }

  nextTurn () {
    this.turn = new Turn(this.players[this.nextPlayerIndex])
    this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.players.length
    return this.turn
  }

  over () {
    return this.supply.emptyPiles() >= 3 || this.supply.piles.province.length === 0
  }

  stats () {
    return this.players.map(player => player.stats())
  }
}