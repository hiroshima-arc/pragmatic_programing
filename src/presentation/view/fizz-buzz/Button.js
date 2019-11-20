export default class Button {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}

  create (id, tableId, label) {
    return `
            <button
              id="${id}"
              type="button"
              class="btn btn-primary btn-rounded btn-sm my-0"
              data-tableid="${tableId}"
            >
              ${label}
            </button>
          `
  }
}
