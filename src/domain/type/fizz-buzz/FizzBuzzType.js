export default class FizzBuzzType {
  constructor () {
    this.FIZZ = 'Fizz'
    this.BUZZ = 'Buzz'
  }

  generate (number) {}

  isFizz (number) {
    return number % 3 === 0
  }

  isBuzz (number) {
    return number % 5 === 0
  }
}
