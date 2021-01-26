export default class Turn {
  constructor (player, game) {
    this.player = player
    this.game = game
    
    this.actions = 1
    this.buys = 1
    this.coins = 0

    this.phase = Turn.PHASES.ACTION
    this.modifiers = []
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

  change (stat, amount) {
    this[stat] = this[stat] + amount
  }

  modifyValue (modifier) {
    this.modifier.push(modifier)
  }

  moveToBuyPhase () {
    this.requirePhase(Turn.PHASES.ACTION)
    this.phase = Turn.PHASES.BUY

    // Coins calculations
    const treasureCards = this.player.hand.filter(card => card.types.includes('treasure'))
    const treasureValue = treasureCards.reduce((sum, card) => sum + card.coins, 0)

    // Allow action cards to add or reduce coins at this point according to any condition they might need.
    this.modifiers.forEach(modifier => {
      treasureValue = modifier(treasureValue, treasureCards, turn, player) || treasureValue
    })

    this.coins = this.coins + treasureValue
  }

  requirePhase (phase) {
    if (!this.phase === phase) {
      throw new Error('Phase missmatch.')
    }
  }
}

Turn.PHASES = { ACTION: 'action', BUY: 'buy' }