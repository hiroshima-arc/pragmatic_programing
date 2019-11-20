import FizzBuzzView from './fizz-buzz/FizzBuzzView'

export default class NoticeView {
  constructor () {
    this._fizzBuzz = new FizzBuzzView()
  }

  fizzBUzzEvent () {
    this._fizzBuzz.render()
  }

  renderComponent () {
    const selector = {
      fizzBuzz: 'fizz-buzz-app'
    }

    const dispatchEvent = () => {
      document
        .querySelector(`#${selector.fizzBuzz}`)
        .addEventListener('click', this.fizzBUzzEvent.bind(this))
    }

    // eslint-disable-next-line no-unused-vars
    const createComponent = (events => {
      document.querySelector('#app').innerHTML = `
      <div class="container">
        <h3 id="function-name" class="mb-3">お知らせ</h3>
          <div class="col-md-10">
            <dl class="row">
              <dt class="col-md-3">2019年11月20日</dt>
              <dd class="col-md-9"><a href="#" id="${selector.fizzBuzz}">FizzBuzz</a>リリース</dd>
            </dl>
        </div>
      </div>
      `

      events()
    })(dispatchEvent)
  }

  render () {
    this.renderComponent()
  }
}
