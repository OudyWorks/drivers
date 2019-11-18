import amqp from 'amqplib';
import Driver from '@oudy/drivers';
export declare class AMQPDriver extends Driver<amqp.Connection> {
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    configureWithName(name: string, url: string | amqp.Options.Connect, socketOptions?: any): Promise<amqp.Connection>;
    /**
     * set default configuration of AMQP
     * @function
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    configure(url: string | amqp.Options.Connect, socketOptions?: any): Promise<amqp.Connection>;
}
export * from 'amqplib';
declare const _default: AMQPDriver;
export default _default;
