import Choice from './choice'

export default class Order extends Choice {
  constructor(parameters) {
    super()

    this.cards = parameters[0].cards
    this.orderedCards = []
    this.donnable = false
  }

  handleEvent (event) {
    switch (event.type) {
      case 'reset':
      this.orderedCards = []
      break
      case 'card click':
      this.orderedCards.push(event.card)
      break
      case 'done':
      this._result = this.cards
      break
    }
  }
}