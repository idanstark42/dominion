import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faBolt, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Font from 'react-font'

import { translate } from '../helpers/i18n'

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
        <div className={`${props.valid ? '' : 'disabled'} ${props.doneAction === 'No action' ? 'hidden' : ''} button cell`} onClick={() => props.handleEvent({ type: 'done' })}><Font family="Amatic SC">{translate(props.doneAction)}</Font></div>
      </div>
      : <div className="status"></div>}
    <div className="hand">
      {props.player.hand.map((card, index) => <Card card={card} key={index} />)}
    </div>
    <Pile cards={props.player.discarded} open={true}/>
  </div>
}