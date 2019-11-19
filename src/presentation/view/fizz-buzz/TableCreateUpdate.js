import Table from './Table';
import Button from './Button';
import Message from './Message';
import FizzBuzzService from '../../../application/service/fizz-buzz/FizzBuzzService';

export default class TableCreateUpdate {
  constructor(service) {
    this._table = new Table();
    this._button = new Button();
    this._message = new Message();
    this._service = service;
    this._list = this._service.generateList(FizzBuzzService.MAX_COUNT);
  }

  changeEvent(e) {
    this._service = new FizzBuzzService(
      FizzBuzzService.valueOf(e.target.value)
    );
    this._list = this._service.generateList(FizzBuzzService.MAX_COUNT);
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
