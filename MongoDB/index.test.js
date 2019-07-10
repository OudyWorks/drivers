import MongoDB from './index'
import MongoDBBatch from './batch'

const COLLECTION = 'clients',
  COUNT = 5000,
  IDS = new Array(COUNT).fill(undefined).map(
    (u, i) =>
      i + 1
  )

beforeAll(async () => {
  await MongoDB.configure(
    global.__MONGO_DB_NAME__,
    global.__MONGO_URI__
  )
})

describe(
  'insert',
  () => {
    it(
      'insert without batch',
      async () => {
        await Promise.all(
          IDS.map(
            _id =>
              MongoDB.client
                .collection(COLLECTION)
                .insertOne({
                  _id,
                  name: `client ${_id}`
                })
          )
        )
      }
    )
    it(
      'insert with batch',
      async () => {
        await Promise.all(
          IDS.map(_id => _id + COUNT).map(
            _id =>
              MongoDBBatch.insert(
                {
                  _id,
                  name: `client ${_id}`
                },
                COLLECTION
              )
          )
        )
      }
    )
  }
)

describe(
  'load',
  () => {
    it(
      'load without batch',
      async () => {
        await Promise.all(
          IDS.map(
            _id =>
              MongoDB.client
                .collection(COLLECTION)
                .findOne({ _id })
          )
        )
      }
    )
    it(
      'load with batch',
      async () => {
        await Promise.all(
          IDS.map(
            _id =>
              MongoDBBatch.load(_id, COLLECTION)
          )
        )
      }
    )
  }
)

describe(
  'update',
  () => {
    it(
      'update without batch',
      async () => {
        await Promise.all(
          IDS.map(
            _id =>
              MongoDB.client
                .collection(COLLECTION)
                .updateOne(
                  {
                    _id
                  },
                  {
                    $set: {
                      name: `client ${_id + 2}`
                    }
                  }
                )
          )
        )
      }
    )
    it(
      'update with batch',
      async () => {
        await Promise.all(
          IDS.map(_id => _id + COUNT).map(
            _id =>
              MongoDBBatch.update(
                _id,
                {
                  $set: {
                    name: `client ${_id + 3}`
                  }
                },
                COLLECTION
              )
          )
        )
      }
    )
  }
)