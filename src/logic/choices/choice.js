export default class Choice {
  constructor(props) {
    this._result = null
  }
  result () {
  	return false
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