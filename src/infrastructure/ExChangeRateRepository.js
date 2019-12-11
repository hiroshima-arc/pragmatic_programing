import { nSQL } from '@nano-sql/core'
import ExChangeRate from '../domain/model/money/Expression'

export default class ExChangeRateRepository {
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

  create (data) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('upsert', data)
        .exec()
        .then(rows => {
          resolve(
            rows.map(
              row => new ExChangeRate(row.from, row.to, row.rate, row.id)
            )[0]
          )
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  save (data) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('delete')
        .where(['id', '=', data.id])
        .exec()
        .then(rows => {
          resolve(
            nSQL(this.table)
              .query('upsert', data)
              .exec()
              .then(rows => {
                resolve(
                  rows.map(
                    row => new ExChangeRate(row.from, row.to, row.rate, row.id)
                  )[0]
                )
              })
              .catch(err => {
                reject(err)
              })
          )
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  selectAll () {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('select')
        .exec()
        .then(rows => {
          const result = rows.map(
            row => new ExChangeRate(row.from, row.to, row.rate, row.id)
          )
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('delete')
        .where(['id', '=', id])
        .exec()
        .then(rows => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  find (id) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('select')
        .where(['id', '=', id])
        .exec()
        .then(rows => {
          if (rows.length === 0) {
            resolve([])
          } else {
            resolve(
              new ExChangeRate(
                rows[0].from,
                rows[0].to,
                rows[0].rate,
                rows[0].id
              )
            )
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  createBatch (list) {
    return new Promise((resolve, reject) => {
      nSQL(this.table)
        .query('upsert', list)
        .exec()
        .then(rows => {
          resolve(
            rows.map(
              row => new ExChangeRate(row.from, row.to, row.rate, row.id)
            )
          )
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
