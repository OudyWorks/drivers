import * as mongodb from 'mongodb';
import Driver from '@oudy/drivers';
export declare class MongoDBDriver extends Driver<mongodb.Db> {
    /**
     * set a configuration of MongoDB
     * @function
     * @param {string} name - name of the configuration
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    configureWithName(name: string, database?: string, url?: string, options?: mongodb.MongoClientOptions): Promise<mongodb.Db>;
    /**
     * set default configuration of MongoDB
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    configure(database?: string, url?: string, options?: mongodb.MongoClientOptions): Promise<mongodb.Db>;
}
export * from 'mongodb';
export declare const IDRegex: RegExp;
declare const _default: MongoDBDriver;
export default _default;
