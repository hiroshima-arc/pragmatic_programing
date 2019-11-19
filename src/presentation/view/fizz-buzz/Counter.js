
export default class Counter {
  constructor(service) {
    this._counter = 0;
    this._service = service;
    this._value = this._service.generate(this._counter);
  }

  incrementEvent() {
    this._counter += 1;
    this._value = this._service.generate(this._counter);
    this.render(this._selector);
  }

  decrementEvent() {
    this._counter === 0 ? (this._counter = 0) : (this._counter -= 1);
    this._value = this._service.generate(this._counter);
    this.render(this._selector);
  }

  renderComponent() {
    const renderMainComponent = () => {
      const incrementId = `${this._selector.appCounterId}__increment`;
      const decrementId = `${this._selector.appCounterId}__decrement`;

      const dispatchEvent = () => {
        document
          .querySelector(`#${incrementId}`)
          .addEventListener("click", this.incrementEvent.bind(this));
        document
          .querySelector(`#${decrementId}`)
          .addEventListener("click", this.decrementEvent.bind(this));
      };

      const renderCounter = () => {
        const createCounter = (incrementId, decrementId) => {
          return `
                  <div class="col-md-1">
                    <button class="btn btn-primary" id="${decrementId}">
                      -
                    </button>
                  </div>
                  <div class="col-md-10">
                    <h1 class="display-1 text-center">${this._value}</h1>
                  </div>
                  <div class="col-md-1">
                    <button class="btn btn-primary" id="${incrementId}">
                      +
                    </button>
                  </div>
                `;
        };

        document.querySelector(
          `#${this._selector.appCounterId}`
        ).innerHTML = createCounter(incrementId, decrementId);
      };

      const createMainComponent = (events => {
        renderCounter();

        events();
      })(dispatchEvent);
    };

    const render = (() => {
      renderMainComponent();
    })();
  }

  render(selector) {
    this._selector = selector;
    this.renderComponent();
  }
}
