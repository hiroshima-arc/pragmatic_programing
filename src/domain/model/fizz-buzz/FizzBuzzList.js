export default class FizzBuzzList {
  constructor(list) {
    if (list.length > FizzBuzzList.MAX_COUNT)
      throw new Error(
        `FizzBuzzList can't generate over ${FizzBuzzList.MAX_COUNT} items`
      );

    this._value = list;
  }

  static get MAX_COUNT() {
    return 100;
  }

  get value() {
    return this._value;
  }

  toString() {
    return this._value;
  }

  add(value) {
    let result = this._value;
    result.push(value);
    return new FizzBuzzList(result);
  }
}
