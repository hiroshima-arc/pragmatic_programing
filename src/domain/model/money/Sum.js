import Expression from './Expression'
import Money from './Money'

export default class Sum extends Expression {
  constructor (augend, addend) {
    super()
    this._augend = augend
    this._addend = addend
  }

  get augend () {
    return this._augend
  }

  get addend () {
    return this._addend
  }

  times (multiplier) {
    return new Sum(
      this._augend.times(multiplier),
      this._augend.times(multiplier)
    )
  }

  plus (addend) {
    return new Sum(this, addend)
  }

  reduce (bank, to) {
    const amount =
      this._augend.reduce(bank, to).amount +
      this._addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
}
