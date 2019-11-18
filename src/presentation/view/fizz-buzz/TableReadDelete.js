import Table from './Table';
import Button from './Button';
import Message from './Message';

export default class TableReadDelete {
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
