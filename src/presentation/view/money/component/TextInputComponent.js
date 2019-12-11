import InputComponent from './InputComponent'

export default class TextInputComponent extends InputComponent {
  constructor (id, size, value) {
    super(id, 'text', '', size, value)
  }
}
