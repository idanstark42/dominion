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
    Object.assign(this, { choice: null, parameters: null })

    CHOICES.forEach(choice => {
      const choiceName = camelCase(choice.name)
      this[choiceName] = async (...args) => await this.choose(choiceName, args)
    })

    console.log(Object.keys(this.choose))
  }

  async choose (choice, parameters) {

    const ChoiceClass = CHOICES.find(c => camelCase(c.name) === choice)
    this.choice = new ChoiceClass(parameters)
    this.emit('starting choice', [this.choice, parameters])
    
    const result = await this.choice.waitForResult()
    
    this.emit('stopped choice', [choice, parameters, result])
    Object.assign(this, { choice: null, parameters: null })
    
    return result
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
