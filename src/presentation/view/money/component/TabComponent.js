export default class TabComponent {
  constructor (params) {
    this._css = params.css
    this._report = params.report
    this._exChangeRate = params.exChangeRate
    this._state = params.state
  }

  create () {
    const tabNav = `
                      <div class="nav nav-tabs" id=${this._css.id.tab_menus.name} role="tablist">
                        <a
                          aria-controls="panel-menu01"
                          aria-selected="true"
                          class="nav-item nav-link ${this._state.reportSelect}"
                          data-toggle="tab"
                          href="#panel-menu01"
                          id=${this._css.id.tab_menus.no1}
                          role="tab"
                          >レポート</a
                        >
                        <a
                          aria-controls="panel-menu02"
                          aria-selected="false"
                          class="nav-item nav-link ${this._state.exChangeSelect}"
                          data-toggle="tab"
                          href="#panel-menu02"
                          id=${this._css.id.tab_menus.no2}
                          role="tab"
                          >為替レート</a
                        >
                      </div>
                  `

    const tabContent = (report, exChangeRate) => {
      return `
              <div class="tab-content" id=${this._css.id.panel_menus.name}>
                ${report(this._state.reportSelect)}
                ${exChangeRate(this._state.exChangeSelect)}
              </div>
              `
    }

    return `
              <section id=${this._css.id.section.menu}>
                <div class="container">
                  <div id=${this._css.id.message}></div>
                  ${tabNav}
                  ${tabContent(this._report, this._exChangeRate)}
                </div>
              </section>
            `
  }
}
