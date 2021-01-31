import Choice from './choice'

export default class Cards extends Choice {
  constructor(props) {
    super(props)
    this.cards = []
    this.source = props.source
  }

  result () {
    return this.cards
  }

  onCardClick (cardClickEvent) {
    if (cardClickEvent.source === this.source) {
      this.cards.push(cardClickEvent.card)
    }
  }
}