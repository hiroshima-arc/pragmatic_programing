import FizzBuzzValueCommand from './FizzBuzzValueCommand';
import FizzBuzzListCommand from './FizzBuzzListCommand';
import FizzBuzzEntity from '../../../domain/model/fizz-buzz/FizzBuzzEntity';
import FizzBuzzRepository from '../../repository/FizzBuzzRepository';

export default class FizzBuzzService {
  constructor(type) {
    this._valueCommand = new FizzBuzzValueCommand(type);
    this._listCommand = new FizzBuzzListCommand(type);
    this._repository = new FizzBuzzRepository("fizzbuzz.db", "items");
  }

  generate(number) {
    return this._valueCommand.execute(number);
  }

  generateList(number) {
    return this._listCommand.execute(number);
  }

  save(list) {
    const record = new FizzBuzzEntity(list);
    return this._repository.save(record);
  }

  selectAll() {
    return this._repository.selectAll();
  }

  delete(id) {
    return this._repository.delete(id);
  }

  deleteAll() {
    return this._repository.destroy();
  }
}
