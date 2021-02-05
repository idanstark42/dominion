import React from 'react'

import Cards from '../logic/choices/cards'
import Card from './card'

export default function Turn (props) {
  if (!props.turn) {
    return <div className="empty turn"></div>
  }

  const clickEvent = (card, source) => {
    return {
      type: 'card click',
      source: source,
      card
    }
  }
  
  const choice = props.choice

  return <div className="turn">
    {(choice && choice instanceof Cards) ? <div className="choice cards">
      {choice.cards.map((choiceCard, index) => <Card card={choiceCard} key={index} onClick={() => props.handleEvent(clickEvent(choiceCard, 'chosen'))}></Card>)}
    </div> : ''}
    <div className="played actions">
      {props.turn.playedActions.map((actionCard, index) => <Card card={actionCard} key={index} onClick={() => props.handleEvent(clickEvent(actionCard, 'played'))}></Card>)}
    </div>
  </div>
}