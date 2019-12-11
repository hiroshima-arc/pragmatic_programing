const chai = require('chai')
const assert = chai.assert
const nSQL = require('@nano-sql/core').nSQL
const MoneyDB = require('../../src/infrastructure/MoneyDB').default
const ReportRepository = require('../../src/infrastructure/ReportRepository').default
const Money = require('../../src/domain/model/money/Money').default
const Bank = require('../../src/domain/model/money/Bank').default
const Report = require('../../src/domain/model/money/Report').default
const ReportLineItem = require('../../src/domain/model/money/ReportLineItem').default

describe('ReportRepositoryTest', () => {
  let repository
  before(() => {
    const db = new MoneyDB('money_test', 'TEMP')
    repository = new ReportRepository(db, MoneyDB.REPORT)
  })

  it('Setup', () => {
    return repository.setup().then(() => {
      const dbList = nSQL().listDatabases()
      assert.equal('money_test', dbList[0])
    })
  })

  it('Create', () => {
    const data = [
      { 銘柄: 'IBM', 株数: '1000', 価格: '25', 通貨: 'USD' },
      { 銘柄: 'Novartis', 株数: '400', 価格: '150', 通貨: 'CHF' }
    ]
    const items = data.map(
      i => new ReportLineItem(i.銘柄, i.株数, new Money(i.価格, i.通貨))
    )
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 1.5)
    const report = new Report(items, bank)
    return repository.setup().then(() => {
      return repository.save(report).then(() => {
        return repository.get().then(result => {
          assert.equal('Money Report', result.title)
          assert.equal(65000, result.sum)
          assert.equal('USD', result.currency)
        })
      })
    })
  })

  it('Destroy', () => {
    return repository.setup().then(() => {
      return repository.destroy()
    })
  })
})
