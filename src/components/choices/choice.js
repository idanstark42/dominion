import React, { Component } from 'react'

export default class Choice extends Component {

  state = {
  	result: null
  }

  valid () {
  	return true
  }

  waitForResult () {
    return new Promise(res => {
      const interval = setInterval(() => {
        if (this.state.result !== null && this.valid()) {
          clearInterval(interval)
          res(this.state.reuls)
        }
      }, 100)
    })
  }
}