import { nSQL } from '@nano-sql/core'
import Bank from '../domain/model/money/Bank'
import Report from '../domain/model/money/Report'

export default class ReportRepository {
  constructor (db, table) {
    this._db = db
    this._table = table
  }

  get table () {
    return this._table
  }

  setup () {
    return new Promise((resolve, reject) => {
      resolve(this._db.create())
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      resolve(this._db.connect())
    })
  }

  save (data) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('delete')
        .exec()
        .then(() => {
          nSQL(this.table)
            .query('upsert', data)
            .exec()
            .then(rows => {
              resolve(rows)
            })
            .catch(err => {
              reject(err)
            })
        })
    })
  }

  get () {
    return new Promise((resolve, reject) => {
      const bank = new Bank()
      bank.addRate('CHF', 'USD', 1.5)

      nSQL(this.table)
        .query('select')
        .exec()
        .then(rows => {
          if (rows.length === 0) return resolve(new Report([], bank))

          const result = rows.map(
            row =>
              new Report(
                row.items,
                bank,
                row.title,
                row.total._amount,
                row.total._currency
              )
          )[0]
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  destroy () {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('delete')
        .exec()
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
