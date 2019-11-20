import FizzBuzzType from './FizzBuzzType'
import FizzBuzzValue from '../../model/fizz-buzz/FizzBuzzValue'

export default class FizzBuzzType01 extends FizzBuzzType {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  generate (number) {
    const isFizz = this.isFizz(number)
    const isBuzz = this.isBuzz(number)

    if (isFizz && isBuzz) return new FizzBuzzValue(number, this.FIZZ + this.BUZZ)
    if (isFizz) return new FizzBuzzValue(number, this.FIZZ)
    if (isBuzz) return new FizzBuzzValue(number, this.BUZZ)
    return new FizzBuzzValue(number, number)
  }
}
