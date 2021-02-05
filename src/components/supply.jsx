import React, { Component } from 'react'

import config from '../config'

import Pile from './pile'

export default class Supply extends Component {
  constructor (props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount () {

    const supply = this.props.supply

    const actionsInRow = supply.actions.length / config.actionRows
    const rows = config.constantRows.map(rowConfig => Object.keys(supply.piles).filter(pileName => rowConfig.includes(pileName)).map(key => supply.piles[key]))
      .concat(new Array(config.actionRows).fill('a').map((a, index) => Array.from(supply.actions).splice(index * actionsInRow, actionsInRow)))

    this.setState({ rows })
  }

  clickEvent (pile) {
    return {
      type: 'card click',
      source: 'supply',
      card: pile[pile.length - 1]
    }
  }

  render () {
    if (!this.state.rows) {
      return <div></div>
    }

    return <div className="supply">
      {this.state.rows.map((row, rowIndex) => <div className="row" key={rowIndex.toString()}>
        {row.map((pile, pileIndex) => <Pile key={pileIndex.toString()} cards={pile} open={true} onClick={() => this.props.handleEvent(this.clickEvent(pile))} />)}
      </div>)}
    </div>
  }
}