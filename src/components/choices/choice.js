import React, { Component } from 'react'

export default class Choice extends Component {

  state = {
  	result: null
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
      case 'done':
      this.done(event)
      break
    }
  }

  done (event) {
    const result = this.result()
    if (result && this.valid()) {
      this.setState({ result })
    } else {
      throw new Error('Invalid operation result')
    }
  }

  waitForResult () {
    return new Promise(res => {
      const interval = setInterval(() => {
        if (this.state.result !== null && this.valid()) {
          clearInterval(interval)
          res(this.state.result)
        }
      }, 100)
    })
  }

  render () {
    return null
  }
}