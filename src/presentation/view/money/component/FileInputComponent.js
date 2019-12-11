import InputComponent from './InputComponent'

export default class FileInputComponent extends InputComponent {
  constructor (id) {
    super(id, 'file', 'form-control-file')
  }
}
