import EventEmitter from 'eventemitter3'
import { camelCase } from 'change-case'

import Buy from './buy'
import Cards from './cards'
import Card from './card'
import Action from './action'

const CHOICES = [Buy, Cards, Card, Action]

export default class Choices extends EventEmitter {
  constructor() {
    super()
    Object.assign(this, { choice: null, parameters: null, label: null })

    CHOICES.forEach(choice => {
      const choiceName = camelCase(choice.name)
      this[choiceName] = async (...args) => await this.choose(choiceName, args)
    })
  }

  async choose (choiceName, parameters) {

    const ChoiceClass = CHOICES.find(choice => camelCase(choice.name) === choiceName)
    this.choice = new ChoiceClass(parameters)
    if (this.label) {
      this.choice.setLabel(this.label)
    }
    this.emit('starting choice', [this.choice, parameters])
    
    const result = await this.choice.waitForResult()
    
    this.emit('stopped choice', [choiceName, parameters, result])
    Object.assign(this, { choice: null, parameters: null })
    
    return result
  }

  setLabel (label) {
    this.label = label
  }

  clearLabel () {
    this.label = null
  }

  choosing () {
    return Boolean(this.choice)
  }

  handleEvent (event) {
    if (this.choice) {
      this.choice.handleEvent(event)
    }
  }
}
