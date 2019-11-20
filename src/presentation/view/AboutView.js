export default class AboutView {
  renderComponent () {
    // eslint-disable-next-line no-unused-vars
    const selector = {}
    const dispatchEvent = () => {}

    // eslint-disable-next-line no-unused-vars
    const createComponent = (events => {
      const about = `
      このサイトについて
      `
      document.querySelector('#app').innerHTML = `
      <div class="container">
        <h3 id="function-name" class="mb-3">${about}</h3>
        <div></div>
      </div>
      `
      events()
    })(dispatchEvent)
  }

  render () {
    this.renderComponent()
  }
}
