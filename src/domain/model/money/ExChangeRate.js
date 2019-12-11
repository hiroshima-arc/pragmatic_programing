export default class ExChangeRate {
  constructor (from, to, rate, id) {
    this._from = from
    this._to = to
    this._rate = rate
    this._id = id
  }

  get id () {
    return this._id
  }

  get from () {
    return this._from
  }

  get to () {
    return this._to
  }

  get rate () {
    return this._rate
  }
}
