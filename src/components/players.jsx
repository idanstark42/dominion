import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { translate } from '../helpers/i18n'

export default function Sidebar (props) {
  return <div className="players">
    {props.game.players.map((player, index) => <div className="player" key={index} style={{color: player.color || 'white'}}>
      <div className="avatar"><FontAwesomeIcon icon={faUser} style={{backgroundColor: player.color || 'black'}} /></div>
      <div className="id">#{player.id}</div>
      <div className="cards-in-hand">
        {player.hand.length}
        {translate('cards_in_hand')}
      </div>
    </div>)}
  </div>
}