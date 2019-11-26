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
var elasticsearch_1 = __importDefault(require("elasticsearch"));
var drivers_1 = __importDefault(require("@oudy/drivers"));
var ElasticSearchDriver = /** @class */ (function (_super) {
    __extends(ElasticSearchDriver, _super);
    function ElasticSearchDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * set a configuration of ElasticSearch
     * @function
     * @param {strin} name - name of the configuration
     * @param {elasticsearch.ConfigOptions} [params]
     * @returns {Promise<elasticsearch.Client>}
     */
    ElasticSearchDriver.prototype.configureWithName = function (name, params) {
        var _this = this;
        if (params === void 0) { params = {
            host: 'localhost:9200'
        }; }
        var client = new elasticsearch_1.default.Client(params), promise = client.ping({}).then(function () {
            _this.clients.set(name, client);
            return client;
        });
        this.promises.push(promise);
        return promise;
    };
    /**
     * set default configuration of ElasticSearch
     * @function
     * @param {elasticsearch.ConfigOptions} [params]
     * @returns {Promise<elasticsearch.Client>}
     */
    ElasticSearchDriver.prototype.configure = function (params) {
        if (params === void 0) { params = {
            host: 'localhost:9200'
        }; }
        return this.configureWithName('default', params);
    };
    return ElasticSearchDriver;
}(drivers_1.default));
exports.ElasticSearchDriver = ElasticSearchDriver;
__export(require("elasticsearch"));
exports.default = new ElasticSearchDriver();
