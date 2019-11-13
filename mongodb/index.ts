import * as mongodb from 'mongodb'
import Driver from '@oudy/drivers'

export class MongoDBDriver extends Driver<mongodb.Db> {
    /**
     * set a configuration of MongoDB
     * @function
     * @param {string} name - name of the configuration
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    configureWithName(
        name: string,
        database: string = 'test',
        url: string = 'mongodb://localhost:27017',
        options: mongodb.MongoClientOptions = {}
    ): Promise<mongodb.Db> {
        options.useNewUrlParser = true
        const promise: Promise<mongodb.Db> = new Promise(
            (resolve, reject) => {
                mongodb.MongoClient.connect(url, options).then(
                    connection =>
                        connection.db(database)
                ).then(
                    database => {
                        this.clients.set(name, database)
                        return database
                    }
                ).then(resolve).catch(reject)
            }
        )
        this.promises.push(promise)
        return promise
    }
    /**
     * set default configuration of MongoDB
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    configure(
        database: string = 'test',
        url: string = 'mongodb://localhost:27017',
        options: mongodb.MongoClientOptions = {}
    ): Promise<mongodb.Db> {
        return this.configureWithName('default', database, url, options)
    }
}

export * from 'mongodb'
export const IDRegex = /^[0-9a-fA-F]{24}$/
export default new MongoDBDriver()