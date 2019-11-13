import redis from 'redis'
import bluebird from 'bluebird'
import Driver from '@oudy/drivers'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export class RedisDriver extends Driver<redis.RedisClient> {
    /**
     * set a configuration of Redis
     * @function
     * @param {string} name - name of the configuration
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<redis.RedisClient>} client
     */
    configureWithName(
        name: string,
        options: redis.ClientOpts = {}
    ): Promise<redis.RedisClient> {
        const promise: Promise<redis.RedisClient> = new Promise(
            (resolve, reject) => {
                const connection = redis.createClient(options)
                connection.on(
                    'connect',
                    () => {
                        this.clients.set(name, connection)
                        resolve(connection)
                    }
                )
                connection.on(
                    'error',
                    error =>
                        reject(error)
                )
            }
        )
        this.promises.push(promise)
        return promise
    }
    /**
     * set default configuration of Redis
     * @function
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<Rredis.edisClient>} client
     */
    configure(
        options: redis.ClientOpts = {}
    ) {
        return this.configureWithName('default', options)
    }
}

export * from 'redis'
export default new RedisDriver()