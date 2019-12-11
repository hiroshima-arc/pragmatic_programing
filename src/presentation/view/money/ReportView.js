import Papa from 'papaparse'
import MessageView from './MessageView'
import TableComponent from './component/TableComponent'
import PrimaryButtonComponent from './component/PrimaryButtonComponent'
import FileInputComponent from './component/FileInputComponent'

export default class ReportView {
  constructor (data, css) {
    this._report = data
    this._css = css
  }

  dispatchEvent (css) {
    const uploadEvent = e => {
      this._message.render('レポートを生成しています...', MessageView.WARNING)

      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const fileData = e.target.files[0]

        if (!fileData.name.match('.csv$')) {
          alert('CSVファイルを選択してください')
          return
        }

        const reader = new FileReader()

        reader.onload = () => {
          const data = reader.result
          const parseData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
          })

          this._service.createReportViewModel(parseData.data).then(report => {
            this._service
              .saveReport(report)
              .then(() => {
                this._results = {
                  message: 'レポートを読み込みました',
                  type: MessageView.SUCCESS
                }

                this._selectTab = this.REPORT
                this.render()
              })
              .catch(err => {
                this._results = {
                  message: `レポートを読み込めませんでした:${err}`,
                  type: MessageView.DANGER
                }

                this._selectTab = this.REPORT
                this.render()
              })
          })
        }

        reader.readAsText(fileData, 'utf-8')
      } else {
        alert('File APIに対応したブラウザでご確認ください')
      }
    }

    const downloadEvent = e => {
      const csv = Papa.unparse(this._report._report.items)
      const bom = new Uint8Array([0xef, 0xbb, 0xbf])
      const blog = new Blob([bom, csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blog)
      const a = document.createElement('a')

      a.href = url
      a.target = '_blank'
      a.download = 'data.csv'

      a.click()

      this._message.render(
        'CSVファイルダウンロード完了しました',
        MessageView.SUCCESS
      )
    }

    document
      .querySelector(`#${css.id.report.upload}`)
      .addEventListener('change', uploadEvent)
    document
      .querySelector(`#${css.id.report.download}`)
      .addEventListener('click', downloadEvent)
  }

  create () {
    return reportSelect => {
      const activeShow = reportSelect ? 'active show' : ''

      const table = () => {
        const header = () => {
          const line = ['銘柄', '株数', '価格', '合計']
            .map(i => `<th>${i}</th>`)
            .join(' ')

          return `
                                  <thead>
                                    <tr>
                                      ${line}
                                    </tr>
                                  </thead>
                            `
        }

        const body = () => {
          const items = this._report.items
          const line = items
            .map(
              i => `
                            <tr>
                              <td>${i.stockName}</td>
                              <td>${i.stockAmount}</td>
                              <td>${i.price}</td>
                              <td>${i.sum}</td>
                            </tr>
                            `
            )
            .join(' ')
          const total = `
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>
                                        <p>総計</p>
                                      </td>
                                      <td>
                                        <p>${this._report.total}</p>
                                      </td>
                                    </tr>
                            `
          return `
                                  <tbody>
                                    ${line}
                                    ${total}
                                  </tbody>
                            `
        }

        const component = new TableComponent(
          this._css.id.report.table,
          header,
          body
        )

        return component.create()
      }

      const upload = () => {
        const button = new FileInputComponent(this._css.id.report.upload)
        return `
                                <div class="col-md-12">
                                  <form>
                                    <div class="form-group">
                                      <p>
                                        CSVファイルを選択して下さい。<br />
                                      </p>
                                      ${button.create()}
                                    </div>
                                  </form>
                                </div>
                          `
      }

      const download = () => {
        const button = new PrimaryButtonComponent(
          this._css.id.report.download,
          'CSVダウンロード'
        )

        return button.create()
      }

      return `
                        <div
                          aria-labelledby="tab-menu01"
                          class="tab-pane fade border border-top-0 ${activeShow}"
                          id=${this._css.id.panel_menus.no1}
                          role="tabpanel"
                        >
                          <dvi class="row p-3">
                            <div id=${
                              this._css.id.report.name
                            } class="col-md-12 order-md-2">
                              <div class="row">
                                ${upload()}
                              </div>
                              <div class="row">
                                ${table()}
                              </div>
                              <div class="col-md-12 py-2">
                                ${download()}
                              </div>
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
