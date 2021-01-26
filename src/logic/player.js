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
  }

  // Inner actions

  shuffle () {
    this.deck.concat(this.discard)
    this.discarded = []
    shuffle(this.deck)
  }

  newHand () {
    this.hand.forEach(cardInHand => this.discard(cardInHand))
    for(let i = 0; i < config.cardsInHand; i++) {
      this.draw()
    }
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
      	this.trashFromSource(source)
      } else {
      	this[target].push(this[source].pop())
      }
    }
  }

  // Outer actions

  gain (card, target = 'discarded') {
  	this[target].push(this.supply.takeCard(card))
  }

  trash (card, source = 'hand') {
  	this[source].splice(this.hand.indexOf(card), 1)
  	this.supply.trash.push(card)
  }

  trashFromSource (source = 'hand') {
    this.supply.trash.push(this[source].pop())
  }

}
