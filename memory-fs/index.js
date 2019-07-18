import FS from 'memory-fs'

const clients = new Map()

class MemoryFileSystem {

  /**
   * set a configuration of MemoryFileSystem
   * @function
   * @param {string} name - name of the configuration
   * @param {Object} [data] - Data
   * @returns {Promise<FS>} client
   */
  static configureWithName(
    name,
    data = {}
  ) {
    const fs = new FS(data)
    clients.set(name, fs)
    return Promise.resolve(fs)
  }
  /**
   * set default configuration of MemoryFileSystem
   * @function
   * @param {Object} [data] - Data
   * @returns {Promise<FS>} client
   */
  static configure(
    data = {}
  ) {
    return this.configureWithName('default', data)
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {FS}
   */
  static getClient(name) {
    return clients.get(name)
  }
  /**
   * get default client
   * @returns {FS}
   */
  static get client() {
    return this.getClient('default')
  }
  /**
   * get all clients
   * @returns {Map<string,FS>}
   */
  static get clients() {
    return clients
  }
}

export default MemoryFileSystem