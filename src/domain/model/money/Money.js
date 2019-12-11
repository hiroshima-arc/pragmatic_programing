import Expression from './Expression'
import Sum from './Sum'

export default class Money extends Expression {
  constructor (amount, currency) {
    super()
    this._amount = amount
    this._currency = currency
  }

  get amount () {
    return this._amount
  }

  times (multiplier) {
    return new Money(this._amount * multiplier, this._currency)
  }

  plus (addend) {
    return new Sum(this, addend)
  }

  reduce (bank, to) {
    const rate = bank.rate(this._currency, to)
    return new Money(this._amount / rate, to)
  }

  currency () {
    return this._currency
  }

  equals (object) {
    const money = object
    return this._amount === money._amount && this._currency === money._currency
  }

  toString () {
    return this._amount + ' ' + this._currency
  }

  static dollar (amount) {
    return new Money(amount, 'USD')
  }

  static franc (amount) {
    return new Money(amount, 'CHF')
  }
}
