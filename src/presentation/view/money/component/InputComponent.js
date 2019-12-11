export default class InputComponent {
  constructor (id, type, style, size, value) {
    this._id = id
    this._type = type
    this._sytle = style
    this._size = size
    this._value = value
  }

  create () {
    return `
              <input
                value="${this._value}"
                size="${this._size}"
                type="${this._type}"
                class="${this._sytle}"
                id=${this._id}
              />
           `
  }
}
