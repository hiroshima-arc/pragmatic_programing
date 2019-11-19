import FizzBuzzService from '../../../application/service/fizz-buzz/FizzBuzzService';
import Message from "./Message";
import Counter from './Counter';
import TableCreateUpdate from './TableCreateUpdate';
import TableReadDelete from './TableReadDelete';

export default class FizzBuzzView {
  constructor(type) {
    this._type = type || FizzBuzzService.Type01;
    this._message = new Message();
    this._service = new FizzBuzzService(this._type);
    this._counterComponent = new Counter(this._service);
    this._tableCreateUpdateComponent = new TableCreateUpdate(this._service);
    this._tableReadDeleteComponent = new TableReadDelete(this._service);
  }

  counterEvent(e) {
    this._counterComponent.render(this._selector);
    this._message.clear();
  }

  createUpdateEvent(e) {
    this._tableCreateUpdateComponent.render(this._selector);
    this._message.clear();
  }

  readDeleteEvent(e) {
    this._tableReadDeleteComponent.render(this._selector);
    this._message.clear();
  }

  renderComponent() {
    const selector = {
      appId: "app",
      msgId: Message.selectorId,
      appCounterId: "fizz-buzz-app-counter",
      appCreateUpdateId: "fizz-buzz-app-create-update",
      appReadDeleteId: "fizz-buzz-app-read-delete",
      counterTabId: "tab-menu01",
      createUpdateTabId: "tab-menu02",
      readDeleteTabId: "tab-menu03",
      counterPanelId: "panel-menu01",
      createUpdatePanelId: "panel-menu02",
      readDeletePanelId: "panel-menu03"
    };

    const renderMainComponent = () => {
      const dispatchEvent = () => {
        document
          .querySelector(`#${selector.counterTabId}`)
          .addEventListener("click", this.counterEvent.bind(this));
        document
          .querySelector(`#${selector.createUpdateTabId}`)
          .addEventListener("click", this.createUpdateEvent.bind(this));
        document
          .querySelector(`#${selector.readDeleteTabId}`)
          .addEventListener("click", this.readDeleteEvent.bind(this));
      };

      const createMainComponent = (events => {
        document.querySelector(`#${selector.appId}`).innerHTML = `
                <div class="py-3">
                  <section id="menu">
                    <div class="container">
                      <h3 id="function-name" class="mb-3">FizzBuzz</h3>
                      <div id="${selector.msgId}"></div>
                      <div class="nav nav-tabs" id="tab-menus" role="tablist">
                        <a
                          aria-controls="${selector.counterPanelId}"
                          aria-selected="true"
                          class="nav-item nav-link active"
                          data-toggle="tab"
                          href="#${selector.counterPanelId}"
                          id="${selector.counterTabId}"
                          role="tab"
                          >Counter</a
                        >
                        <a
                          aria-controls="${selector.createUpdatePanelId}"
                          aria-selected="false"
                          class="nav-item nav-link"
                          data-toggle="tab"
                          href="#${selector.createUpdatePanelId}"
                          id="${selector.createUpdateTabId}"
                          role="tab"
                          >Table(Create&Update)</a
                        >
                        <a
                          aria-controls="${selector.readDeletePanelId}"
                          aria-selected="false"
                          class="nav-item nav-link"
                          data-toggle="tab"
                          href="#${selector.readDeletePanelId}"
                          id="${selector.readDeleteTabId}"
                          role="tab"
                          >Table(Read&Delete)</a
                        >
                      </div>

                      <div class="tab-content" id="panel-menus">
                        <div
                          aria-labelledby="${selector.counterTabId}"
                          class="tab-pane fade show active border border-top-0 jumbotron"
                          id="${selector.counterPanelId}"
                          role="tabpanel"
                        >
                          <div
                            id="${selector.appCounterId}"
                            class="row d-flex align-items-center"
                          ></div>
                        </div>
                        <div
                          aria-labelledby="${selector.createUpdateTabId}"
                          class="tab-pane fade border border-top-0"
                          id="${selector.createUpdatePanelId}"
                          role="tabpanel"
                        >
                          <dvi class="row p-3">
                            <div
                              id="${selector.appCreateUpdateId}"
                              class="col-md-12 order-md-2"
                            ></div>
                          </dvi>
                        </div>
                        <div
                          aria-labelledby="${selector.readDeleteTabId}"
                          class="tab-pane fade border border-top-0"
                          id="${selector.readDeletePanelId}"
                          role="tabpanel"
                        >
                          <dvi class="row p-3">
                            <div
                              id="${selector.appReadDeleteId}"
                              class="col-md-12 order-md-2"
                            ></div>
                          </dvi>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
            `;

        events();
      })(dispatchEvent);
    };

    const renderSubComponent = () => {
      this._counterComponent.render(selector);
      this._tableCreateUpdateComponent.render(selector);
      this._tableReadDeleteComponent.render(selector);
      this._selector = selector;
    };

    const render = (() => {
      renderMainComponent();
      renderSubComponent();
    })();
  }

  render() {
    this.renderComponent();
  }
}
