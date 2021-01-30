import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faBolt, faCartPlus } from '@fortawesome/free-solid-svg-icons'

import Pile from './pile'
import Card from './card'

export default function Dashboard (props) {
  return <div className="dashboard">
    <Pile cards={props.player.deck} />
    {(props.turn && props.turn.player === props.player) ?
      <div className="status">
        <div className="cell"><FontAwesomeIcon icon={faCoins} /></div>
        <div className="cell">{props.turn.currentCoins()}</div>
        <div className="cell"><FontAwesomeIcon icon={faBolt} /></div>
        <div className="cell">{props.turn.actions}</div>
        <div className="cell"><FontAwesomeIcon icon={faCartPlus} /></div>
        <div className="cell">{props.turn.buys}</div>
      </div>
      : <div className="status"></div>}
    <div className="hand">
      {props.player.hand.map((card, index) => <Card card={card} key={index} />)}
    </div>
    <div className="actions"></div>
    <Pile cards={props.player.discarded} open={true}/>
  </div>
}