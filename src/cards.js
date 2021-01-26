const cards = {
  treasure: [
    { name: 'copper', types: ['treasure'], cost: 0, coins: 1, amount: 60 },
    { name: 'silver', types: ['treasure'], cost: 3, coins: 2, amount: 40 },
    { name: 'gold',   types: ['treasure'], cost: 6, coins: 3, amount: 30 }
  ],
  victory: [
    { name: 'curse',    types: ['victory'], cost: 0, vp: -1, amount: 30 },
    { name: 'estate',   types: ['victory'], cost: 2, vp: 1, amount: 24 },
    { name: 'duchy',    types: ['victory'], cost: 5, vp: 3, amount: 12 },
    { name: 'province', types: ['victory'], cost: 8, vp: 6, amount: 12 }
  ],
  actions: [
    { name: 'cellar',   types: ['action'], const: 2, playerChoices: ['cardsInHand'],
      action: (turn, player, game, [cards]) => {
        cards.forEach(card => player.discard(card))
        player.draw(cards.length)
      }
    },
    { name: 'chapel',   types: ['action'], const: 2, playerChoices: ['cardsInHand:max4'],
      action: (turn, player, game, [cards]) => {
        cards.forEach(card => player.trash(card))
      }
    }
  ]
}

export default cards