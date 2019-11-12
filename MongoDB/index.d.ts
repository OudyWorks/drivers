import * as mongodb from 'mongodb';
declare class MongoDBDriver {
    /**
     * @type {Map<string, mongodb.Db>}
     */
    static clients: Map<string, mongodb.Db>;
    /**
     * @type Promise<mongodb.Db>[]
     */
    static promises: Promise<mongodb.Db>[];
    /**
     * set a configuration of MongoDB
     * @function
     * @param {string} name - name of the configuration
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    static configureWithName(name: string, database?: string, url?: string, options?: mongodb.MongoClientOptions): Promise<mongodb.Db>;
    /**
     * set default configuration of MongoDB
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    static configure(database?: string, url?: string, options?: mongodb.MongoClientOptions): Promise<mongodb.Db>;
    /**
     * get a client by name
     * @param {string} name
     * @returns {mongodb.Db}
     */
    static getClient(name: string): mongodb.Db;
    /**
     * get default client
     * @returns {mongodb.Db}
     */
    static get client(): mongodb.Db;
    /**
     * resolve all connections
     * @type Promise<mongodb.Db[]>
     */
    static get ready(): Promise<mongodb.Db[]>;
}
export * from 'mongodb';
export declare const IDRegex: RegExp;
export default MongoDBDriver;
