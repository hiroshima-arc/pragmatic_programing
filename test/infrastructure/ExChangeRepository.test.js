const chai = require('chai')
const assert = chai.assert
const nSQL = require('@nano-sql/core').nSQL
const MoneyDB = require('../../src/infrastructure/MoneyDB').default
const ExChangeRateRepository = require('../../src/infrastructure/ExChangeRateRepository').default
const ExChangeRate = require('../../src/domain/model/money/ExChangeRate').default

describe('ExChangeRepositoryTest', () => {
  let repository
  beforeEach(() => {
    const db = new MoneyDB('money_test', 'TEMP')
    repository = new ExChangeRateRepository(db, MoneyDB.EXCHANGE_RATES)
  })

  it('Setup', () => {
    return repository.setup().then(() => {
      const dbList = nSQL().listDatabases()
      assert.equal('money_test', dbList[0])
    })
  })

  it('Create', () => {
    const entitiy = new ExChangeRate('CHF', 'USD', 1.5)

    return repository.setup().then(() => {
      return repository.create(entitiy).then(() => {
        return repository.selectAll().then(result => {
          assert.isOk(result[0].id)
          assert.equal(result[0].from, entitiy.from)
          assert.equal(result[0].to, entitiy.to)
          assert.equal(result[0].rate, entitiy.rate)
        })
      })
    })
  })

  it('Update', () => {
    const entitiy = new ExChangeRate('CHF', 'USD', 1.5)

    return repository.setup().then(() => {
      return repository.create(entitiy).then(result => {
        const id = result.id
        const updateEntity = new ExChangeRate('USD', 'CHF', 3.0, id)
        return repository.save(updateEntity).then(() => {
          return repository.find(id).then(result => {
            assert.equal(id, result.id)
            assert.equal('USD', result.from)
            assert.equal('CHF', result.to)
            assert.equal(3, result.rate)
          })
        })
      })
    })
  })

  it('Delete', () => {
    const entitiy = new ExChangeRate('CHF', 'USD', 1.5)

    return repository.setup().then(() => {
      return repository.create(entitiy).then(() => {
        return repository.selectAll().then(result => {
          const id = result[0].id
          return repository.delete(id).then(result => {
            repository.find(id).then(result => {
              assert.deepEqual([], result)
            })
          })
        })
      })
    })
  })

  it('DeleteAll', () => {
    const entitiy1 = new ExChangeRate('CHF', 'USD', 1.5)
    const entitiy2 = new ExChangeRate('CHF', 'USD', 2.0)

    return repository.setup().then(() => {
      return repository.createBatch([entitiy1, entitiy2]).then(() => {
        return repository.destroy().then(() => {
          return repository.selectAll().then(result => {
            assert.equal(0, result.length)
          })
        })
      })
    })
  })
})
