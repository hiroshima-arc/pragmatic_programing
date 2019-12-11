import ButtonComponent from './ButtonComponent'

export default class DangerMiniButtonComponent extends ButtonComponent {
  constructor (id, label) {
    super(
      id,
      label,
      'btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light'
    )
  }
}
