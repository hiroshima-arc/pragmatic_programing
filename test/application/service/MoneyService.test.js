const chai = require('chai')
const assert = chai.assert
const ExChangeRate = require('../../../src/domain/model/money/ExChangeRate').default
const MoneyDB = require('../../../src/infrastructure/MoneyDB').default
const MoneyService = require('../../../src/application/service/money/MoneyService').default
const ReportService = require('../../../src/application/service/money/ReportService').default
const ExChangeRateService = require('../../../src/application/service/money/ExChangeRateService').default
const ReportRepository = require('../../../src/infrastructure/ReportRepository').default
const ExChangeRateRepository = require('../../../src/infrastructure/ExChangeRateRepository').default

export default class MoneyServiceMock extends MoneyService {
  constructor () {
    super()
    const db = new MoneyDB('money_test', 'TEMP')
    this._reportService = new ReportServiceMock(db)
    this._exChangeRateService = new ExChangeRateServiceMock(db)
  }
}

class ReportServiceMock extends ReportService {
  constructor (db) {
    super()
    this._repository = new ReportRepository(db, MoneyDB.REPORT)
  }
}

class ExChangeRateServiceMock extends ExChangeRateService {
  constructor (db) {
    super()
    this._repository = new ExChangeRateRepository(db, MoneyDB.EXCHANGE_RATES)
  }
}

describe('MoneyServiceTest', () => {
  let service
  before(() => {
    service = new MoneyServiceMock()
  })

  it('GetReport', () => {
    const data = [
      { 銘柄: 'IBM', 株数: '1000', 価格: '25', 通貨: 'USD' },
      { 銘柄: 'Novartis', 株数: '400', 価格: '150', 通貨: 'CHF' }
    ]

    return service.setUpDb().then(() => {
      return service.deleteReport().then(() => {
        return service.createReportViewModel(data).then(report => {
          return service.saveReport(report).then(() => {
            return service.getReport().then(result => {
              assert.equal('Money Report', result.title)
            })
          })
        })
      })
    })
  })

  it('CreateReport', () => {
    const entitiy = new ExChangeRate('CHF', 'USD', 2)
    const data = [{ 銘柄: 'Novartis', 株数: '1', 価格: '150', 通貨: 'CHF' }]

    return service.setUpDb().then(() => {
      return service.addExChangeRate(entitiy).then(() => {
        return service.createReportViewModel(data).then(report => {
          return service.saveReport(report).then(() => {
            return service.getReport().then(result => {
              assert.equal('75 USD', result.total.toString())
            })
          })
        })
      })
    })
  })

  it('DeleteReport', () => {
    return service.setUpDb().then(() => {
      return service.deleteReport()
    })
  })

  it('DeleteExChangeRate', () => {
    return service.setUpDb().then(() => {
      return service.deleteAllExChangeRate()
    })
  })
})
