import FizzBuzzValueCommand from './FizzBuzzValueCommand'
import FizzBuzzListCommand from './FizzBuzzListCommand'
import FizzBuzzEntity from '../../../domain/model/fizz-buzz/FizzBuzzEntity'
import FizzBuzzRepository from '../../repository/FizzBuzzRepository'
import FizzBuzzTypeEnum from '../../../domain/type/fizz-buzz/FizzBuzzTypeEnum'
import FizzBuzzList from '../../../domain/model/fizz-buzz/FizzBuzzList'

export default class FizzBuzzService {
  constructor (type) {
    this._valueCommand = new FizzBuzzValueCommand(type)
    this._listCommand = new FizzBuzzListCommand(type)
    this._repository = new FizzBuzzRepository('fizzbuzz.db', 'items')
  }

  static get Type01 () {
    return FizzBuzzTypeEnum.Type01
  }

  static get Type02 () {
    return FizzBuzzTypeEnum.Type02
  }

  static get Type03 () {
    return FizzBuzzTypeEnum.Type03
  }

  static get MAX_COUNT () {
    return FizzBuzzList.MAX_COUNT
  }

  static valueOf (value) {
    return FizzBuzzTypeEnum.valuOf(value)
  }

  generate (number) {
    return this._valueCommand.execute(number)
  }

  generateList (number) {
    return this._listCommand.execute(number)
  }

  save (list) {
    const record = new FizzBuzzEntity(list)
    return this._repository.save(record)
  }

  selectAll () {
    return this._repository.selectAll()
  }

  delete (id) {
    return this._repository.delete(id)
  }

  deleteAll () {
    return this._repository.destroy()
  }
}
