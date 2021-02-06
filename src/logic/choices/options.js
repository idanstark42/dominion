import Choice from './choice'

export default class Options extends Choice {
  constructor(parameters) {
    super()

    this.card = parameters[0].card
    this.options = parameters[0].options

    this.donnable = false
  }

  handleEvent (event) {
    if (event.type === 'option' && this.options.includes(event.option)) {
      this._result = event.option
    }
  }
}