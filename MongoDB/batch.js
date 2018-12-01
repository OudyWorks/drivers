const {
  IDRegex, ObjectID
} = MongoDB = require('./index'),
  sift = require('sift').default,
  batches = new Map(),
  resolvedPromise = Promise.resolve(),
  dispatch = batch => {
    process.nextTick(
      () => {
        const queue = batch.queue
        batch.queue = []
        const keys = queue.map(({ key }) => key)
        MongoDB.getConnection(batch.database).collection(batch.collection).find(
          {
            _id: {
              $in: keys
            }
          }
        ).toArray().then(
          documents => {
            queue.forEach(
              ({ key, resolve }) =>
                resolve(
                  sift(
                    {
                      _id: key
                    },
                    documents
                  ).shift()
                )
            )
          }
        ).catch(
          error =>
            queue.forEach(
              ({ reject }) =>
                reject(
                  error
                )
            )
        )
      }
    )
  }
getBatch = (collection, database) => {
  const key = [collection, database].join(':')
  return batches.get(key) || batches.set(
    key,
    {
      collection,
      database,
      cache: new Map(),
      queue: [],
      load(key) {
        let promise = this.cache.get(key)
        if (!promise) {
          promise = new Promise(
            (resolve, reject) => {
              this.queue.push({ key, resolve, reject })
            }
          ).then(
            () =>
              this.cache.delete(key)
          )
          this.cache.set(key, promise)
          if (this.queue.length === 1)
            dispatch(this)
        }
        return promise
      }
    }
  ).get(key)
}

module.exports = class MongoDBBatch {
  static load(id, collection, database = 'default') {
    return getBatch(collection, database).load(IDRegex.test(id) ? ObjectID(id) : id)
  }
  static loadMany(ids, collection, database = 'default') {
    return Promise.all(
      ids.map(
        id =>
          this.load(id, collection, database)
      )
    )
  }
}