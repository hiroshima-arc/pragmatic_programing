/* eslint-disable new-cap */
require('fake-indexeddb/auto')
const chai = require('chai')
const assert = chai.assert
const fizzBuzzRepository = require('../../src/application/repository/FizzBuzzRepository')
const fizzBuzzEntity = require('../../src/domain/model/fizz-buzz/FizzBuzzEntity')

describe('FizzBuzzRepositoryTest', () => {
  let repository
  beforeEach(() => {
    repository = new fizzBuzzRepository.default('fizzbuzz.test.db', 'items')
  })

  it('値を保存する', () => {
    const data = { id: 1, list: [1, 2, 'Fizz', 4, 'Buzz'] }
    const entity = new fizzBuzzEntity.default(data.list, data.id)
    assert(repository.save(entity))
  })

  it('値を取得する', () => {
    const data = { id: 2, list: [1, 2, 'Fizz', 4, 'Buzz'] }
    const entity = new fizzBuzzEntity.default(data.list, data.id)
    return repository.save(entity).then(() => {
      const keyValue = 2
      return repository.find(keyValue).then(data => {
        assert.equal('Fizz', data.list[2])
      })
    })
  })

  xit('すべての値を取得する', () => {
    const aList = [
      { id: 3, list: [1, 2, 'Fizz', 4, 'Buzz'] },
      { id: 4, list: [1, 2, 'Fizz', 4, 'Buzz'] },
      { id: 5, list: [1, 2, 'Fizz', 4, 'Buzz'] }
    ]
    const entities = aList.map(data => new fizzBuzzEntity.default(data.list, data.id))
    return repository.saveBatch(entities).then(() => {
      return repository.selectAll().then(data => {
        assert.equal(3, data.length)
      })
    })
  })

  it('値を削除する', () => {
    const data = { id: 6, list: [1, 2, 'Fizz', 4, 'Buzz'] }
    const entity = new fizzBuzzEntity.default(data.list, data.id)
    return repository.save(entity).then(() => {
      const keyValue = 6
      return repository.delete(keyValue).then(() => {
        return repository.find(keyValue).catch(error => {
          assert.equal('id:6 not found', error)
        })
      })
    })
  })
})
