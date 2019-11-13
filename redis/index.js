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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var bluebird_1 = __importDefault(require("bluebird"));
var drivers_1 = __importDefault(require("@oudy/drivers"));
bluebird_1.default.promisifyAll(redis_1.default.RedisClient.prototype);
bluebird_1.default.promisifyAll(redis_1.default.Multi.prototype);
var RedisDriver = /** @class */ (function (_super) {
    __extends(RedisDriver, _super);
    function RedisDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * set a configuration of Redis
     * @function
     * @param {string} name - name of the configuration
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<redis.RedisClient>} client
     */
    RedisDriver.prototype.configureWithName = function (name, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var promise = new Promise(function (resolve, reject) {
            var connection = redis_1.default.createClient(options);
            connection.on('connect', function () {
                _this.clients.set(name, connection);
                resolve(connection);
            });
            connection.on('error', function (error) {
                return reject(error);
            });
        });
        this.promises.push(promise);
        return promise;
    };
    /**
     * set default configuration of Redis
     * @function
     * @param {redis.ClientOpts} [options] - Options
     * @returns {Promise<Rredis.edisClient>} client
     */
    RedisDriver.prototype.configure = function (options) {
        if (options === void 0) { options = {}; }
        return this.configureWithName('default', options);
    };
    return RedisDriver;
}(drivers_1.default));
exports.RedisDriver = RedisDriver;
__export(require("redis"));
exports.default = new RedisDriver();
