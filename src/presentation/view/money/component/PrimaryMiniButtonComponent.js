import ButtonComponent from './ButtonComponent'

export default class PrimaryMiniButtonComponent extends ButtonComponent {
  constructor (id, label) {
    super(
      id,
      label,
      'btn btn-primary btn-rounded btn-sm my-0 waves-effect waves-light'
    )
  }
}
