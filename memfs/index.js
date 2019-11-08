import {
  Volume,
  createFsFromVolume,
  IFs
} from 'memfs'

const clients = new Map()

class MemoryFileSystem {

  /**
   * set a configuration of MemoryFileSystem
   * @function
   * @param {string} name - name of the configuration
   * @param {Object} [props] - Data
   * @returns {Promise<IFs>} client
   */
  static configureWithName(
    name,
    props = {}
  ) {
    const fs = createFsFromVolume(new Volume(props))
    clients.set(name, fs)
    return Promise.resolve(fs)
  }
  /**
   * set default configuration of MemoryFileSystem
   * @function
   * @param {Object} [props] - Data
   * @returns {Promise<IFs>} client
   */
  static configure(
    props = {}
  ) {
    return this.configureWithName('default', props)
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {IFs}
   */
  static getClient(name) {
    return clients.get(name)
  }
  /**
   * get default client
   * @returns {IFs}
   */
  static get client() {
    return this.getClient('default')
  }
  /**
   * get all clients
   * @returns {Map<string,IFs>}
   */
  static get clients() {
    return clients
  }
}

export * from 'memfs'
export default MemoryFileSystem