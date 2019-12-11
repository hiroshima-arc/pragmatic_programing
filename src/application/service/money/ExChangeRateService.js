import ExChangeRateRepository from '../../../infrastructure/ExChangeRateRepository'
import ExChangeRates from '../../../domain/model/money/ExChangeRates'
import ExChangeRate from '../../../domain/model/money/ExChangeRate'

export default class ExChangeRateService {
  constructor (db) {
    this._repository = new ExChangeRateRepository(db, 'exchange_rates')
  }

  get repository () {
    return this._repository
  }

  selectAllExChangeRate () {
    return new Promise((resolve, reject) => {
      this._repository
        .connect()
        .then(() => {
          this._repository
            .selectAll()
            .then(result => {
              resolve(new ExChangeRates(result))
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  updateExChangeRate (from, to, rate, id) {
    return new Promise((resolve, reject) => {
      const entity = new ExChangeRate(from, to, rate, id)
      return this._repository.save(entity).then(() => {
        return this._repository.selectAll().then(result => {
          resolve(new ExChangeRates(result))
        })
      })
    })
  }

  addExChangeRate (entity = new ExChangeRate('CHF', 'USD', 1.5)) {
    return new Promise((resolve, reject) => {
      return this._repository.create(entity).then(() => {
        return this._repository.selectAll().then(result => {
          resolve(new ExChangeRates(result))
        })
      })
    })
  }

  deleteExChangeRate (id) {
    return new Promise((resolve, reject) => {
      this._repository.delete(id).then(() => {
        this._repository.selectAll().then(result => {
          resolve(new ExChangeRates(result))
        })
      })
    })
  }

  deleteAllExChangeRate () {
    return new Promise((resolve, reject) => {
      this._repository.destroy().then(() => {
        this._repository.selectAll().then(result => {
          resolve(new ExChangeRates(result))
        })
      })
    })
  }
}
