const connections = new Map()

/**
 * Driver Interface
 * @class
 */
export default class DriverInterface {
  /**
   * set a configuration
   * @param {string} name 
   * @param {*} connection 
   * @returns {*}
   */
  static configureFor(name, connection) {
    return this.connections.set(name, connection).get(name)
  }
  /**
   * set default configuration
   * @param {*} connection
   */
  static configure() {
    return this.configureFor.apply(this, ['default'].concat(Array.from(arguments)))
  }
  /**
   * get a configuration
   * @param {string} name 
   * @returns {*}
   */
  static getConnection(name = 'default') {
    return this.connections.get(name)
  }
  /**
   * get default configuration
   * @returns {*}
   */
  static get connection() {
    return this.getConnection()
  }
  /**
   * get connections
   * @returns {Map}
   */
  static get connections() {
    return connections
  }
}