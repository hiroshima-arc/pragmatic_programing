import FizzBuzzCommand from './FizzBuzzCommand'
import FizzBuzzList from '../../../domain/model/fizz-buzz/FizzBuzzList'

export default class FizzBuzzListCommand extends FizzBuzzCommand {
  constructor (type) {
    super()
    this._type = type
    this._list = new FizzBuzzList([])
  }

  execute (number) {
    // 配列は0から始まるので1を足す
    [...Array(number + 1).keys()]
      .slice(1)
      .forEach(i => (this._list = this._list.add(this._type.generate(i))))
    return this._list.value
  }
}
