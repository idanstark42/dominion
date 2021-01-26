import React, { Component } from 'react'

import Pile from './pile'

export default class Dashboard extends Component {
  constructor (props) {
    super(props);

    this.state = { player: null }
  }

  componentDidMount () {
    this.setState({ player: this.props.player })

  }

  renderHand () {
    return <div></div>
  }

  render () {
  	if(!this.state.player) {
  		return 'Loading...'
  	}
    return <div className="dashboard">
      <Pile cards={this.state.player.deck} />
      {this.renderHand()}
      <Pile cards={this.state.player.discard} open={true}/>
    </div>
  }
}