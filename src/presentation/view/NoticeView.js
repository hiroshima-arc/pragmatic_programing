import FizzBuzzView from './fizz-buzz/FizzBuzzView'
import MoneyView from './money/MoneyView'

export default class NoticeView {
  constructor () {
    this._fizzBuzz = new FizzBuzzView()
    this._money = new MoneyView()
  }

  fizzBuzzEvent () {
    this._fizzBuzz.render()
  }

  moneyEvent () {
    this._money.render()
  }

  renderComponent () {
    const selector = {
      fizzBuzz: 'fizz-buzz-app',
      money: 'money-app'
    }

    const dispatchEvent = () => {
      document
        .querySelector(`#${selector.fizzBuzz}`)
        .addEventListener('click', this.fizzBuzzEvent.bind(this))
      document
        .querySelector(`#${selector.money}`)
        .addEventListener('click', this.moneyEvent.bind(this))
    }

    // eslint-disable-next-line no-unused-vars
    const createComponent = (events => {
      if (document.querySelector('#app')) {
        document.querySelector('#app').innerHTML = `
          <div class="py-3">
            <div class="container">
              <h3 id="function-name" class="mb-3">お知らせ</h3>
                <div class="col-md-10">
                  <dl class="row">
                    <dt class="col-md-3">2019年12月11日</dt>
                    <dd class="col-md-9"><a href="#" id="${selector.money}">Money</a>リリース</dd>
                  </dl>
                  <dl class="row">
                    <dt class="col-md-3">2019年11月20日</dt>
                    <dd class="col-md-9"><a href="#" id="${selector.fizzBuzz}">FizzBuzz</a>リリース</dd>
                  </dl>
              </div>
          </div>
        `
        events()
      }
    })(dispatchEvent)
  }

  render () {
    this.renderComponent()
  }
}
