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
var amqplib_1 = __importDefault(require("amqplib"));
var drivers_1 = __importDefault(require("@oudy/drivers"));
var AMQPDriver = /** @class */ (function (_super) {
    __extends(AMQPDriver, _super);
    function AMQPDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    AMQPDriver.prototype.configureWithName = function (name, url, socketOptions) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            amqplib_1.default.connect(url, socketOptions).then(function (connection) {
                _this.clients.set(name, connection);
                resolve(connection);
            }).catch(reject);
        });
        this.promises.push(promise);
        return promise;
    };
    /**
     * set default configuration of AMQP
     * @function
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    AMQPDriver.prototype.configure = function (url, socketOptions) {
        return this.configureWithName('default', url, socketOptions);
    };
    return AMQPDriver;
}(drivers_1.default));
exports.AMQPDriver = AMQPDriver;
__export(require("amqplib"));
exports.default = new AMQPDriver();
