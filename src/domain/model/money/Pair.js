export default class Pair {
  constructor (from, to) {
    this._from = from
    this._to = to
  }

  get from () {
    return this._from
  }

  get to () {
    return this._to
  }

  equals (object) {
    const pair = object
    return this._from === pair.from && this._to === pair.to
  }

  toString () {
    return `${this._from}-${this._to}`
  }

  hashCode () {
    return 0
  }
}
