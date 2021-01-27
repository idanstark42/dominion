import React, { Component } from 'react'

import Pile from './pile'
import Card from './card'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <div className="dashboard">
      <Pile cards={this.props.player.deck} />
      <div className="hand">
        {this.props.player.hand.map((card, index) => <Card card={card} key={index} />)}
      </div>
      <Pile cards={this.props.player.discarded} open={true}/>
    </div>
  }
}