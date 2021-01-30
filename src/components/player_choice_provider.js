import React, { Component, createRef } from 'react'
import { camelCase } from 'change-case'

import Buy from './choices/buy'

const CHOICES = [Buy]

export default class PlayerChoiceProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      choice: null,
      parameters: null
    }

    CHOICES.forEach(choice => {
      const choiceName = camelCase(choice.name)
      this.choose[choiceName] = async (...args) => await this.choose(choiceName, args)
    })

    this.choiceRef = createRef()
  }

  async choose (choice, parameters) {
    await this.setState({ choice, parameters })
    return await this.choiceRef.current.waitForResult()
  }

  choosing () {
    return Boolean(this.state.choice)
  }

  handleCardClick (source, handleCardClick) {

  }

  render () {
    if (!this.choosing()) {
      return null
    }
    console.log(this.state.choice, this.state.parameters)
    const Choice = CHOICES.find(choice => camelCase(choice.name) === this.state.choice)
    
    return <Choice ref={this.choiceRef}></Choice>
  }
}
