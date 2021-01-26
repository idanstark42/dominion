export default class Turn {
  constructor (player, game) {
    this.player = player
    this.game = game
    
    this.actions = 1
    this.buys = 1
    this.coins = 0

    this.phase = Turn.PHASES.ACTION
  }

  playAction (card, playerChoices) {
    this.requirePhase(Turn.PHASES.ACTION)

    if (card.coins)   { this.coins    += card.coins   }
    if (card.buys)    { this.buys     += card.buys    }
    if (card.actions) { this.actions  += card.actions }

    this.actions = this.actions - 1

    if (this.actions === 0) { // No more actions, go to buy phase
      this.moveToBuyPhase()
    }

    card.action(this, this.player, this.game, playerChoices)
  }

  moveToBuyPhase () {
    this.requirePhase(Turn.PHASES.ACTION)
    this.phase = Turn.PHASES.BUY
  }

  requirePhase (phase) {
    if (!this.phase === phase) {
      throw new Error('Phase missmatch.')
    }
  }
}

Turn.PHASES = { ACTION: 'action', BUY: 'buy' }