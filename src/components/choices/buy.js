import Cards from './cards'

export default class Buy extends Cards {
  constructor(props) {
    super(props)

    this.source = 'supply'
    this.allowSkip = true
  }

  valid () {
    const [coins, buys] = this.props.parameters
    return this.cards.length <= buys && this.cards.reduce((sum, { cost }) => sum + cost, 0) <= coins
  }
}