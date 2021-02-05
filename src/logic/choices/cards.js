import Choice from './choice'

export default class Cards extends Choice {
  constructor(parameters) {
    super()
    this.cards = []
    this.source = parameters[0] || 'hand'
    this.filters = parameters[1] || {}
  }

  result () {
    return this.cards
  }

  valid () {
    return (this.filters.maxAmount ? this.cards.length <= this.filters.maxAmount : true) &&
      (this.filters.minAmount ? this.cards.length >= this.filters.minAmount : true) &&
      (this.filters.amount ? this.cards.length === this.filters.amount : true) &&
      (this.cards.every(card => this.matching(card)))
  }

  onCardClick (cardClickEvent) {
    if (cardClickEvent.source === this.source && this.matching(cardClickEvent.card)) {
      this.cards.push(cardClickEvent.card)
    } else if (cardClickEvent.source === 'chosen') {
      this.cards.splice(this.cards.indexOf(cardClickEvent.card), 1)
    }
  }

  matching (card) {
    return (this.filters.maxCost ? card.cost <= this.filters.maxCost : true) &&
      (this.filters.name ? card.name === this.filters.name : true) &&
      (this.filters.type ? card.types.includes(this.filters.type) : true)
  }
}