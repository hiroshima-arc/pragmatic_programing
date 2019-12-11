import { nSQL } from '@nano-sql/core'

export default class MoneyDB {
  constructor (name, mode = 'PERM') {
    this._name = name
    this._mode = mode
  }

  static get REPORT () {
    return 'report'
  }

  static get EXCHANGE_RATES () {
    return 'exchange_rates'
  }

  create () {
    return new Promise((resolve, reject) => {
      const dbList = nSQL().listDatabases()
      if (dbList.includes(this._name)) return resolve()

      nSQL()
        .createDatabase({
          id: this._name,
          mode: this._mode,
          tables: [
            {
              name: MoneyDB.REPORT,
              model: {
                'title:string': {},
                'total:obj': {},
                'items:obj[]': { default: [] }
              },
              indexes: {}
            },
            {
              name: MoneyDB.EXCHANGE_RATES,
              model: {
                'id:uuid': { pk: true },
                'from:string': {},
                'to:string': {},
                'rate:float:': {}
              },
              indexes: {}
            }
          ]
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  setup (report, exChangeRate) {
    return new Promise((resolve, reject) => {
      const dbList = nSQL().listDatabases()
      if (dbList.length > 0) resolve()

      report
        .setup()
        .then(() => {
          exChangeRate
            .setup()
            .then(() => {
              resolve()
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

  connect () {
    return new Promise((resolve, reject) => {
      nSQL().useDatabase(this._name)
      resolve()
    })
  }
}
