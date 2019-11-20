import FizzBuzzType from './FizzBuzzType'
import FizzBuzzValue from '../../model/fizz-buzz/FizzBuzzValue'

export default class FizzBuzzType03 extends FizzBuzzType {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  generate (number) {
    const isFizz = this.isFizz(number)
    const isBuzz = this.isBuzz(number)

    if (isFizz && isBuzz) return new FizzBuzzValue(number, this.FIZZ + this.BUZZ)
    return new FizzBuzzValue(number, number)
  }
}
