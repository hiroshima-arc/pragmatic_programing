/* eslint-disable new-cap */
const chai = require('chai')
const assert = chai.assert
const service = require('../../src/application/service/fizz-buzz/FizzBuzzService')
const type = require('../../src/domain/type/fizz-buzz/FizzBuzzTypeEnum')

describe('FizzBuzzTest', () => {
  describe('タイプ1の場合', () => {
    let list100
    let service1
    beforeEach(() => {
      service1 = new service.default(type.default.Type01)
      list100 = service1.generateList(100)
    })

    it('1から100までをプリントする、ただし3で割り切れる場合はFizz5で割り切れる場合はBuzz3と5で割り切れる場合はFizzBuzzをプリントする', () => {
      const data = {
        0: 1,
        1: 2,
        2: 'Fizz',
        3: 4,
        4: 'Buzz',
        14: 'FizzBuzz',
        99: 'Buzz'
      }
      Object.keys(data).forEach(k => {
        assert.equal(data[k], list100[k])
      })
    })

    describe('3の倍数の場合', () => {
      it('3で割り切れる場合はFizzをプリントする', () => {
        assert.equal('Fizz', service1.generate(3))
      })
    })

    describe('5の倍数の場合', () => {
      it('5で割り切れる場合はBuzzをプリントする', () => {
        assert.equal('Buzz', service1.generate(5))
      })

      it('15で割り切れる場合はFizzBuzzをプリントする', () => {
        assert.equal('FizzBuzz', service1.generate(15))
      })
    })

    describe('その他の場合', () => {
      it('1を渡したら1を返す', () => {
        assert.equal(1, service1.generate(1))
      })

      it('2を渡したら2を返す', () => {
        assert.equal(2, service1.generate(2))
      })

      it('Fizzの個数は27個', () => {
        assert.equal(27, list100.filter(i => i.value === 'Fizz').length)
      })

      it('Buzzの個数は14個', () => {
        assert.equal(14, list100.filter(i => i.value === 'Buzz').length)
      })

      it('FizzBuzzの個数は6個', () => {
        assert.equal(6, list100.filter(i => i.value === 'FizzBuzz').length)
      })

      it('数字の合計は2632', () => {
        assert.equal(
          2632,
          list100
            .filter(i => Number.isInteger(i.value))
            .reduce((acc, value) => acc + value)
        )
      })
    })

    describe('例外ケース', () => {
      let command1
      let listCommand1
      it('値は正の値のみ許可する', () => {
        chai.expect(() => command1.execute(-1)).to.throw()
      })
      it('100より多い数を許可しない', () => {
        chai.expect(() => listCommand1.execute(101)).to.throw()
      })
    })
  })

  describe('タイプ2の場合', () => {
    let service2
    beforeEach(() => {
      service2 = new service.default(type.default.Type02)
    })

    it('3で割り切れる場合は3をプリントする', () => {
      assert.equal(3, service2.generate(3))
    })

    it('5で割り切れる場合は5をプリントする', () => {
      assert.equal(5, service2.generate(5))
    })

    it('15で割り切れる場合は15をプリントする', () => {
      assert.equal(15, service2.generate(15))
    })

    it('リストは数字のみ', () => {
      const data = {
        2: 3,
        4: 5,
        14: 15
      }
      Object.keys(data).forEach(k => {
        assert.equal(data[k], service2.generateList(15)[k])
      })
    })
  })

  describe('タイプ3の場合', () => {
    let service3
    beforeEach(() => {
      service3 = new service.default(type.default.Type03)
    })

    it('3で割り切れる場合は3をプリントする', () => {
      assert.equal(3, service3.generate(3))
    })

    it('5で割り切れる場合は5をプリントする', () => {
      assert.equal(5, service3.generate(5))
    })

    it('15で割り切れる場合はFizzBuzzをプリントする', () => {
      assert.equal('FizzBuzz', service3.generate(15))
    })

    it('リストはFizzBuzzのケースのみ', () => {
      const data = {
        2: 3,
        4: 5,
        14: 'FizzBuzz'
      }
      Object.keys(data).forEach(k => {
        assert.equal(data[k], service3.generateList(15)[k])
      })
    })
  })
})
