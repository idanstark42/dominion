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
    { name: 'cellar',   types: ['action'], cost: 2, playerChoices: ['cardsInHand'],
      action: (turn, player, game, [cardsChoice]) => {
        const cards = cardsChoice()
        cards.forEach(card => player.discard(card))
        player.draw(cards.length)
      }
    },
    { name: 'chapel',   types: ['action'], cost: 2, playerChoices: ['cardsInHand:maxAmount=4'],
      action: (turn, player, game, [cardsChoice]) => {
        const cards = cardsChoice()
        cards.forEach(card => player.trash(card))
      }
    },
    { name: 'moat',   types: ['action', 'reaction'], cost: 2, 
      reaction: (turn, player, game, action) => {
        action.ignore(player)
      },
      action: (turn, player, game, [cards]) => {
        player.draw(2)
      }
    },
    // 3 coins cards
    { name: 'village',   types: ['action'], cost: 3,
      action: (turn, player) => {
        turn.change('actions', 2)
        player.draw()
      }
    },
    { name: 'workshop',   types: ['action'], cost: 3, playerChoices: ['cardInSupply:maxCost=4'],
      action: (turn, player, game, [cardChoice]) => {
        const card = cardChoice()
        player.gain(card)
      }
    },
    { name: 'harbinger',   types: ['action'], cost: 3, playerChoices: ['cardInDiscard'],
      action: (turn, player, game, [cardChoice]) => {
        player.draw()
        turn.change('actions', 1)

        const card = cardChoice()
        player.move(card, 'discarded', 'deck')
      }
    },
    { name: 'merchant',   types: ['action'], cost: 3,
      action: (turn, player) => {
        player.draw()
        turn.change('actions', 1)

        turn.modifyValue((originalTreasure, cards) => {
          if (cards.some(card => card.name === 'silver')) {
            return originalTreasure + 1
          }
        })
      }
    },
    { name: 'vassle',   types: ['action'], cost: 3, playerChoices: ['yesno'],
      action: (turn, player, game, [yesnoChoice]) => {
        const card = player.draw()
        if (card.types.include('action')) {
          const useCard = yesnoChoice(card)
          if (useCard) {
            return card
          }
        }

        player.discard(card)
      }
    },
    { name: 'beurocrat',   types: ['action', 'attack'], cost: 4,
      action: (turn, player, game, [yesnoChoice]) => {
        player.gain('silver')

        // Handle attacks
      }
    },
    { name: 'militia',   types: ['action', 'attack'], cost: 4,
      action: (turn, player, game, [yesnoChoice]) => {
        turn.chance('coins', 2)

        // Handle attacks
      }
    },
    { name: 'gardens',   types: ['victory'], cost: 4, vp: player => Math.floor(player.cards().length / 10) },
    { name: 'moneylender',   types: ['action'], cost: 4, playerChoices: ['cardInHand:name=copper']
      action: (turn, player, game, [yesnoChoice]) => {
        const act = yesnoChoice()
        if (act) {
          player.trash(player.hand.find(card => card.name === 'copper'))
          turn.change('coins', 3)          
        }
      }
    },
    { name: 'poacher',   types: ['action'], cost: 4, playerChoices: ['cardsInHand:amount=EmptySupplyPiles'],
      action: (turn, player, game, [cardsChoice]) => {
        turn.change('actions', 1)
        turn.change('coins', 1)
        player.draw()
        const cards = cardsChoice()
        cards.forEach(card => player.discard(card))
      }
    },
    { name: 'remodel',   types: ['action'], cost: 4, playerChoices: ['cardInHand', 'cardInSupply:maxCost=param'],
      action: (turn, player, game, [cardInHandChoice, cardInSupplyChoice]) => {
        const cardToTrash = cardInHandChoice()
        player.trash(cardToTrash)
        
        const cardInSupplyCost = cardToTrash.cost + 2
        
        const cardToGain = cardInSupply(cardInSupplyCost)
        player.gain(cardToGain)
      }
    },
    { name: 'smithy',   types: ['action'], cost: 4,
      action: (turn, player, game, [cardInHandChoice, cardInSupplyChoice]) => {
        player.draw(3)
      }
    },
    { name: 'throneroom',   types: ['action'], cost: 4, playerChoices: ['cardInHand:type=action'],
      action: (turn, player, game, [cardChoice]) => {
        // WTF do I do here?!
      }
    },
    { name: 'bandit',   types: ['action', 'attack'], cost: 5,
      action: (turn, player, game) => {
        player.gain('gold')

        // Handle attacks
      }
    },
    { name: 'councilroom',   types: ['action'], cost: 5,
      action: (turn, player, game) => {
        player.draw(4)
        turn.change('buys', 1)
        
        // Not an attack, but handle this too
      }
    },
    { name: 'festival',   types: ['action'], cost: 5,
      action: (turn, player, game) => {
        turn.change('actions', 2)
        turn.change('buys', 1)
        turn.change('coins', 2)
      }
    },
    { name: 'labratory',   types: ['action'], cost: 5,
      action: (turn, player, game) => {
        turn.change('actions', 1)
        turn.change('coins', 2)
        player.draw(2)
      }
    },
    { name: 'library',   types: ['action'], cost: 5, ['yesno']
      action: (turn, player, game, [yesnoChoice]) => {
        while (player.hand.length < 7) {
          const card = player.draw()
          if (card.types.includes('action')) {
            const discard = yesnoChoice()
            if (discard) {
              player.discard(card)
            }
          }
        }
      }
    },
    { name: 'labratory',   types: ['action'], cost: 5,
      action: (turn, player, game) => {
        turn.change('actions', 1)
        turn.change('buys', 1)
        turn.change('coins', 1)
        player.draw(1)
      }
    },
    { name: 'remodel',   types: ['action'], cost: 4, playerChoices: ['cardInHand:type=treasure', 'cardInSupply:maxCost=param,type=treasure'],
      action: (turn, player, game, [cardInHandChoice, cardInSupplyChoice]) => {
        const cardToTrash = cardInHandChoice()
        player.trash(cardToTrash)
        
        const cardInSupplyCost = cardToTrash.cost + 2
        
        const cardToGain = cardInSupplyChoice(cardInSupplyCost)
        player.gain(cardToGain)
      }
    },
    { name: 'sentinal',   types: ['action'], cost: 4, playerChoices: ['[trash, hand, discard, back]:param', 'order:cards=param'],
      action: (turn, player, game, [actionChoice, orderChoice]) => {
        const cards = player.draw(2)
        let returns = 0

        cards.forEach(card => {
          const choice = actionChoice(card)
          if (choice === 'trash') {
            player.trash(card)
          } else if (choice === 'discard') {
            player.discard(card)
          } else if (choice === 'back') {
            player.return(card)
            returns = returns + 1
          }
        })

        if (returns > 1) {
          orderChoice(cards)
        }
      }
    },
    { name: 'witch',   types: ['action', 'attack'], cost: 5,
      action: (turn, player, game) => {
        player.draw(2)

        // Handle attacks
      }
    },
    { name: 'artisian',   types: ['action'], cost: 6, playerChoices: ['cardInSupply:maxCost=5'],
      action: (turn, player, game, [cardChoice]) => {
        const card = cardChoice()
        player.gain(card)
        player.return()
      }
    }
  ]
}

export default cards