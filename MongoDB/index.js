import {
  MongoClient,
  Db,
  MongoClientOptions
} from 'mongodb'

const connections = new Map(),
  databases = new Map(),
  IDRegex = /^[0-9a-fA-F]{24}$/

/**
 * @class MongoDB
 */
class MongoDB {
  /**
   * set a configuration of MongoDB
   * @function
   * @param {string} name - name of the configuration
   * @param {string} database - database name
   * @param {string} [url] - url of the server
   * @param {MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html)
   * @returns {Promise<Db>} database
   */
  static configureFor(name = 'default', database = 'test', url = 'mongodb://localhost:27017', options = {}) {
    options.useNewUrlParser = true
    return MongoClient.connect(url, options).then(
      connection => {
        connections.set(url, connection)
        return connection.db(database)
      }
    ).then(
      database => {
        databases.set(name, database)
        return database
      }
    )
  }
  /**
   * set default configuration of MongoDB
   * @param {string} database - database name
   * @param {string} [url] - url of the server
   * @param {MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html)
   * @returns {Promise<Db>} database
   * 
   * @example
   * 
   * import MongoDB from '@oudy/mongodb'
   * 
   * MongoDB.configure().then(
   *  database => {
   *    const users = database.collection('users').find().toArray()
   *  }
   * )
   * 
   */
  static configure(database = 'test', url = 'mongodb://localhost:27017', options = {}) {
    return this.configureFor('default', database, url, options)
  }
  /**
   * get a configuration
   * @param {string} name 
   * @returns {MongoClient}
   */
  static getConnection(url = 'mongodb://localhost:27017') {
    return connections.get(url)
  }
  /**
   * get default connection
   * @returns {MongoClient}
   */
  static get connection() {
    return this.getConnection()
  }
  /**
   * get a configuration
   * @param {string} name 
   * @returns {Db}
   */
  static getDatabase(name = 'default') {
    return connections.get(name)
  }
  /**
   * get default database
   * @returns {Db}
   */
  static get database() {
    return this.getConnection()
  }
}

export {
  IDRegex,
  connections,
  databases
}
export * from 'mongodb'
export default MongoDB