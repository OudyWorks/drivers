import elasticsearch from 'elasticsearch';
import Driver from '@oudy/drivers';
export declare class ElasticSearchDriver extends Driver<elasticsearch.Client> {
    /**
     * set a configuration of ElasticSearch
     * @function
     * @param {strin} name - name of the configuration
     * @param {elasticsearch.ConfigOptions} [params]
     * @returns {Promise<elasticsearch.Client>}
     */
    configureWithName(name: string, params?: elasticsearch.ConfigOptions): Promise<elasticsearch.Client>;
    /**
     * set default configuration of ElasticSearch
     * @function
     * @param {elasticsearch.ConfigOptions} [params]
     * @returns {Promise<elasticsearch.Client>}
     */
    configure(params?: elasticsearch.ConfigOptions): Promise<elasticsearch.Client>;
}
export * from 'elasticsearch';
declare const _default: ElasticSearchDriver;
export default _default;
