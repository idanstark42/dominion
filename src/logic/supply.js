import cards from '../cards'
import Card from './card'

import config from '../config.js'

export default class Supply {
  constructor (actions = null) {
    ['treasure', 'victory'].forEach(cardType => {
      Object.assign(this, { [cardType]: cards[cardType].map(generatePile) })
    })

    if (actions) {
      this.actions = cards.actions.filter(cardConfig => actions.includes(cardConfig.name)).map(generatePile)
    } else {
      this.actions = getRandom(cards.actions, config.actionsCount).map(generatePile)
    }

    this.piles = [].concat(this.treasure).concat(this.victory).concat(this.actions).reduce((piles, pile) => {
      piles[pile[0].name] = pile
      return piles
    }, { })

    this.trash = []
  }

  takeCard (name) {
    if(this.piles[name] && this.piles[name].length > 0) {
      return this.piles[name].pop()
    } else{
      throw new Error(`No cards in pile: ${name}`)
    }
  }
}

const getRandom = (arr, amount) => {
  return arr
}

const generatePile = cardConfig => {
  const cardProto = Object.assign({ }, cardConfig)
  delete cardProto.amount
  return Array(cardConfig.amount).fill(1)
    .map(() => new Card(cardProto))
}
