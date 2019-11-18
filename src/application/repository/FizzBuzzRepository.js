import IndexedDbRepository from '../../infrastructure/IndexedDbRepository';
import FizzBuzzEntity from '../../domain/model/FizzBuzzEntity';

export default class FizzBuzzRepository extends IndexedDbRepository {
  constructor(dbName, storeName) {
    super(dbName, storeName);
  }

  save(data) {
    return super.put({ id: data.id, list: data.list });
  }

  saveBatch(entities) {
    const aList = entities.map(entity => {
      return { id: entity.id, list: entity.list };
    });
    return super.add(aList);
  }

  find(keyValue) {
    return super.get(keyValue).then(data => {
      return new Promise((resolve, reject) => {
        const entity = new FizzBuzzEntity(data.list, data.id);
        resolve(entity);
      });
    });
  }

  selectAll() {
    return super.openCursor().then(aList => {
      return new Promise((resolve, reject) => {
        const entities = aList.map(
          data => new FizzBuzzEntity(data.list, data.id)
        );
        resolve(entities);
      });
    });
  }

  delete(keyValue) {
    return super.delete(keyValue);
  }

  destroy() {
    return super.deleteDatabase();
  }
}
