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

    this.actions = this.actions.sort((action1, action2) => action1[0].cost - action2[0].cost)

    this.piles = [].concat(this.treasure).concat(this.victory).concat(this.actions).reduce((piles, pile) => {
      piles[pile[0].name] = pile
      return piles
    }, { })

    this.trash = []
  }

  takeCard (name) {
    console.log('taking: ', name)
    if(this.piles[name] && this.piles[name].length > 0) {
      return this.piles[name].pop()
    } else{
      throw new Error(`No cards in pile: ${name}`)
    }
  }

  emptyPiles () {
    return Object.values(this.piles).filter(pile => pile.length === 0).length
  }
}

const getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const generatePile = cardConfig => {
  const cardProto = Object.assign({ }, cardConfig)
  delete cardProto.amount
  return Array(cardConfig.amount || config.defaultSupplyAmount).fill(1)
    .map(() => new Card(cardProto))
}
