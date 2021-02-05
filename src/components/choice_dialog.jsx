import React, { Component } from 'react'

import Card from './card'
import Actions from './actions'

import Cards from '../logic/choices/cards'

const DIALOGS = [
  {
    match: ({ choice }) => (choice instanceof Cards && choice.source === 'discarded'),
    render: ({ choice, player, handleEvent }) => {
      return [<div className="discarded-cards-choice">
              {player.discarded.map((card, index) =>
                <Card card={card} key={index}
                      onClick={() => handleEvent({ type: 'card click', source: 'hand', card })}/>
              )}
            </div>,
            <Actions choice={choice} handleEvent={handleEvent}/>]
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