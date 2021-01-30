export default class Turn {
  constructor (player, game) {
    this.player = player
    this.game = game
    
    this.actions = 1
    this.buys = 1
    this.coins = 0

    this.phase = Turn.PHASES.ACTION
    this.modifiers = []
    this.playerActions = []
  }

  // next - perform the next step of the turn.
  // If it's the action phase - perform an action
  // If the action phase is over, move to buy phase and purchase. 
  async next (choose, end) {
    if (this.actions === 0 || this.player.hand.filter(card => card.types.includes('action')).length === 0) { // No more actions, go to buy phase
      this.moveToBuyPhase()
      const cards = await choose.buy(this.coins, this.buys)
      cards.forEach(card => this.player.gain(card))
      end()
    } else {
      const card = await choose.card('hand', { type: 'action' })
      this.playAction(card, choose)
    }
  }

  async playAction (card, choose, reduceActionsCount=true) {
    this.requirePhase(Turn.PHASES.ACTION)

    this.turn.playerActions.push(card)

    if (reduceActionsCount) {
      this.actions = this.actions - 1
    }

    await card.action({ turn: this, player: this.player, game: this.game, choose })
  }

  change (stat, amount) {
    this[stat] = this[stat] + amount
  }

  modifyValue (modifier) {
    this.modifier.push(modifier)
  }

  currentCoins () {
    // Coins calculations
    const treasureCards = this.player.hand.filter(card => card.types.includes('treasure'))
    let treasureValue = treasureCards.reduce((sum, card) => sum + card.coins, 0)

    // Allow action cards to add or reduce coins at this point according to any condition they might need.
    this.modifiers.forEach(modifier => {
      treasureValue = modifier(treasureValue, treasureCards, this, this.player) || treasureValue
    })

    return this.coins + treasureValue
  }

  moveToBuyPhase () {
    this.requirePhase(Turn.PHASES.ACTION)
    this.phase = Turn.PHASES.BUY
    this.coins = this.currentCoins()
  }

  requirePhase (phase) {
    if (!this.phase === phase) {
      throw new Error('Phase missmatch.')
    }
  }
}

Turn.PHASES = { ACTION: 'action', BUY: 'buy' }