import FizzBuzzView from './fizz-buzz/FizzBuzzView'
import MoneyView from './money/MoneyView'
import NoticeView from './NoticeView'
import AboutView from './AboutView'

export default class NavBarView {
  constructor () {
    this._notice = new NoticeView()
    this._about = new AboutView()
    this._fizzBuzz = new FizzBuzzView()
    this._money = new MoneyView()
  }

  topEvent (e) {
    this._notice.render()
  }

  aboutEvent (e) {
    this._about.render()
  }

  fizzBuzzEvent (e) {
    this._fizzBuzz.render()
  }

  moneyEvent (e) {
    this._money.render()
  }

  renderComponent () {
    const selector = {
      notice: 'notice-app-menu',
      about: 'about-app-menu',
      fizzBuzz: 'fizz-buzz-app-menu',
      money: 'money-app-menu'
    }

    const dispatchEvent = () => {
      document
        .querySelector(`#${selector.notice}`)
        .addEventListener('click', this.topEvent.bind(this))
      document
        .querySelector(`#${selector.about}`)
        .addEventListener('click', this.aboutEvent.bind(this))
      document
        .querySelector(`#${selector.fizzBuzz}`)
        .addEventListener('click', this.fizzBuzzEvent.bind(this))
      document
        .querySelector(`#${selector.money}`)
        .addEventListener('click', this.moneyEvent.bind(this))
    }

    // eslint-disable-next-line no-unused-vars
    const createComponent = (events => {
      const top = `
      <li class="nav-item active">
        <a href="#" id="${selector.notice}" class="nav-link"
          >Top <span class="sr-only">(current)</span></a
        >
      </li>
      `
      const about = `
      <li class="nav-item">
        <a href="#" id="${selector.about}" class="nav-link">About</a>
      </li>
      `
      const contents = `
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a href="#" id="${selector.fizzBuzz}" class="dropdown-item">FizzBuzz</a>
          <a href="#" id="${selector.money}" class="dropdown-item">Money</a>
        </div>
        `

      const documents = `
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a href="http://www.hiroshima-arc.org/pragmatic_programing/spec" target="_blank" class="dropdown-item">開発ガイド</a>
          <a href="http://www.hiroshima-arc.org/pragmatic_programing/guide" target="_blank" class="dropdown-item">ユーザーガイド</a>
        </div>
        `

      document.querySelector('#navbar').innerHTML = `
        <nav class="navbar navbar-expand-md navbar-dark bg-dark stick-top">
          <!-- サブコンポーネント -->
          <div class="container">
            <a href="index.html" class="navbar-brand">Etude</a>
            <!-- 切り替えボタン -->
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-content"
              aria-controls="navbar-content"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- ナビゲーション -->
            <div class="collapse navbar-collapse" id="navbar-content">
              <!-- ナビゲーションメニュー -->
              <!-- 左側メニュー: トップページの各コンテンツへのリンク -->
              <ul class="navbar-nav mr-auto">
                ${top}
                ${about}
                <li class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-hhaspopup="true"
                    aria-expanded="false"
                  >
                    Contents
                  </a>
                  ${contents}
                <li class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-hhaspopup="true"
                    aria-expanded="false"
                  >
                    Documents
                  </a>
                  ${documents}
                </li>
              </ul>
              <!-- /ナビゲーションメニュー -->
            </div>
          </div>
          <!-- サブコンポーネント -->
        </nav>
      `
      events()
    })(dispatchEvent)
  }

  render () {
    this.renderComponent()
  }
}
