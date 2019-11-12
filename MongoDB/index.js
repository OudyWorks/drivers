"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = __importStar(require("mongodb"));
var MongoDBDriver = /** @class */ (function () {
    function MongoDBDriver() {
    }
    /**
     * set a configuration of MongoDB
     * @function
     * @param {string} name - name of the configuration
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    MongoDBDriver.configureWithName = function (name, database, url, options) {
        var _this = this;
        if (database === void 0) { database = 'test'; }
        if (url === void 0) { url = 'mongodb://localhost:27017'; }
        if (options === void 0) { options = {}; }
        options.useNewUrlParser = true;
        var promise = new Promise(function (resolve, reject) {
            mongodb.MongoClient.connect(url, options).then(function (connection) {
                return connection.db(database);
            }).then(function (database) {
                _this.clients.set(name, database);
                return database;
            }).then(resolve).catch(reject);
        });
        this.promises.push(promise);
        return promise;
    };
    /**
     * set default configuration of MongoDB
     * @param {string} [database] - database name
     * @param {string} [url] - url of the server
     * @param {mongodb.MongoClientOptions} [options] - [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html)
     * @returns {Promise<mongodb.Db>} database
     */
    MongoDBDriver.configure = function (database, url, options) {
        if (database === void 0) { database = 'test'; }
        if (url === void 0) { url = 'mongodb://localhost:27017'; }
        if (options === void 0) { options = {}; }
        return this.configureWithName('default', database, url, options);
    };
    /**
     * get a client by name
     * @param {string} name
     * @returns {mongodb.Db}
     */
    MongoDBDriver.getClient = function (name) {
        return this.clients.get(name);
    };
    Object.defineProperty(MongoDBDriver, "client", {
        /**
         * get default client
         * @returns {mongodb.Db}
         */
        get: function () {
            return this.getClient('default');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MongoDBDriver, "ready", {
        /**
         * resolve all connections
         * @type Promise<mongodb.Db[]>
         */
        get: function () {
            return Promise.all(this.promises);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @type {Map<string, mongodb.Db>}
     */
    MongoDBDriver.clients = new Map();
    /**
     * @type Promise<mongodb.Db>[]
     */
    MongoDBDriver.promises = [];
    return MongoDBDriver;
}());
__export(require("mongodb"));
exports.IDRegex = /^[0-9a-fA-F]{24}$/;
exports.default = MongoDBDriver;
