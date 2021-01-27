import React, { Component } from 'react'

export default class Card extends Component {
  constructor (props) {
    super(props)
  
    this.state = {}
  }

  render () {
    return <div className={`${this.props.card.name} card`} style={{ backgroundImage: `url(./images/cards/${this.props.card.name}.png)` }}></div>
  }
}

Card.Closed = class CloseCard extends Card {
  render () {
    return <div className="closed card"></div>
  }
}

Card.Empty = class CloseCard extends Card {
  render () {
    return <div className="empty card"></div>
  }
}