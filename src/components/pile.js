import React from 'react'

import Card from './card'

export default function Pile ({ cards, open = false }) {
  return <div>
    {open ? <Card card={cards[cards.length - 1]} /> : <Card.Closed />}
  </div>
}