import ReportRepository from '../../../infrastructure/ReportRepository'
import Money from '../../../domain/model/money/Money'
import Bank from '../../../domain/model/money/Bank'
import Report from '../../../domain/model/money/Report'
import ReportLineItem from '../../../domain/model/money/ReportLineItem'

export default class ReportService {
  constructor (db) {
    this._repository = new ReportRepository(db, 'report')
  }

  get repository () {
    return this._repository
  }

  createReportViewModel (data, rates) {
    return new Promise((resolve, reject) => {
      const bank = new Bank()
      rates.map(i => bank.addRate(i.from, i.to, i.rate))

      const items = data.map(
        i => new ReportLineItem(i.銘柄, i.株数, new Money(i.価格, i.通貨))
      )

      return resolve(new Report(items, bank))
    })
  }

  saveReport (report) {
    return new Promise((resolve, reject) => {
      this._repository.save(report).then(() => {
        resolve()
      })
    })
  }

  getReport (rates) {
    return new Promise((resolve, reject) => {
      const bank = new Bank()
      rates.map(i => bank.addRate(i.from, i.to, i.rate))

      this._repository.get().then(result => {
        const items = result.items.map(
          i =>
            new ReportLineItem(
              i._stockName,
              i._stockAmount,
              new Money(i._price._amount, i._price._currency)
            )
        )

        resolve(new Report(items, bank))
      })
    })
  }

  deleteReport () {
    return new Promise((resolve, reject) => {
      this._repository.destroy().then(() => {
        resolve()
      })
    })
  }
}
