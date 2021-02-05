import Cards from './cards'

export default class Card extends Cards {
  constructor(parameters) {
    super(parameters)
    
    Object.assign(this.filters, { amount: 1 })
  }

  result () {
    return this.cards[0]
  }
}