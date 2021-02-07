import React from 'react'

import Card from './card'

export default function Pile ({ cards, open = false, onClick=(() => { }) }) {
  if (cards.length === 0) {
    return <Card.Empty onClick={onClick} />
  }

  if (!open) {
    return <Card.Closed onClick={onClick} />
  }

  return <Card card={cards[cards.length - 1]} onClick={onClick} />
}