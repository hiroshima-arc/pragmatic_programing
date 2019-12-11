import MessageView from './MessageView'
import TableComponent from './component/TableComponent'
import PrimaryMiniButtonComponent from './component/PrimaryMiniButtonComponent'
import DangerMiniButtonComponent from './component/DangerMiniButtonComponent'
import TextInputComponent from './component/TextInputComponent'

export default class ExChangeRateView {
  constructor (data, css) {
    this._record = data
    this._css = css
  }

  dispatchEvent (css) {
    const addExChangeRateEvent = e => {
      this._service.addExChangeRate().then(data => {
        this._results = {
          message: '為替レートを追加しました',
          type: MessageView.SUCCESS
        }
        this._selectTab = this.EXCHANGE
        this.render()
      })
    }

    const editExChangeRateEvent = e => {
      e.target.disabled = true
      e.target.parentElement.getElementsByTagName('button')[1].disabled = false

      const from = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'td'
      )[1]
      const to = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'td'
      )[2]
      const rate = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'td'
      )[3]

      const fromInput = new TextInputComponent('', 10, from.innerText)
      const toInput = new TextInputComponent('', 10, to.innerText)
      const rateInput = new TextInputComponent('', 10, rate.innerText)
      from.innerHTML = fromInput.create()
      to.innerHTML = toInput.create()
      rate.innerHTML = rateInput.create()
    }

    const saveExChangeRateEvent = e => {
      const from = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'input'
      )[0]
      const to = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'input'
      )[1]
      const rate = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'input'
      )[2]
      const id = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'input'
      )[3].value

      this._service
        .updateExChangeRate(from.value, to.value, rate.value, id)
        .then(result => {
          this._results = {
            message: '為替レートを保存しました',
            type: MessageView.SUCCESS
          }
          this._selectTab = this.EXCHANGE
          this.render()
        })
    }

    const deleteAllExChangeRateEvent = e => {
      this._service.deleteAllExChangeRate().then(() => {
        this._results = {
          message: '為替レートを全て削除しました',
          type: MessageView.WARNING
        }
        this._selectTab = this.EXCHANGE
        this.render()
      })
    }

    const delteExhangeRateEvent = e => {
      const id = e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        'input'
      )[0].value

      this._service.deleteExChangeRate(id).then(() => {
        this._results = {
          message: '為替レートを削除しました',
          type: MessageView.WARNING
        }
        this._selectTab = this.EXCHANGE
        this.render()
      })
    }

    document
      .querySelector(`#${css.id.exchange_rate.button.add}`)
      .addEventListener('click', addExChangeRateEvent)
    document
      .querySelector(`#${css.id.exchange_rate.button.destroy}`)
      .addEventListener('click', deleteAllExChangeRateEvent)
    this._exChangeRate._record._record.forEach((v, k) => {
      document
        .querySelector(`#${css.id.exchange_rate.button.edit}-${k}`)
        .addEventListener('click', editExChangeRateEvent)
      document
        .querySelector(`#${css.id.exchange_rate.button.save}-${k}`)
        .addEventListener('click', saveExChangeRateEvent)
      document.querySelector(
        `#${css.id.exchange_rate.button.save}-${k}`
      ).disabled = true
      document
        .querySelector(`#${css.id.exchange_rate.button.delete}-${k}`)
        .addEventListener('click', delteExhangeRateEvent)
    })
  }

  create () {
    return exChangeSelect => {
      const activeShow = exChangeSelect ? 'active show' : ''

      const table = record => {
        const header = () => {
          const th = ['ID', '換算元', '換算先', 'レート', '']
            .map(i => `<th>${i}</th>`)
            .join(' ')

          return `
                                <thead>
                                  <tr>
                                    ${th}
                                  </tr>
                                </thead>
                            `
        }

        const body = () => {
          const line = (item, key) => {
            const edit = () => {
              const button = new PrimaryMiniButtonComponent(
                `${this._css.id.exchange_rate.button.edit}-${key}`,
                '編集'
              )
              return button.create()
            }

            const save = () => {
              const button = new PrimaryMiniButtonComponent(
                `${this._css.id.exchange_rate.button.save}-${key}`,
                '保存'
              )
              return button.create()
            }

            const delet = () => {
              const button = new DangerMiniButtonComponent(
                `${this._css.id.exchange_rate.button.delete}-${key}`,
                '削除'
              )
              return button.create()
            }

            return `
                                  <tr>
                                    <td>${item.id.slice(0, 5)}...</td>
                                    <td>${item.from}</td>
                                    <td>${item.to}</td>
                                    <td>${item.rate}</td>
                                    <td>
                                      <span class="button">
                                        ${edit()}
                                        ${save()}
                                        ${delet()}
                                      </span>
                                    </td>
                                    <td>
                                      <input type="hidden" value=${item.id}>
                                    </td>
                                  </tr>
                              `
          }

          return `
                                <tbody>
                                  ${record.map((v, k) => line(v, k)).join('')}
                                </tbody>
                            `
        }

        const component = new TableComponent(
          this._css.id.exchange_rate.table,
          header,
          body
        )

        return component.create()
      }

      const button = () => {
        const add = () => {
          const button = new PrimaryMiniButtonComponent(
            this._css.id.exchange_rate.button.add,
            '追加'
          )
          return button.create()
        }

        const deletAll = () => {
          const button = new DangerMiniButtonComponent(
            this._css.id.exchange_rate.button.destroy,
            '全削除'
          )
          return button.create()
        }
        return `
                              <div id="button">
                                ${add()}
                                ${deletAll()}
                              </div>
                          `
      }

      return `
                        <div
                          aria-labelledby="tab-menu02"
                          class="tab-pane fade border border-top-0 ${activeShow}"
                          id=${this._css.id.panel_menus.no2}
                          role="tabpanel"
                        >
                          <dvi class="row p-3">
                            <div id="exchange-rate" class="col-md-12 order-md-2">
                              ${table(this._record._record)}
                              ${button()}
                            </div>
                          </dvi>
                        </div>
                    `
    }
  }

  render () {
    return this.create()
  }
}
