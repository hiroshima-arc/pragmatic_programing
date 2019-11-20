export default class FizzBuzzValue {
  constructor (number, value) {
    // eslint-disable-next-line curly
    if (number < 0)
      throw new Error(
        `FizzBuzzValue can't generate by minus nnumber ${number}`
      )

    this._number = number
    this._value = value
  }

  get value () {
    return this._value
  }

  get number () {
    return this._number
  }

  toString () {
    return this._value
  }

  equals (other) {
    return this._number === other._number && this._value === other._value
  }
}
