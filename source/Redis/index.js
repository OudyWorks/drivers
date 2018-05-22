import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

let clients = {}

export default class Redis {
    static configure(options, name = 'default') {
        return new Promise((resolve, reject) => {
            clients[name] = redis.createClient(options)
            clients[name].on('connect', () => {
                resolve(clients[name])
            })
            clients[name].on('error', error => {
                reject(error)
            })
        })
    }
    static get client() {
        return this.getClient()
    }
    static getClient(name = 'default') {
        return clients[name]
    }
}