import Money from './Money'
import Sum from './Sum'

export default class Report {
  constructor (items, bank, title = 'Money Report', sum = 0, currency = 'USD') {
    this._items = items
    this._title = title
    this._sum = sum
    this._currency = currency
    this._bank = bank
  }

  get title () {
    return this._title
  }

  get sum () {
    return this._sum
  }

  get currency () {
    return this._currency
  }

  get items () {
    return this._items
  }

  get total () {
    let result = new Money(0, 'USD')
    this._items.forEach(i => {
      result = this._bank.reduce(new Sum(result, i.sum), 'USD')
    })
    return result
  }
}
