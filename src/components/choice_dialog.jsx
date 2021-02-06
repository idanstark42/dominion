import React, { Component } from 'react'

import Card from './card'
import Actions from './actions'

import Cards from '../logic/choices/cards'
import Yesno from '../logic/choices/yesno'
import Options from '../logic/choices/options'

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
    match: ({ choice }) => (choice instanceof Yesno),
    render: ({ choice, player, handleEvent }) => {
      return [<div key="direction" className="direction">
                {translate(`${choice.label}_direction`)}
              </div>,
              <Card card={choice.card} key="card"/>,
              <Actions key="actions" choice={choice} handleEvent={handleEvent}/>]
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

  return <div className="dialog">{dialog.render(props)}</div>
}