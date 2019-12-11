import MoneyService from '../../../application/service/money/MoneyService'
import ReportView from './ReportView'
import ExChangeRateView from './ExChangeRateView'
import MessageView from './MessageView'
import TabComponent from './component/TabComponent'

export default class MoneyView {
  constructor () {
    this.REPORT = 1
    this.EXCHANGE = 2

    this._service = new MoneyService()
    this._report = new ReportView()
    this._exChangeRate = new ExChangeRateView()
    this._selectTab = this.REPORT
    this._css = {
      id: {
        application: 'app',
        section: {
          menu: 'menu'
        },
        message: MessageView.selectorId,
        tab_menus: {
          name: 'tab-menus',
          no1: 'tab-menu01',
          no2: 'tab-menu02'
        },
        panel_menus: {
          name: 'panel-menus',
          no1: 'panel-menu01',
          no2: 'panel-menu02'
        },
        report: {
          name: 'report',
          upload: 'app-money-upload',
          download: 'app-money-download',
          table: 'report-table'
        },
        exchange_rate: {
          name: 'exchange-rate',
          table: 'exchange-rate-table',
          button: {
            name: 'exchange-rate-button',
            add: 'exchange-rate-button-add',
            destroy: 'exchange-rate-button-destroy',
            edit: 'exchange-rate-button-edit',
            save: 'exchange-rate-button-save',
            delete: 'exchange-rate-button-delete'
          }
        }
      }
    }
    this._message = new MessageView()
    this._state = {
      reportSelect: '',
      exChangeSelect: ''
    }
    this._results = null
  }

  dispatchEvent (css) {
    const selectReportTabEvent = e => {
      this._service.getReport().then(result => {
        this._results = null
        this._selectTab = this.REPORT
        this.render()
      })
    }

    const selectExChangeRateTabEvent = e => {
      this._service.selectAllExChangeRate().then(result => {
        this._results = null
        this._selectTab = this.EXCHANGE
        this.render()
      })
    }

    document
      .querySelector(`#${css.id.tab_menus.no1}`)
      .addEventListener('click', selectReportTabEvent)
    document
      .querySelector(`#${css.id.tab_menus.no2}`)
      .addEventListener('click', selectExChangeRateTabEvent)

    this._report.dispatchEvent.bind(this)(css)

    this._exChangeRate.dispatchEvent.bind(this)(css)
  }

  create (report, exChangeRate) {
    const tab = new TabComponent({
      report: report,
      exChangeRate: exChangeRate,
      css: this._css,
      state: {
        reportSelect: this._state.reportSelect,
        exChangeSelect: this._state.exChangeSelect
      }
    })

    return `
      <div class="py-3">
        <section id="menu">
          <div class="container">
            <h3 id="function-name" class="mb-3">Money</h3>
            <div id="${this._css.id.message}"></div>
            ${tab.create()}
            </div>
          </div>
        </section>
      </div>
    `
  }

  render () {
    this._state.reportSelect = this._selectTab === this.REPORT ? 'active' : ''
    this._state.exChangeSelect =
      this._selectTab === this.EXCHANGE ? 'active' : ''

    this._service.setUpDb().then(() => {
      this._service.getReport().then(data => {
        this._report = new ReportView(data, this._css)
        const report = this._report.render()

        this._service.selectAllExChangeRate().then(data => {
          this._exChangeRate = new ExChangeRateView(data, this._css)
          const exChangeRate = this._exChangeRate.render()

          document.querySelector(
            `#${this._css.id.application}`
          ).innerHTML = this.create(report, exChangeRate)

          this.dispatchEvent(this._css)

          if (this._results !== null) this._message.render(this._results.message, this._results.type)
        })
      })
    })
  }
}
