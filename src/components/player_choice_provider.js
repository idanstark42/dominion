import React, { Component } from 'react'

export default class PlayerChoiceProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
    	choice: null,
    	parameters: null
    }
  }


  allowPlayerChoice (choiceCode) {
  	const [choice, parameters] = choiceCode.split(':')[0]
  	this.setState({ choice, parameters })
  }

  render () {
  	if (this.state.choice === null) {
  		return null
  	} else {
  		return <div></div>
  	}
  }
}
