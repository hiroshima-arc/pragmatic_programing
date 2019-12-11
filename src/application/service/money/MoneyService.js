import MoneyDB from '../../../infrastructure/MoneyDB'
import ReportService from './ReportService'
import ExChangeRateService from './ExChangeRateService'
import ExChangeRate from '../../../domain/model/money/ExChangeRate'

export default class MoneyService {
  constructor () {
    this._db = new MoneyDB('money')
    this._reportService = new ReportService(this._db)
    this._exChangeRateService = new ExChangeRateService(this._db)
  }

  setUpDb () {
    return new Promise((resolve, reject) => {
      resolve(
        this._db.setup(
          this._reportService.repository,
          this._exChangeRateService.repository
        )
      )
    })
  }

  createReportViewModel (data) {
    return new Promise((resolve, reject) => {
      this._exChangeRateService.selectAllExChangeRate().then(result => {
        resolve(this._reportService.createReportViewModel(data, result.record))
      })
    })
  }

  saveReport (report) {
    return new Promise((resolve, reject) => {
      this._reportService.saveReport(report).then(() => {
        resolve()
      })
    })
  }

  getReport () {
    return new Promise((resolve, reject) => {
      this._exChangeRateService.selectAllExChangeRate().then(result => {
        resolve(this._reportService.getReport(result.record))
      })
    })
  }

  deleteReport () {
    return new Promise((resolve, reject) => {
      this._reportService.deleteReport().then(() => {
        resolve()
      })
    })
  }

  selectAllExChangeRate () {
    return new Promise((resolve, reject) => {
      resolve(this._exChangeRateService.selectAllExChangeRate())
    })
  }

  updateExChangeRate (from, to, rate, id) {
    return new Promise((resolve, reject) => {
      resolve(this._exChangeRateService.updateExChangeRate(from, to, rate, id))
    })
  }

  addExChangeRate (entity = new ExChangeRate('CHF', 'USD', 1.5)) {
    return new Promise((resolve, reject) => {
      resolve(this._exChangeRateService.addExChangeRate(entity))
    })
  }

  deleteExChangeRate (id) {
    return new Promise((resolve, reject) => {
      resolve(this._exChangeRateService.deleteExChangeRate(id))
    })
  }

  deleteAllExChangeRate () {
    return new Promise((resolve, reject) => {
      resolve(this._exChangeRateService.deleteAllExChangeRate())
    })
  }
}
