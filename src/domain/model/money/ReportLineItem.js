export default class ReportLineItem {
  constructor (stockName, stockAmount, price) {
    this._stockName = stockName
    this._stockAmount = stockAmount
    this._price = price
    this._sum = price.times(stockAmount)
  }

  get stockName () {
    return this._stockName
  }

  get stockAmount () {
    return this._stockAmount
  }

  get price () {
    return this._price
  }

  get sum () {
    return this._sum
  }
}
