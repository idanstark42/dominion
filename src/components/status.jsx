import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faBolt, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { snakeCase } from 'change-case'

import { translate } from '../helpers/i18n'

export default function Status (props) {
  if (!props.game.turn || !props.choice) {
    return <div className="empty status"></div>
  }

  const valid = props.choice.valid()
  const action = snakeCase(props.choice.constructor.name)

  return <div className="status">
    <div className="direction">
      {translate(`${action}_direction`)}
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
    </div>
    <div className="actions">
      <div className={`${valid ? '' : 'disabled'} button`} onClick={() => props.handleEvent({ type: 'done' })}>
        {translate(`${action}_action`)}
      </div>
      {props.choice.allowSkip ? <div className="skip button" onClick={() => props.handleEvent({ type: 'skip' })}>
        {translate('skip')}
      </div> : ''}
    </div>
  </div>
}