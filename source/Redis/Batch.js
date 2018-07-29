import Redis from './index'
import DataLoader from 'dataloader'

let batchs = {}

class Batch {
    static hget(key, field, client = 'default') {
        if(!batchs.hget)
            batchs.hget = {}
        if(!batchs.hget[client])
            batchs.hget[client] = {}
        if(!batchs.hget[client][key])
            batchs.hget[client][key] = new DataLoader(
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
        return batchs.hget[client][key].load(field)
    }
    static hset(key, field, value, client = 'default') {
        if(!batchs.hset)
            batchs.hset = {}
        if(!batchs.hset[client])
            batchs.hset[client] = {}
        if(!batchs.hset[client][key])
            batchs.hset[client][key] = new DataLoader(
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
        return batchs.hset[client][key].load([field, value])
    }
    static sismember(key, value, client = 'default') {
        if(!batchs.sismember)
            batchs.sismember = {}
        if(!batchs.sismember[client])
            batchs.sismember[client] = {}
        if(!batchs.sismember[client][key])
            batchs.sismember[client][key] = new DataLoader(
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
        return batchs.sismember[client][key].load(value)
    }
}

// commands without reply
[
    'hdel',
    'sadd',
    'srem',
    'lpush',
    'rpush'
].forEach(
    command => {
        Batch[command] = function (key, value, client = 'default') {

            if(!batchs[command])
                batchs[command] = {}

            if(!batchs[command][client])
                batchs[command][client] = {}

            if(!batchs[command][client][key])
                batchs[command][client][key] = new DataLoader(
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

            return batchs[command][client][key].load(value)

        }
    }
);

// commands gets with key and count
[
    'spop',
    'srandmember'
].forEach(
    command => {
        Batch[command] = function (key, client = 'default') {

            if(!batchs[command])
                batchs[command] = {}

            if(!batchs[command][client])
                batchs[command][client] = {}

            if(!batchs[command][client][key])
                batchs[command][client][key] = new DataLoader(
                    keys =>
                        new Promise(
                            resolve => {
                                Redis.getClient(client)[command](
                                    key,
                                    keys.length,
                                    values =>
                                        resolve(values)
                                )
                            }
                        ),
                    {
                        cache: false
                    }
                )

            return batchs[command][client][key].load(value)

        }
    }
)

export default Batch