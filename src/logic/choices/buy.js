import Cards from './cards'

export default class Buy extends Cards {
  constructor(parameters) {
  	super(['supply', { }])
	this.coins = parameters[0] || 0
    this.buys = parameters[1] || 1

    this.allowSkip = true
  }

  valid () {
    return this.cards.length <= this.buys && this.cards.reduce((sum, { cost }) => sum + cost, 0) <= this.coins
  }
}