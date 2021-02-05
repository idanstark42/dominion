import React from 'react'

import Card from './card'

export default function Hand (props) {

  const clickEvent = card => {
    return {
      type: 'card click',
      source: 'hand',
      card
    }
  }

  return <div className="hand">
    {props.player.hand.map((card, index) => <Card card={card} key={index} onClick={() => props.handleEvent(clickEvent(card))}/>)}
  </div>
}