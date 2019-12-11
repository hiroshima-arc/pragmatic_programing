const chai = require('chai')
const assert = chai.assert
const Money = require('../../src/domain/model/money/Money').default
const Bank = require('../../src/domain/model/money/Bank').default
const Sum = require('../../src/domain/model/money/Sum').default

describe('MoneyTest', () => {
  it('Multiplication', () => {
    const five = Money.dollar(5)
    assert.isOk(Money.dollar(10).equals(five.times(2)))
    assert.isOk(Money.dollar(15).equals(five.times(3)))
  })

  it('Equality', () => {
    assert.isOk(Money.dollar(5).equals(Money.dollar(5)))
    assert.isNotOk(Money.dollar(5).equals(Money.dollar(6)))
    assert.isNotOk(Money.franc(5).equals(Money.dollar(5)))
  })

  it('Currency', () => {
    assert.equal('USD', Money.dollar(1).currency())
    assert.equal('CHF', Money.franc(1).currency())
  })

  it('SimpleAddition', () => {
    const five = Money.dollar(5)
    const sum = five.plus(five)
    const bank = new Bank()
    const reduced = bank.reduce(sum, 'USD')
    assert.isOk(Money.dollar(10).equals(reduced))
  })

  it('PlusReturnsSum', () => {
    const five = Money.dollar(5)
    const result = five.plus(five)
    const sum = result
    assert.isOk(five.equals(sum.augend))
    assert.isOk(five.equals(sum.addend))
  })

  it('ReduceSum', () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4))
    const bank = new Bank()
    const result = bank.reduce(sum, 'USD')
    assert.isOk(Money.dollar(7).equals(result))
  })

  it('ReduceMoney', () => {
    const bank = new Bank()
    const result = bank.reduce(Money.dollar(1), 'USD')
    assert.isOk(Money.dollar(1).equals(result))
  })

  it('ReduceMoneyDifferentCurrency()', () => {
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result = bank.reduce(Money.franc(2), 'USD')
    assert.isOk(Money.dollar(1).equals(result))
  })

  it('MixedAddition', () => {
    const fiveBucks = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD')
    assert.isOk(Money.dollar(10).equals(result))
  })

  it('SumPlusMoney', () => {
    const fiveBucks = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks)
    const result = bank.reduce(sum, 'USD')
    assert.isOk(Money.dollar(15).equals(result))
  })

  it('SumTimes', () => {
    const fiveBucks = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum = new Sum(fiveBucks, tenFrancs).times(2)
    const result = bank.reduce(sum, 'USD')
    assert.isOk(Money.dollar(20).equals(result))
  })
})
