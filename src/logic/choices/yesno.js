import Choice from './choice'

export default class Yesno extends Choice {
  constructor(parameters) {
    super()

    this.card = parameters[0]
    this.allowSkip = true
  }

  handleEvent (event) {
    switch (event.type) {
      case 'skip':
      this._result = false
      break
      case 'done':
      this._result = true
      break
      default:
      throw new Error('Bad event')
    }
  }
}