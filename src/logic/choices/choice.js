import { snakeCase } from 'change-case'

export default class Choice {
  constructor() {
    this._result = null
    this.label = snakeCase(this.constructor.name)
    this.context = null
    this.donnable = true
    this.allowSkip = true
  }
  
  result () {
  	return false
  }

  setLabel (label) {
    this.label = label
  }

  setContext (context) {
    this.context = context
  }

  valid () {
    return true
  }

  onCardClick (cardClickEvent) {
    // Do nothing
  }

  handleEvent (event) {
    switch (event.type) {
      case 'card click':
      this.onCardClick(event)
      break
      case 'skip':
      if (this.allowSkip) {
        this.skip(event)
      } else {
        throw new Error('Cannot skip this choice.')
      }
      break
      case 'done':
      this.done(event)
      break
      default:
      throw new Error('Bad event')
    }
  }

  done (event) {
    const result = this.result()
    if (result !== null && this.valid()) {
      this._result = result
    } else {
      throw new Error('Invalid operation result')
    }
  }

  skip (event) {
    this._result = 'NO RESULT'
  }

  waitForResult () {
    return new Promise(res => {
      const interval = setInterval(() => {
        if (this._result !== null && (this.valid() || this._result === 'NO RESULT')) {
          clearInterval(interval)
          res(this._result)
        }
      }, 100)
    })
  }
}