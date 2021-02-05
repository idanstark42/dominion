import Card from './card'

export default class Action extends Card {
  constructor(props) {
    super(props)

    this.source = 'hand'
    Object.assign(this.filters, { type: 'action' })
    this.allowSkip = true
  }
}