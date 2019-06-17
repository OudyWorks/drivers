import {
  extend
} from '@oudy/drivers/interface'
import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

class Redis extends extend(class {}) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [options] = args,

      connection = redis.createClient(options)

    return new Promise(
      (resolve, reject) => {
        connection.on(
          'connect',
          () =>
            resolve()
        )
        connection.on(
          'error',
          error =>
            reject(error)
        )
      }
    ).then(
      () =>
        super.configureFor(name, connection)
    )
  }
}

export * from 'redis'

export default Redis