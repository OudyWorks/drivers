"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = __importStar(require("mongodb"));
var drivers_1 = __importDefault(require("@oudy/drivers"));
var MongoDBDriver = /** @class */ (function (_super) {
    __extends(MongoDBDriver, _super);
    function MongoDBDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    MongoDBDriver.prototype.configureWithName = function (name, database, url, options) {
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
    MongoDBDriver.prototype.configure = function (database, url, options) {
        if (database === void 0) { database = 'test'; }
        if (url === void 0) { url = 'mongodb://localhost:27017'; }
        if (options === void 0) { options = {}; }
        return this.configureWithName('default', database, url, options);
    };
    return MongoDBDriver;
}(drivers_1.default));
exports.MongoDBDriver = MongoDBDriver;
__export(require("mongodb"));
exports.IDRegex = /^[0-9a-fA-F]{24}$/;
exports.default = new MongoDBDriver();
