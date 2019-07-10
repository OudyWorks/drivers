import {
  IDRegex,
  ObjectID,
  default as MongoDB
} from './index'
import Dataloader from 'dataloader'

const batches = new Map()

class MongoDBBatch {
  static load(id, collection, database = 'default') {
    let key = ['load', database, collection].join(':'),
      batch = batches.get(key)
    if (!batch) {
      batches.set(
        key,
        batch = new Dataloader(
          keys => {
            return MongoDB.getClient(database).collection(collection).find(
              {
                _id: {
                  $in: keys.map(
                    id =>
                      IDRegex.test(id) ? ObjectID(id) : id
                  )
                }
              }
            ).toArray().then(
              documents =>
                keys.map(
                  _id =>
                    documents.find(
                      document =>
                        document._id.valueOf() == _id.valueOf()
                    )
                )
            )
          },
          {
            cache: false
          }
        )
      )
    }
    return batch.load(id).then(
      document => {
        batch.clear(id)
        return document
      }
    ).catch(
      error => {
        batch.clear(id)
        return Promise.reject(error)
      }
    )
  }
  static loadMany(ids, collection, database = 'default') {
    return Promise.all(
      ids.map(
        id =>
          this.load(id, collection, database)
      )
    )
  }
  static insert(object, collection, database = 'default') {
    let key = ['insert', database, collection].join(':'),
      batch = batches.get(key)
    if (!batch) {
      batches.set(
        key,
        batch = new Dataloader(
          documents => {
            const bulk = MongoDB.getClient(database).collection(collection).initializeOrderedBulkOp()
            documents.forEach(
              object =>
                bulk.insert(object)
            )
            return bulk.execute().then(
              response => {
                return response.getInsertedIds().map(
                  id => id._id.valueOf()
                )
              }
            )
          },
          {
            cache: false
          }
        )
      )
    }
    return batch.load(object)
  }
  static update(id, payload, collection, database = 'default') {
    let key = ['update', database, collection].join(':'),
      batch = batches.get(key)
    if (!batch) {
      batches.set(
        key,
        batch = new Dataloader(
          payloads => {
            const bulk = MongoDB.getClient(database).collection(collection).initializeOrderedBulkOp()
            payloads.forEach(
              ({ id, payload }) =>
                bulk.find({
                  _id: IDRegex.test(id) ? ObjectID(id) : id
                }).updateOne(payload)
            )
            return bulk.execute().then(
              response =>
                payloads.map(a => false)
            )
          },
          {
            cache: false
          }
        )
      )
    }
    return batch.load({ id, payload })
  }
  static upsert(id, payload, collection, database = 'default') {
    let key = ['upsert', database, collection].join(':'),
      batch = batches.get(key)
    if (!batch) {
      batches.set(
        key,
        batch = new Dataloader(
          payloads => {
            const bulk = MongoDB.getClient(database).collection(collection).initializeOrderedBulkOp()
            payloads.forEach(
              ({ id, payload }) =>
                bulk.find({
                  _id: IDRegex.test(id) ? ObjectID(id) : id
                }).upsert().replaceOne(payload)
            )
            return bulk.execute().then(
              response => {
                const ids = response.getUpsertedIds().map(upid => upid._id.toHexString ? upid._id.toHexString() : upid._id)
                return payloads.map(({ id }) => ids.includes(id) && id)
              }
            )
          },
          {
            cache: false
          }
        )
      )
    }
    return batch.load({ id, payload })
  }
}

export default MongoDBBatch