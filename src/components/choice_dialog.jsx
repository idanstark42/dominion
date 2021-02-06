import React from 'react'

import Card from './card'
import Actions from './actions'

import Cards from '../logic/choices/cards'
import Yesno from '../logic/choices/yesno'
import Options from '../logic/choices/options'
import Order from '../logic/choices/order'

import { translate } from '../helpers/i18n'

const DIALOGS = [
  {
    match: ({ choice }) => (choice instanceof Cards && choice.source === 'discarded'),
    render: ({ choice, player, handleEvent }) => {
      return [<div key="direction" className="direction">
                {translate(`${choice.label}_direction`)}
              </div>,
              <div key="cards" className="discarded-cards-choice">
              {player.discarded.map((card, index) =>
                <Card card={card} key={index}
                      onClick={() => handleEvent({ type: 'card click', source: 'discarded', card })}/>
              )}
              </div>,
              <Actions key="actions" choice={choice} handleEvent={handleEvent}/>]
    }
  },
  {
    match: ({ choice }) => (choice instanceof Yesno),
    render: ({ choice, player, handleEvent }) => {
      return [<div key="direction" className="direction">
                {translate(`${choice.label}_direction`)}
              </div>,
              <Card card={choice.card} key="card"/>,
              <Actions key="actions" choice={choice} handleEvent={handleEvent}/>]
    }
  },
  {
    match: ({ choice }) => (choice instanceof Options),
    render: ({ choice, player, handleEvent }) => {
      const actions = choice.options.map(option => ({ label: option, onPress: () => handleEvent({ type: 'option', option }) }))
      
      return [<div key="direction" className="direction">
                {translate(`${choice.label}_direction`)}
              </div>,
              <Card card={choice.card} key="card"/>,
              <Actions key="actions" actions={actions}/>]
    }
  },
  {
    match: ({ choice }) => (choice instanceof Order),
    render: ({ choice, player, handleEvent }) => {
      const actions = [
        { label: `${choice.label}_done`, onPress: () => handleEvent({ type: 'done' }) },
        { label: `${choice.label}_reset`, onPress: () => handleEvent({ type: 'reset' }) }
      ]
      
      return [<div key="direction" className="direction">
                {translate(`${choice.label}_direction`)}
              </div>,
              <div key="cards" className="cards">
              {choice.cards.map((card, index) =>
                <Card card={card} key={index}
                      onClick={() => handleEvent({ type: 'card click', card })}/>
              )}
              </div>,
              <div key="ordered cards" className="oredered cards">
              {choice.orderedCards.map((card, index) =>
                <Card card={card} key={index}/>
              )}
              </div>,
              <Actions key="actions" actions={actions}/>]
    }
  }
]

export default function ChoiceDialog (props) {
  if (!props.choice || !props.game.myTurn()) {
    return null
  }

  const dialog = DIALOGS.find(dialog => dialog.match(props))

  if (!dialog) {
    return null
  }

  return <div className={`${props.choice.label} dialog`}>{dialog.render(props)}</div>
}