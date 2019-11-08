import {
  ClientOpts,
  RedisClient,
  default as redis
} from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const clients = new Map()

class Redis {

  /**
   * set a configuration of Redis
   * @function
   * @param {string} name - name of the configuration
   * @param {ClientOpts} [options] - Options
   * @returns {Promise<RedisClient>} client
   */
  static configureWithName(
    name,
    options = {}
  ) {
    const connection = redis.createClient(options)
    return new Promise(
      (resolve, reject) => {
        connection.on(
          'connect',
          () => {
            clients.set(name, connection)
            resolve()
          }
        )
        connection.on(
          'error',
          error =>
            reject(error)
        )
      }
    )
  }
  /**
   * set default configuration of Redis
   * @function
   * @param {ClientOpts} [options] - Options
   * @returns {Promise<RedisClient>} client
   */
  static configure(
    options = {}
  ) {
    return this.configureWithName('default', options)
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {RedisClient}
   */
  static getClient(name) {
    return clients.get(name)
  }
  /**
   * get default client
   * @returns {RedisClient}
   */
  static get client() {
    return this.getClient('default')
  }
  /**
   * get all clients
   * @returns {Map<string,RedisClient>}
   */
  static get clients() {
    return clients
  }
}

export * from 'redis'

export default Redis