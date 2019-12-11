export default class ButtonComponent {
  constructor (id, label, style = 'btn') {
    this._id = id
    this._label = label
    this._style = style
  }

  create () {
    return `
        <button
          type="button"
          class="${this._style}"
          id="${this._id}"
        >
        ${this._label}
        </button>
        `
  }
}
