import FizzBuzzType from './FizzBuzzType';
import FizzBuzzValue from '../../model/fizz-buzz/FizzBuzzValue';

export default class FizzBuzzType02 extends FizzBuzzType {
  constructor() {
    super();
  }

  generate(number) {
    return new FizzBuzzValue(number, number);
  }
}
