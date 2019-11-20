import FizzBuzzCommand from './FizzBuzzCommand'

export default class FizzBuzzValueCommand extends FizzBuzzCommand {
  constructor (type) {
    super()
    this._type = type
  }

  execute (number) {
    return this._type.generate(number).value
  }
}
