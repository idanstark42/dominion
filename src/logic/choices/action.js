import Card from './card'

export default class Action extends Card {
  constructor() {
    super(['hand', { type: 'action' }])
    this.allowSkip = true
  }
}