import Card from './card'

export default class Turn {
  constructor (player, game) {
    this.player = player
    this.game = game
    
    this.actions = 1
    this.buys = 1
    this.coins = 0

    this.phase = Turn.PHASES.ACTION
    this.modifiers = []
    this.playedActions = []
  }

  async run (choose) {
    choose.setContext(this)
    await this.actionPhase(choose)
    await this.buyPhase(choose)
    console.log(this.player)
    this.playedActions.forEach(card => this.player.discarded.push(card))
    this.player.newHand()
    choose.clearContext()
  }

  async actionPhase (choose) {
    while (this.actions > 0 && this.player.hand.some(card => card.types.includes('action'))) {
      const card = await choose.action()
      if (card === 'NO RESULT') {
        break
      } else {
        await this.playAction(card, choose)
      }
    }
  }

  async buyPhase (choose) {
    this.phase = Turn.PHASES.BUY
    const cards = await choose.buy(this.currentCoins(), this.buys)
    if (cards !== 'NO RESULT') {
      cards.forEach(card => this.player.gain(card))
    }
  }

  async playAction (card, choose, reduceActionsCount=true) {
    if (this.player.hand.indexOf(card) !== -1) {
      this.playedActions.push(card)
      this.player.hand.splice(this.player.hand.indexOf(card), 1)
    }

    if (reduceActionsCount) {
      this.actions = this.actions - 1
    }

    choose.setLabel(card.name)
    const nextActions = await card.action({ turn: this, player: this.player, game: this.game, choose })
    choose.clearLabel()

    if (nextActions) {
      if (Array.isArray(nextActions)) {
        for (let i = 0; i < nextActions.length; i++) {
          await this.playAction(nextActions[i], choose, false)
        }
      } else if (nextActions instanceof Card) {
        await this.playAction(nextActions, choose, false)
      }
    }
  }

  change (stat, amount) {
    this[stat] = this[stat] + amount
  }

  modifyValue (modifier) {
    this.modifiers.push(modifier)
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