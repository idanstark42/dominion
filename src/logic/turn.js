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

  async run (choose) {
    await this.actionPhase(choose)
    await this.buyPhase(choose)
    this.player.newHand()
  }

  async actionPhase (choose) {
    while (this.actions > 0 && this.player.hand.some(card => card.types.includes('action'))) {
      const card = await choose.cards('hand', { amount: 1, type: 'action' })
      this.playAction(card, choose)
    }
  }

  async buyPhase (choose) {
    this.phase = Turn.PHASES.BUY
    const cards = await choose.buy(this.currentCoins(), this.buys)
    cards.forEach(card => this.player.gain(card))
  }

  async playAction (card, choose, reduceActionsCount=true) {
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
}

Turn.PHASES = { ACTION: 'action', BUY: 'buy' }