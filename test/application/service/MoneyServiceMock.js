
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
