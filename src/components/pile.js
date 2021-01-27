import React from 'react'

import Card from './card'

export default function Pile ({ cards, open = false }) {
  if (cards.length === 0) {
    return <Card.Empty />
  }

  if (!open) {
    return <Card.Closed />
  }

  return <Card card={cards[cards.length - 1]} />
}