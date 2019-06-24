import {
  Client,
  ConfigOptions
} from 'elasticsearch'

const clients = new Map()

class ElasticSearch {

  /**
   * set a configuration of ElasticSearch
   * @function
   * @param {string} name - name of the configuration
   * @param {ConfigOptions} [options] - [Client options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html)
   * @returns {Promise<Client>} client
   */
  static configureWithName(
    name,
    options = {
      host: 'localhost:9200'
    }
  ) {
    const client = new Client(options)
    return client.ping().then(
      () => {
        clients.set(name, client)
        return client
      }
    )
  }
  /**
   * set default configuration of ElasticSearch
   * @function
   * @param {ConfigOptions} [options] - [Client options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html)
   * @returns {Promise<Client>} client
   */
  static configure(
    options = {
      host: 'localhost:9200'
    }
  ) {
    return this.configureWithName('default', options)
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {Client}
   */
  static getClient(name) {
    return clients.get(name)
  }
  /**
   * get default client
   * @returns {Client}
   */
  static get client() {
    return this.getClient('default')
  }
  /**
   * get all clients
   * @returns {Map<string,Client>}
   */
  static get clients() {
    return clients
  }
}

export * from 'elasticsearch'
export default ElasticSearch