const Redis = require('./index'),
  DataLoader = require('dataloader'),
  TTLMap = require('@oudy/ttlmap'),
  batches = new TTLMap()

class Batch {
  static hget(key, field, client = 'default') {
    const _key = ['hget', key, client].join(':'),
      batch = batches.get(_key)

    if (!batch)
      batch = batches.set(
        _key,
        new DataLoader(
          keys => {
            return new Promise(
              resolve => {
                Redis.getClient(client).hmget(
                  key,
                  keys,
                  (error, values) => {
                    resolve(values || [null])
                  }
                )
              }
            )
          },
          {
            cache: false
          }
        )
      ).get(_key)

    return batch.load(field)
  }
  static hset(key, field, value, client = 'default') {

    let _key = ['hset', key, client].join(':'),
      batch = batches.get(_key)

    if (!batch)
      batch = batches.set(
        _key,
        new DataLoader(
          keys => {
            let values = []
            keys.forEach(
              ([field, value]) => values.push(field, value)
            )
            return new Promise(
              resolve => {
                Redis.getClient(client).hmset(
                  key,
                  values,
                  () =>
                    resolve(keys)
                )
              }
            )
          },
          {
            cache: false
          }
        )
      ).get(_key)

    return batch.load([field, value])

  }
  static sismember(key, value, client = 'default') {

    const _key = ['sismember', key, client].join(':'),
      batch = batches.get(_key)

    if (!batch)
      batch = batches.set(
        _key,
        new DataLoader(
          keys => new Promise(
            resolve => {
              Redis.getClient(client).multi(
                keys.map(
                  value => [
                    'sismember',
                    key,
                    value
                  ]
                )
              ).exec(
                (error, replies) =>
                  resolve(replies)
              )
            }
          ),
          {
            cache: false
          }
        )
      ).get(_key)

    return batch.load(value)
  }
}

// key member [member ...]
[
  'hdel',
  'sadd',
  'srem',
  'lpush',
  'rpush'
].forEach(
  command => {
    Batch[command] = function (key, value, client = 'default') {

      let _key = [command, key, client].join(':'),
        batch = batches.get(_key)

      if (!batch)
        batch = batches.set(
          _key,
          new DataLoader(
            keys =>
              new Promise(
                resolve => {
                  Redis.getClient(client)[command](
                    key,
                    keys,
                    () =>
                      resolve(keys)
                  )
                }
              ),
            {
              cache: false
            }
          )
        ).get(_key)

      return batch.load(value)

    }
  }
);

// key [count]
[
  'spop',
  'srandmember'
].forEach(
  command => {
    Batch[command] = function (key, count = 1, client = 'default') {

      let _key = [command, key, client].join(':'),
        batch = batches.get(_key)

      if (!batch)
        batch = batches.set(
          _key,
          new DataLoader(
            counts =>
              new Promise(
                resolve => {
                  Redis.getClient(client)[command](
                    key,
                    counts.reduce((a, b) => a + b),
                    (error, values) => {
                      if (counts.length == values.length)
                        resolve(values)
                      else {
                        let _values = []
                        counts.forEach(
                          count => {
                            _values.push(count == 1 ? values.shift() : values.splice(0, count))
                          }
                        )
                        resolve(_values)
                      }
                    }
                  )
                }
              ),
            {
              cache: false
            }
          )
        ).get(_key)

      return batch.load(count)

    }
  }
)

module.exports = Batch