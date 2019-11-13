"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Driver = /** @class */ (function () {
    function Driver() {
        /**
         * @type {Map<string, T>}
         */
        this.clients = new Map();
        this.promises = [];
    }
    /**
     * @type Promise<T>[]
     */
    /**
     * get a client by name
     * @param {string} name
     * @returns {T}
     */
    Driver.prototype.getClient = function (name) {
        return this.clients.get(name);
    };
    Object.defineProperty(Driver.prototype, "client", {
        /**
         * get default client
         * @returns {T}
         */
        get: function () {
            return this.getClient('default');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Driver.prototype, "ready", {
        /**
         * resolve all connections
         * @type Promise<T[]>
         */
        get: function () {
            return Promise.all(this.promises);
        },
        enumerable: true,
        configurable: true
    });
    return Driver;
}());
exports.default = Driver;
