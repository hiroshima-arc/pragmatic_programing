import FizzBuzzType01 from './FizzBuzzType01';
import FizzBuzzType02 from './FizzBuzzType02';
import FizzBuzzType03 from './FizzBuzzType03';

export default class FizzBuzzTypeEnum {
  static get Type01() {
    return new FizzBuzzType01();
  }
  static get Type02() {
    return new FizzBuzzType02();
  }
  static get Type03() {
    return new FizzBuzzType03();
  }

  static valuOf(value) {
    switch (value) {
      case "one":
        return FizzBuzzTypeEnum.Type01;
      case "two":
        return FizzBuzzTypeEnum.Type02;
      case "three":
        return FizzBuzzTypeEnum.Type03;
      default:
        throw Error(`${value} is not defined enum type`);
    }
  }
}
