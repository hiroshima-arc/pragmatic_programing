import ButtonComponent from './ButtonComponent'

export default class PrimaryButtonComponent extends ButtonComponent {
  constructor (id, label) {
    super(id, label, 'btn btn-primary')
  }
}
