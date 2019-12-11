export default class ExChangeRates {
  constructor (exChangeRateRecord) {
    this._record = exChangeRateRecord
  }

  get record () {
    return this._record
  }
}
