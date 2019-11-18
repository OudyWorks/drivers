import mysql from 'mysql';
import Driver from '@oudy/drivers';
export declare class MySQLDriver extends Driver<mysql.Connection> {
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | mysql.Options.Connect} url
     * @returns {Promise<mysql.Connection>} client
     */
    configureWithName(name: string, connectionUri: mysql.ConnectionConfig): Promise<mysql.Connection>;
    /**
     * set default configuration of AMQP
     * @function
     * @param {mysql.ConnectionConfig} connectionUri
     * @returns {Promise<mysql.Connection>} client
     */
    configure(connectionUri: mysql.ConnectionConfig): Promise<mysql.Connection>;
}
export * from 'mysql';
declare const _default: MySQLDriver;
export default _default;
