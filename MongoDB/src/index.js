import {
  MongoClient,
  Db,
  MongoClientOptions
} from 'mongodb'

const clients = new Map(),
  IDRegex = /^[0-9a-fA-F]{24}$/

/**
 * @class MongoDB
 */
class MongoDB {
  /**
   * set a configuration of MongoDB
   * @function
   * @param {string} name - name of the configuration
   * @param {string} [database] - database name
   * @param {string} [url] - url of the server
   * @param {MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html)
   * @returns {Promise<Db>} database
   */
  static configureWithName(name, database = 'test', url = 'mongodb://localhost:27017', options = {}) {
    options.useNewUrlParser = true
    return MongoClient.connect(url, options).then(
      connection =>
        connection.db(database)
    ).then(
      database => {
        clients.set(name, database)
        return database
      }
    )
  }
  /**
   * set default configuration of MongoDB
   * @param {string} [database] - database name
   * @param {string} [url] - url of the server
   * @param {MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html)
   * @returns {Promise<Db>} database
   */
  static configure(database = 'test', url = 'mongodb://localhost:27017', options = {}) {
    return this.configureWithName('default', database, url, options)
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {Db}
   */
  static getClient(name) {
    return clients.get(name)
  }
  /**
   * get default client
   * @returns {Db}
   */
  static get client() {
    return this.getClient('default')
  }
  /**
   * get all clients
   * @returns {Map<string,Db>}
   */
  static get clients() {
    return clients
  }
}

export {
  IDRegex
}
export * from 'mongodb'
export default MongoDB