import React from 'react'

import { translate } from '../helpers/i18n'

export default function Stats (props) {
  const playerStats = props.game.players.map(player => ({ player, stats: player.stats() }))
  console.log(playerStats)
  return <div className="stats dialog">
    <div className="title">{translate('stats')}</div>
    {playerStats.map(({ player, stats }, index) => <div className="player stats" key={index}>
      {Object.entries(stats).map(([stat, value]) => <div className={stat} key={stat}>
      	{translate(stat)}: {value}
      </div>)}
    </div>)}
  </div>
}