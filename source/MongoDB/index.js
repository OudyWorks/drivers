import {
    MongoClient,
    ObjectID
} from 'mongodb'

let connections = {},
    databases = {}

export default class MongoDB {
    static configure(url, database, options = {}, name = 'default') {
        return new Promise((resolve, reject) => {
            if(connections[url])
                resolve(connections[url])
            else
                MongoClient.connect(url, options, (error, connection) => {
                    if (error)
                        reject(error)
                    else {
                        connections[url] = connection
                        resolve(connection)
                    }
                })
        }).then(
            connection =>
                databases[name] || (databases[name] = connection.db(database))
        )
    }
    static getDatabase(name = 'default') {
        return databases[name]
    }
    static get database() {
        return this.getDatabase()
    }
    static get ObjectID() {
        return ObjectID
    }
    static get IDRegex() {
        return /^[0-9a-fA-F]{24}$/
    }
}