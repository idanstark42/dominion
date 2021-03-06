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
    // 2 coins cards
    { name: 'cellar',   types: ['action'], cost: 2,
      action: async ({ player, turn, choose }) => {
        turn.change('actions', 1)
        const cards = await choose.cards('hand')
        cards.forEach(card => player.discard(card))
        player.draw(cards.length)
      }
    },
    { name: 'chapel',   types: ['action'], cost: 2,
      action: async ({ player, choose }) => {
        const cards = await choose.cards('hand', { maxAmount: 4 })
        cards.forEach(card => player.trash(card))
      }
    },
    { name: 'moat',   types: ['action', 'reaction'], cost: 2, 
      reaction: async ({ player, action }) => {
        action.ignore(player)
      },
      action: async ({ player }) => {
        player.draw(2)
      }
    },
    // 3 coins cards
    { name: 'village',   types: ['action'], cost: 3,
      action: async ({ turn, player }) => {
        turn.change('actions', 2)
        player.draw()
      }
    },
    { name: 'workshop',   types: ['action'], cost: 3,
      action: async ({ player, choose }) => {
        const card = await choose.card('supply', { maxCost: 4 })
        player.gain(card)
      }
    },
    { name: 'harbinger',   types: ['action'], cost: 3,
      action: async ({ player, turn, choose }) => {
        player.draw()
        turn.change('actions', 1)

        const card = await choose.card('discarded')
        if (card !== 'NO RESULT') {
          player.move(card, 'discarded', 'deck')
        }
      }
    },
    { name: 'merchant',   types: ['action'], cost: 3,
      action: async ({ turn, player }) => {
        player.draw()
        turn.change('actions', 1)

        turn.modifyValue((originalTreasure, cards) => {
          if (cards.some(card => card.name === 'silver')) {
            return originalTreasure + 1
          }
        })
      }
    },
    { name: 'vassal',   types: ['action'], cost: 3,
      action: async ({ player, choose }) => {
        const card = player.draw()
        if (card.types.includes('action')) {
          const useCard = await choose.yesno(card)
          if (useCard) {
            return card
          }
        }
        player.discard(card)
      }
    },
    // 4 coins cards
    { name: 'beurocrat',   types: ['action', 'attack'], cost: 4,
      action: async ({ player, game }) => {
        player.gain('silver')

        // TODO Handle attacks
      }
    },
    { name: 'militia',   types: ['action', 'attack'], cost: 4,
      action: async ({ turn, game }) => {
        turn.change('coins', 2)

        // TODO Handle attacks
      }
    },
    { name: 'gardens',   types: ['victory'], cost: 4, vp: player => Math.floor(player.cards().length / 10), amount: 12 },
    { name: 'moneylender',   types: ['action'], cost: 4,
      action: async ({ turn, player, choose }) => {
        choose.allowSkip(true)
        const card = await choose.card('hand', { name: 'copper' })
        if (card) {
          player.trash(card)
          turn.change('coins', 3)          
        }
      }
    },
    { name: 'poacher',   types: ['action'], cost: 4,
      action: async ({ turn, player, game, choose }) => {
        turn.change('actions', 1)
        turn.change('coins', 1)
        player.draw()
        const amount = game.supply.emptyPiles()
        if (amount) {
          const cards = await choose.cards('hand', { amount })
          cards.forEach(card => player.discard(card))
        }
      }
    },
    { name: 'remodel',   types: ['action'], cost: 4,
      action: async ({ player, choose }) => {
        choose.setLabel('remodel_trash')
        const cardToTrash = await choose.card('hand')
        player.trash(cardToTrash)
        
        choose.setLabel('remodel_gain')
        const cardToGain = await choose.card('supply', { maxCost: cardToTrash.cost + 2 })
        player.gain(cardToGain)
      }
    },
    { name: 'smithy',   types: ['action'], cost: 4,
      action: async ({ player }) => {
        player.draw(3)
      }
    },
    { name: 'throneroom',   types: ['action'], cost: 4,
      action: async ({ player, turn, choose }) => {
        const actionCard = await choose.card('hand', { type: 'action' })
        console.log(actionCard)
        return [actionCard, actionCard]
      }
    },
    // 5 coins cards
    { name: 'bandit',   types: ['action', 'attack'], cost: 5,
      action: async ({ player }) => {
        player.gain('gold')

        // TODO Handle attacks
      }
    },
    { name: 'councilroom',   types: ['action'], cost: 5,
      action: async ({ player, turn }) => {
        player.draw(4)
        turn.change('buys', 1)
        
        // TODO Not an attack, but handle this too
      }
    },
    { name: 'festival',   types: ['action'], cost: 5,
      action: async ({ turn }) => {
        turn.change('actions', 2)
        turn.change('buys', 1)
        turn.change('coins', 2)
      }
    },
    { name: 'labratory',   types: ['action'], cost: 5,
      action: async ({ turn, player }) => {
        turn.change('actions', 1)
        turn.change('coins', 2)
        player.draw(2)
      }
    },
    { name: 'library',   types: ['action'], cost: 5,
      action: async ({ player, choose }) => {
        while (player.hand.length < 7) {
          const card = player.draw()
          if (card.types.includes('action')) {
            const discard = await choose.yesno(card)
            if (discard) {
              player.discard(card)
            }
          }
        }
      }
    },
    { name: 'market',   types: ['action'], cost: 5,
      action: async ({ turn, player }) => {
        turn.change('actions', 1)
        turn.change('buys', 1)
        turn.change('coins', 1)
        player.draw(1)
      }
    },
    { name: 'mine',   types: ['action'], cost: 5,
      action: async ({ player, choose }) => {
        choose.setLabel('mine_trash')
        const cardToTrash = await choose.card('hand', { type: 'treasure' })
        player.trash(cardToTrash)
        
        choose.setLabel('mine_gain')
        const cardToGain = await choose.card('supply', { maxCost: cardToTrash.cost + 3, type: 'treasure' })
        player.gain(cardToGain, 'hand')
      }
    },
    { name: 'sentinel',   types: ['action'], cost: 5,
      action: async ({ player, turn, choose }) => {
        player.draw()
        turn.change('actions', 1)

        const cards = player.draw(2)
        let returns = 0

        choose.setLabel('sentinel_options')
        for (let card of cards) {
          const choice = await choose.options({ options: ['trash', 'discard', 'deck'], card })
          switch (choice) {
            case 'trash':
            player.trash(card)
            break
            case 'discard':
            player.discard(card)
            break
            case 'deck':
            player.return(card)
            returns = returns + 1
            break
            default:
            throw new Error('Bad choice')
          }
        }

        if (returns > 1) {
          choose.setLabel('sentinel_order')
          const orderedCards = await choose.order({ cards })
          player.draw(2)
          player.return(orderedCards)
          // TODO order the cards in the deck
        }
      }
    },
    { name: 'witch',   types: ['action', 'attack'], cost: 5,
      action: async ({ player, game }) => {
        player.draw(2)

        // TODO Handle attacks
      }
    },
    // 6 coins card
    { name: 'artisan',   types: ['action'], cost: 6,
      action: async ({ player, choose }) => {
        choose.setLabel('artisan_gain')
        const cardToGain = await choose.card('supply', { maxCost: 5 })
        player.gain(cardToGain, 'hand')
        choose.setLabel('artisan_return')
        const cardToReturn = await choose.card('hand')
        player.return(cardToReturn)
      }
    }
  ]
}

export default cards