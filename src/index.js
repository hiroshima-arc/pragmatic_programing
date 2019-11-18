import FizzBuzzTypeEnum from './domain/type/fizz-buzz/FizzBuzzTypeEnum';
import FizzBuzzList from './domain/model/fizz-buzz/FizzBuzzList';
import FizzBuzzService from './application/service/fizz-buzz/FizzBuzzService';

class Table {
  constructor() {}

  create(aList) {
    const header = (() => {
      return [...Array(10).keys()].map(i => `<th>${i + 1}</th>`);
    })();

    const body = (() => {
      let result = [];
      let row = 0;
      let col = [];
      aList.forEach((v, k) => {
        if ((k + 1) % 10 === 0) {
          col.push(`<td>${v}</td>`);
          result[row++] = col;
          col = [];
        } else {
          col.push(`<td>${v}</td>`);
        }
      });
      return result;
    })();

    const row = n => body[n].join(" ");

    const result = `
            <table>
              <thead>
                ${header[0]}
                ${header[1]}
                ${header[2]}
                ${header[3]}
                ${header[4]}
                ${header[5]}
                ${header[6]}
                ${header[7]}
                ${header[8]}
                ${header[9]}
              </thead>
              <tbody>
                <tr>${row(0)}</tr>
                <tr>${row(1)}</tr>
                <tr>${row(2)}</tr>
                <tr>${row(3)}</tr>
                <tr>${row(4)}</tr>
                <tr>${row(5)}</tr>
                <tr>${row(6)}</tr>
                <tr>${row(7)}</tr>
                <tr>${row(8)}</tr>
                <tr>${row(9)}</tr>
              </tbody>
            </table>
        `;
    return result;
  }
}

class Button {
  constructor() {}

  create(id, tableId, label) {
    return `
            <button
              id="${id}"
              type="button"
              class="btn btn-primary btn-rounded btn-sm my-0"
              data-tableid="${tableId}"
            >
              ${label}
            </button>
          `;
  }
}

class Message {
  constructor() {}

  static get WARNING() {
    return 1;
  }
  static get SUCCESS() {
    return 2;
  }
  static get DANGER() {
    return 3;
  }

  static get selectorId() {
    return "app__message";
  }

  static create(message, type) {
    switch (type) {
      case 1:
        return `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      case 2:
        return `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      case 3:
        return `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      default:
        return `
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
    }
  }

  clear() {
    document.querySelector(`#${Message.selectorId}`).innerHTML = "";
  }

  render(message, type) {
    document.querySelector(`#${Message.selectorId}`).innerHTML = Message.create(
      message,
      type
    );
  }
}

class Counter {
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

class TableCreateUpdate {
  constructor(service) {
    this._table = new Table();
    this._button = new Button();
    this._message = new Message();
    this._service = service;
    this._list = this._service.generateList(FizzBuzzList.MAX_COUNT);
  }

  changeEvent(e) {
    this._service = new FizzBuzzService(
      FizzBuzzTypeEnum.valuOf(e.target.value)
    );
    this._list = this._service.generateList(FizzBuzzList.MAX_COUNT);
    this._selected = e.target.value;
    this.render(this._selector);
  }

  saveTableEvent(e) {
    const createListFromTable = table => {
      let list = [];
      for (let i = 1; i <= 10; i++) {
        for (let j = 0; j < 10; j++) {
          list.push(table.rows[i].cells[j].innerText);
        }
      }
      return list;
    };
    const table = document.querySelector(
      `#${e.target.dataset.tableid} > table`
    );
    let result = createListFromTable(table);
    this._service
      .save(result)
      .then(() => {
        this._message.render(`保存しました`, Message.SUCCESS);
        this.render(this._selector);
      })
      .catch(error => {
        this._message.render(error, Message.DANGER);
      });
  }

  renderComponent() {
    const renderMainComponent = () => {
      const renderSelectId = `${this._selector.appCreateUpdateId}__select`;
      const renderSelectTypeId = `${renderSelectId}--type`;
      const renderTableId = `${this._selector.appCreateUpdateId}__table`;
      const renderButtonTableId = `${renderTableId}__button`;
      const renderButtonTableSaveId = `${renderButtonTableId}--save`;

      const dispatchEvent = () => {
        document
          .querySelector(`#${renderSelectTypeId}`)
          .addEventListener("change", this.changeEvent.bind(this));
        document
          .querySelector(`#${renderButtonTableSaveId}`)
          .addEventListener("click", this.saveTableEvent.bind(this));
      };

      const renderSelect = selected => {
        const createSelect = id => {
          switch (selected) {
            case "two":
              return `
                        <select name="type" id="${id}">
                          <option value="one">タイプ1</option>
                          <option selected value="two">タイプ2</option>
                          <option value="three">タイプ3</option>
                        </select>
                        `;
            case "three":
              return `
                        <select name="type" id="${id}">
                          <option value="one">タイプ1</option>
                          <option value="two">タイプ2</option>
                          <option selected value="three">タイプ3</option>
                        </select>
                        `;
            default:
              return `
                        <select name="type" id="${id}">
                          <option value="one">タイプ1</option>
                          <option value="two">タイプ2</option>
                          <option value="three">タイプ3</option>
                        </select>
                        `;
          }
        };

        document.querySelector(`#${renderSelectId}`).innerHTML = createSelect(
          renderSelectTypeId
        );

        document
          .querySelector(`#${renderSelectTypeId}`)
          .classList.add("browser-default");
        document
          .querySelector(`#${renderSelectTypeId}`)
          .classList.add("custom-select");
      };

      const renderTable = aList => {
        const createTable = aList => {
          return this._table.create(aList);
        };

        const editTable = () => {
          $(`#${renderTableId} > table > tbody > tr > td`).on(
            "click",
            edit_toggle(this._service)
          );

          function save(value) {
            document.querySelector(
              `#${Message.selectorId}`
            ).innerHTML = Message.create(`${value}に編集しました。`);
          }

          function edit_toggle(service) {
            let edit_flag = false;
            return function() {
              if (edit_flag) return;

              let $input = $("<input>")
                .attr("type", "text")
                .val($(this).text());

              $(this).html($input);

              $("input", this)
                .focus()
                .keypress(function(e) {
                  if (e.which == 13) {
                    const number = $(this).val();
                    try {
                      const value = service.generate(number);
                      save(value);
                      $(this)
                        .after(value)
                        .unbind()
                        .remove();
                      edit_flag = false;
                    } catch (e) {
                      document.querySelector(
                        `#${Message.selectorId}`
                      ).innerHTML = Message.create(e.message, Message.DANGER);
                    }
                  }
                });

              $("input", this)
                .focus()
                .blur(function(e) {
                  $(this)
                    .after($(this).val())
                    .unbind()
                    .remove();
                  edit_flag = false;
                });
              edit_flag = true;
            };
          }
        };

        document.querySelector(`#${renderTableId}`).innerHTML = createTable(
          aList
        );
        document
          .querySelector(`#${renderTableId} > table`)
          .classList.add("table");
        document
          .querySelector(`#${renderTableId} > table`)
          .classList.add("table-striped");
        editTable();
      };

      const renderButtonSave = () => {
        const createButton = (id, renderTableId, label) => {
          return this._button.create(id, renderTableId, label);
        };

        document.querySelector(
          `#${renderButtonTableId}`
        ).innerHTML = createButton(
          renderButtonTableSaveId,
          renderTableId,
          "保存"
        );
      };

      const createMainComponent = (events => {
        document.querySelector(
          `#${this._selector.appCreateUpdateId}`
        ).innerHTML = `
                <div id="${renderSelectId}"></div>
                <div id="${renderTableId}"></div>
                <div id="${renderButtonTableId}"></div>
              `;

        renderSelect(this._selected);
        renderTable(this._list);
        renderButtonSave();

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

class TableReadDelete {
  constructor(service) {
    this._table = new Table();
    this._button = new Button();
    this._message = new Message();
    this._service = service;
  }

  changeReadEvent(e) {
    const record = this._record.filter(data => data.id === e.target.value);
    this._selected = e.target.value;
    if (record[0] !== undefined) this.render(this._selector);
  }

  deleteTableEvent(e) {
    const id = document.querySelector(
      `#${this._selector.appReadDeleteId}__select__select-read`
    ).value;
    this._service.delete(id).then(() => {
      this._message.render(`${id}を削除しました。`, Message.SUCCESS);
      this.render(this._selector);
    });
  }

  deleteAllEvent(e) {
    this._service.deleteAll().then(() => {
      this._message.render(`全てのレコードを削除しました。`, Message.SUCCESS);
      this.render(this._selector);
    });
  }

  renderComponent() {
    const renderMainComponent = () => {
      const renderSelectReadId = `${this._selector.appReadDeleteId}__select`;
      const renderSelectReadSelectId = `${renderSelectReadId}__select-read`;
      const renderTableReadId = `${this._selector.appReadDeleteId}__table`;
      const renderButtonDeleteId = `${this._selector.appReadDeleteId}__button`;
      const renderButtonDeleteSelectId = `${renderButtonDeleteId}--delete-select`;
      const renderButtonDeleteAllId = `${renderButtonDeleteId}--delete-all`;

      const dispatchEvent = () => {
        document
          .querySelector(`#${renderSelectReadSelectId}`)
          .addEventListener("change", this.changeReadEvent.bind(this));

        document
          .querySelector(`#${renderButtonDeleteSelectId}`)
          .addEventListener("click", this.deleteTableEvent.bind(this));

        document
          .querySelector(`#${renderButtonDeleteAllId}`)
          .addEventListener("click", this.deleteAllEvent.bind(this));
      };

      const renderSelectRead = data => {
        const createSelectRead = (id, aList) => {
          let options = [];
          aList.forEach(data => {
            if (this._selected === data.id) {
              options.push(`<option selected>${data.id}</option>`);
            } else {
              options.push(`<option>${data.id}</option>`);
            }
          });
          return `
                  <select name="type" id="${id}">
                    ${options.join(" ")}
                  </select>
                `;
        };

        document.querySelector(
          `#${renderSelectReadId}`
        ).innerHTML = createSelectRead(renderSelectReadSelectId, data);

        document
          .querySelector(`#${renderSelectReadSelectId}`)
          .classList.add("browser-default");
        document
          .querySelector(`#${renderSelectReadSelectId}`)
          .classList.add("custom-select");
      };

      const renderTableRead = aList => {
        const createTable = aList => {
          return this._table.create(aList);
        };

        document.querySelector(`#${renderTableReadId}`).innerHTML = createTable(
          aList
        );

        document
          .querySelector(`#${renderTableReadId} > table`)
          .classList.add("table");
        document
          .querySelector(`#${renderTableReadId} > table`)
          .classList.add("table-striped");
      };

      const renderButtonDelete = () => {
        const createButton = (id, tableId, label) => {
          return this._button.create(id, tableId, label);
        };

        let button = createButton(
          renderButtonDeleteSelectId,
          renderTableReadId,
          "削除"
        );
        button += createButton(
          renderButtonDeleteAllId,
          renderTableReadId,
          "全削除"
        );
        document.querySelector(`#${renderButtonDeleteId}`).innerHTML = button;
      };

      const createMainComponent = (events => {
        document.querySelector(
          `#${this._selector.appReadDeleteId}`
        ).innerHTML = `
                <div id="${renderSelectReadId}"></div>
                <div id="${renderTableReadId}"></div>
                <div id="${renderButtonDeleteId}"></div>
              `;

        this._service.selectAll().then(data => {
          renderSelectRead(data);
          if (data[0] !== undefined) {
            if (this._selected !== undefined) {
              renderTableRead(
                data.filter(v => v.id === this._selected)[0].list
              );
            } else {
              renderTableRead(data[0].list);
            }
          }
          renderButtonDelete();
          this._record = data;

          events();
        });
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

class FizzBuzzView {
  constructor(type) {
    this._type = type || FizzBuzzTypeEnum.Type01;
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
      appId: "fizz-buzz-app",
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

document.addEventListener("DOMContentLoaded", e => {
  const view = new FizzBuzzView();
  view.render();
});
