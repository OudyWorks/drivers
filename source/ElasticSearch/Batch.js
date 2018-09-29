import Dataloader from 'dataloader'
import ElasticSearch from './'
import TTLMap from '@oudyworks/ttlmap'

const loaders = new TTLMap()

function getLoader(key, client, index, type, cache = false) {
    let _key = [key, client, index, type, cache].join(':')

    if (!loaders.get(_key)) {
        switch (key) {
            case 'load':
                loaders.set(_key, new Dataloader(keys => {
                    return ElasticSearch.getClient(client).mget({
                        index,
                        type,
                        body: {
                            ids: keys
                        }
                    }).then(({ docs }) => {
                        return docs.map(document => ({
                            id: document._id,
                            ...document._source
                        }))
                    })
                }, { cache }))
                break
            case 'loadAll':
                loaders.set(_key, new Dataloader(keys => {
                    return Promise.all(keys.map(query =>
                        ElasticSearch.getClient(client).search({
                            index,
                            type,
                            size: query.limit,
                            from: query.limit * (query.page - 1),
                            body: {
                                query: query.query
                            }
                        }).then(
                            result => {
                                return {
                                    list: result.hits.hits.map(document => ({
                                        id: document._id,
                                        ...document._source
                                    })),
                                    total: result.hits.total,
                                    page: query.page,
                                    limit: query.limit
                                }
                            }
                        )
                    ))
                }, { cache }))
                break
            case 'count':
                loaders.set(_key, new Dataloader(keys => {
                    return Promise.all(keys.map(query => ElasticSearch.getClient(client).count({
                        index,
                        type,
                        body: {
                            query
                        }
                    }).then(({ count }) => count)))
                }, { cache }))
                break
            case 'index':
                loaders.set(_key, new Dataloader(keys => {
                    return ElasticSearch.getClient(client).bulk({ body: keys.reduce((acc, val) => acc.concat(val), []) }).then(result => {
                        return result.items
                    })
                }, { cache: false }))
                break
        }
    }

    return loaders.get(_key)
}

export default class Batch {
    static load(id, client, index = 'default', type, cache = false) {
        return getLoader('load', client, index, type, cache).load(id)
    }
    static loadMany(ids, client, index = 'default', type, cache = false) {
        return getLoader('load', client, index, type, cache).loadMany(ids || [])
    }
    static clear(id, client, index = 'default', type, cache = false) {
        return getLoader('load', client, index, type, cache).clear(id)
    }
    static loadAll(query, client, index = 'default', type, cache = false) {
        return getLoader('loadAll', client, index, type, cache).load(query)
    }
    static count(query, client, index = 'default', type, cache = false) {
        return getLoader('count', client, index, type, cache).load(query)
    }
    static insert(object, client, index = 'default', type) {
        return getLoader('index', client, index, type).load([
            { index: { _index: index, _type: type } },
            object
        ]).then(item => item['index']._id)
    }
    static update(id, object, client, index = 'default', type) {
        return getLoader('index', client, index, type).load([
            { update: { _index: index, _type: type, _id: id } },
            { doc: object }
        ]).then(item => item['update']._id)
    }
}