import Pair from './Pair'

export default class Bank {
  constructor () {
    this._rates = new Map()
  }

  reduce (source, to) {
    return source.reduce(this, to)
  }

  addRate (from, to, rate) {
    this._rates.set(new Pair(from, to).toString(), rate)
  }

  rate (from, to) {
    if (from === to) return 1
    return this._rates.get(new Pair(from, to).toString())
  }
}
