import redis from 'redis';
import Driver from '@oudy/drivers';
export declare class RedisDriver extends Driver<redis.RedisClient> {
    /**
     * set a configuration of Redis
     * @function
     * @param {string} name - name of the configuration
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<redis.RedisClient>} client
     */
    configureWithName(name: string, options?: redis.ClientOpts): Promise<redis.RedisClient>;
    /**
     * set default configuration of Redis
     * @function
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<Rredis.edisClient>} client
     */
    configure(options?: redis.ClientOpts): Promise<redis.RedisClient>;
}
export * from 'redis';
declare const _default: RedisDriver;
export default _default;
