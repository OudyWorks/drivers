import elasticsearch from 'elasticsearch'
import Driver from '@oudy/drivers'

export class ElasticSearchDriver extends Driver<elasticsearch.Client> {
    /**
     * set a configuration of ElasticSearch
     * @function
     * @param {strin} name - name of the configuration
     * @param {elasticsearch.ConfigOptions} [params] 
     * @returns {Promise<elasticsearch.Client>}
     */
    configureWithName(
        name: string,
        params: elasticsearch.ConfigOptions = {
            host: 'localhost:9200'
        }
    ): Promise<elasticsearch.Client> {
        const client = new elasticsearch.Client(params),
            promise = client.ping({}).then(
                () => {
                    this.clients.set(name, client)
                    return client
                }
            )
        this.promises.push(promise)
        return promise
    }
    /**
     * set default configuration of ElasticSearch
     * @function
     * @param {elasticsearch.ConfigOptions} [params] 
     * @returns {Promise<elasticsearch.Client>}
     */
    configure(
        params: elasticsearch.ConfigOptions = {
            host: 'localhost:9200'
        }
    ) {
        return this.configureWithName('default', params)
    }
}

export * from 'elasticsearch'
export default new ElasticSearchDriver()