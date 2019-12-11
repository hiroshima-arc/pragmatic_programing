export default class TableComponent {
  constructor (id, header, body) {
    this._id = id
    this._header = header
    this._body = body
  }

  create () {
    return `
      <table id=${this._id} class="table table-striped">
          ${this._header()}
          ${this._body()}
      </table>
      `
  }
}
