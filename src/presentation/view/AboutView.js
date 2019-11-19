export default class AboutView {
  renderComponent() {
    const selector = {};
    const dispatchEvent = () => {};

    const createComponent = (events => {
      const about = `
      このサイトについて
      `
      document.querySelector("#app").innerHTML = `
      <div class="container">
        <h3 id="function-name" class="mb-3">${about}</h3>
        <div></div>
      </div>
      `;
      events();
    })(dispatchEvent);
  }

  render() {
    this.renderComponent();
  }
}
