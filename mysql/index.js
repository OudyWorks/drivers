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
var mysql_1 = __importDefault(require("mysql"));
var drivers_1 = __importDefault(require("@oudy/drivers"));
var MySQLDriver = /** @class */ (function (_super) {
    __extends(MySQLDriver, _super);
    function MySQLDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | mysql.Options.Connect} url
     * @returns {Promise<mysql.Connection>} client
     */
    MySQLDriver.prototype.configureWithName = function (name, connectionUri) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var connection = mysql_1.default.createConnection(Object.assign({
                queryFormat: function (query, values) {
                    return values ? query.replace(/\:(\w+)/g, function (txt, key) {
                        if (values.hasOwnProperty(key)) {
                            return this.escape(values[key]);
                        }
                        return txt;
                    }.bind(this)) : query;
                }
            }, connectionUri));
            connection.on('connect', function (error) {
                if (error)
                    return reject(error);
                _this.clients.set(name, connection);
                resolve(connection);
            });
        });
        this.promises.push(promise);
        return promise;
    };
    /**
     * set default configuration of AMQP
     * @function
     * @param {mysql.ConnectionConfig} connectionUri
     * @returns {Promise<mysql.Connection>} client
     */
    MySQLDriver.prototype.configure = function (connectionUri) {
        return this.configureWithName('default', connectionUri);
    };
    return MySQLDriver;
}(drivers_1.default));
exports.MySQLDriver = MySQLDriver;
__export(require("mysql"));
exports.default = new MySQLDriver();
