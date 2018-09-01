import MongoDB from './index'
import DataLoader from 'dataloader'
import TTLMap from '@oudyworks/ttlmap'

const loaders = new TTLMap()

const getLoader = async (key, collection, database = 'default', cache = false) => {

    key = [key, database, collection, cache].join(':')

    if(!loaders.get(key))
        switch(key) {

            case 'load':
                loaders.set(
                    key,
                    new DataLoader(
                        async keys => {
                            let result = {},
                            cursor = MongoDB.getDatabase(database).collection(collection).find({
                                _id: {
                                    $in: keys.map(
                                        key =>
                                            MongoDB.IDRegex.test(key) ? MongoDB.ObjectID(key) : key
                                    )
                                }
                            }).addCursorFlag('noCursorTimeout', true)
                            await cursor.toArray().then(
                                documents => {
                                    documents.forEach(
                                        (document, i) =>
                                            result[`${document._id}`] = document
                                    )
                                }
                            )
                            cursor.close()
                            return keys.map(
                                (key, i) =>
                                    result[key] || null
                            )
                        },
                        {
                            cache
                        }
                    )
                )
                break

            case 'loadAll':
                loaders.set(
                    key,
                    new DataLoader(
                        keys => {
                            return Promise.all(
                                keys.map(
                                    async key => {
                                        let {
                                                query = {},
                                                page = 1,
                                                limit = 20
                                            } = key,
                                            cursor = MongoDB.getDatabase(database).collection(collection).find(query),//.addCursorFlag('noCursorTimeout', true),
                                            $return = {
                                                list: await cursor.limit(limit).skip(limit * (page - 1)).toArray(),
                                                total: await cursor.count(),
                                                page,
                                                limit
                                            }
                                        return $return
                                    }
                                )
                            )
                        },
                        {
                            cache
                        }
                    )
                )
                break

            case 'count':
                loaders.set(
                    key,
                    new DataLoader(
                        keys => {
                            return Promise.all(
                                keys.map(
                                    async query =>
                                        MongoDB.getDatabase(database).collection(collection).countDocuments(query)
                                )
                            )
                        },
                        {
                            cache
                        }
                    )
                )
                break

                case 'insert':

                    loaders.set(
                        key,
                        new DataLoader(
                            async keys => {
                                let bulk = MongoDB.getDatabase(database).collection(collection).initializeUnorderedBulkOp()
                                keys.forEach(
                                    object =>
                                        bulk.insert(object)
                                )
                                return (await bulk.execute()).getInsertedIds().map(id => id._id)
                            },
                            {
                                cache: false
                            }
                        )
                    ) 

                    break

                case 'update':

                    loaders.set(
                        key,
                        new DataLoader(
                            async keys => {
                                let bulk = MongoDB.getDatabase(database).collection(collection).initializeUnorderedBulkOp()
                                keys.forEach(
                                    ([id, payload]) => {
    
                                        if(!Array.isArray(payload))
                                            payload = [payload]
    
                                        payload.filter(
                                            payload =>
                                                Object.values(payload).filter(value => value).length
                                        ).forEach(
                                            payload =>
                                                bulk.find({
                                                    _id: MongoDB.IDRegex.test(id) ? MongoDB.ObjectID(id) : id
                                                }).updateOne(payload)
                                        )
    
                                    }
                                )
                                await bulk.execute()
                                return keys.map(a => true)
                            },
                            {
                                cache: false
                            }
                        )
                    )

                    break

        }

    return loaders.get(key)
}

export default class Batch {
    static load(id, collection, database = 'default', cache = false) {

        return getLoader('load', collection, database, cache).then(
            loader =>
                loader.load(`${id}`)
        )

    }
    static loadMany(ids, collection, database = 'default', cache = false) {

        return getLoader('load', collection, database, cache).then(
            loader =>
                loader.loadMany(ids || [])
        )

    }
    static clear(id, collection, database = 'default', cache = false) {

        return getLoader('load', collection, database, cache).then(
            loader =>
                loader.clear(`${id}`)
        )

    }
    static loadAll(query, collection, database = 'default', cache = false) {

        return getLoader('loadAll', collection, database, cache).then(
            loader =>
                loader.load(query || {})
        )

    }
    static count(query, collection, database = 'default', cache = false) {

        return getLoader('count', collection, database, cache).then(
            loader =>
                loader.load(query || {})
        )

    }
    static insert(object, collection, database = 'default') {

        return getLoader('insert', collection, database).then(
            loader =>
                loader.load(object)
        )

    }
    static update(id, payload, collection, database = 'default') {

        return getLoader('update', collection, database).then(
            loader =>
                loader.load([id, payload])
        )

    }
}