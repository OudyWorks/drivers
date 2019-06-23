const clients = new Map()

/**
 * Driver Interface
 * @class
 */
export default class DriverInterface {
  /**
   * configure a client with name
   * @param {string} name 
   * @param {*} connection 
   * @returns {*}
   */
  static configureWithName(name, client) {
    return this.clients.set(name, client).get(name)
  }
  /**
   * configure default client
   * @param {*} connection
   */
  static configure() {
    return this.configureWithName.apply(this, ['default'].concat(Array.from(arguments)))
  }
  /**
   * get a cient with name
   * @param {string} name 
   * @returns {*}
   */
  static getClient(name = 'default') {
    return this.clients.get(name)
  }
  /**
   * get default client
   * @returns {*}
   */
  static get client() {
    return this.getClient()
  }
  /**
   * get clients
   * @returns {Map}
   */
  static get clients() {
    return clients
  }
}