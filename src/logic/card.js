export default class Card {
  constructor (attrs) {
    Object.assign(this, attrs)
  }

  imageUrl () {
  	return `/cards/${this.name}.jpg`
  }
}