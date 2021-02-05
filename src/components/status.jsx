import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faBolt, faCartPlus } from '@fortawesome/free-solid-svg-icons'

import { translate } from '../helpers/i18n'

import Actions from './actions'

export default function Status (props) {
  if (!props.game.turn || !props.choice) {
    return <div className="empty status"></div>
  }

  const currentAction = props.choice.label

  return <div className="status">
    <div className="direction">
      {translate(`${currentAction}_direction`)}
    </div>
    <div className="turn-stats">
      <div className="stat">
        <FontAwesomeIcon icon={faCoins} />
        {props.game.turn.currentCoins()}
      </div>
      <div className="stat">
        <FontAwesomeIcon icon={faBolt} />
        {props.game.turn.actions}
      </div>
      <div className="stat">
        <FontAwesomeIcon icon={faCartPlus} />
        {props.game.turn.buys}
      </div>
      <Actions choice={props.choice} handleEvent={props.handleEvent} />
    </div>
  </div>
}