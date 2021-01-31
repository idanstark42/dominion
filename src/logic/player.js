import shuffle from 'shuffle-array'

import config from '../config'

export default class Player {
  constructor (supply) {
    this.discarded = []
    this.hand = []
    this.deck = []
    this.supply = supply

    config.startingDeck.forEach(card => this.gain(card, 'deck'))
    this.shuffle()
    this.newHand()

    this.log = []
  }

  // data

  cards () {
    return [].concat(this.deck).concat(this.hand).concat(this.discarded)
  }

  // Inner actions

  shuffle () {
    this.deck = this.cards()
    this.discarded = []
    shuffle(this.deck)
  }

  newHand () {
    while (this.hand.length > 0) {
      this.discard(this.hand[0])
    }
    this.draw(config.cardsInHand)
  }

  draw (count=1) {
    if (count === 1) {
      const card = this.deck.pop()
      this.hand.push(card)
      return card
    } else {
      const cards = []
      for (let i = 0; i < count; i++) {
        const card = this.deck.pop()
        this.hand.push(card)
        cards.push(card)
      }
      return cards
    }
  }

  discard (card) {
    this.hand.splice(this.hand.indexOf(card), 1)
    this.discarded.push(card)
  }

  return (card) {
    this.hand.splice(this.hand.indexOf(card), 1)
    this.deck.push(card)
  }

  moveIf (source, target, conditionFunction) {
    const card = this[source][0]
    if (conditionFunction(card)) {
      if (target === 'trash') {
      	this.trashTop(source)
      } else {
      	this[target].push(this[source].pop())
      }
    }
  }

  move (card, source, target) {
    if (target === 'trash') {
      this.trash(card, source)
    } else {
      source.splice(source.indexOf(card), 1)
      this[target].push(card)
    }
  }

  // Outer actions

  gain (card, target = 'discarded') {
  	this[target].push(this.supply.takeCard(card.constructor.name === 'Card' ? card.name : String(card)))
  }

  trash (card, source = 'hand') {
  	this[source].splice(this.hand.indexOf(card), 1)
  	this.supply.trash.push(card)
  }

  trashTop (source = 'hand') {
    this.supply.trash.push(this[source].pop())
  }

  // End of game calculations

  points () {
    this.cards().reduce((sum, card) => {
      if (card.vp instanceof Function) {
        return sum + card.vp(this)
      } else if (card.vp.constructor === Number) {
        return sum + card.vp
      } else {
        return sum
      }
    }, 0)
  }

  stats () {
    const cards = this.cards()
    return {
      cardsCount: cards.length,

      victoryCardCounts: cards.filter(({ types }) => types.includes('victory')).length,
      treasureCardCounts: cards.filter(({ types }) => types.includes('treasure')).length,
      actionCardCounts: cards.filter(({ types }) => types.includes('action')).length

      // More to come:
      // # bought, # trashed, # copper/silver/gold, # estate/duchy/province/curse, # each action played, etc.
    }
  }
}
