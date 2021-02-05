import Cards from './cards'

export default class Card extends Cards {
  constructor(props) {
    super(props)
    
    this.filters = { type: 'action' }
  }

  result () {
    return this.cards[0]
  }
}