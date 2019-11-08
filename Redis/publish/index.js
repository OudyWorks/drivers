"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _redis = _interopRequireWildcard(require("redis"));

Object.keys(_redis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _redis[key];
    }
  });
});

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_bluebird.default.promisifyAll(_redis.default.RedisClient.prototype);

_bluebird.default.promisifyAll(_redis.default.Multi.prototype);

const clients = new Map();

class Redis {
  /**
   * set a configuration of Redis
   * @function
   * @param {string} name - name of the configuration
   * @param {ClientOpts} [options] - Options
   * @returns {Promise<RedisClient>} client
   */
  static configureWithName(name, options = {}) {
    const connection = _redis.default.createClient(options);

    return new Promise((resolve, reject) => {
      connection.on('connect', () => {
        clients.set(name, connection);
        resolve();
      });
      connection.on('error', error => reject(error));
    });
  }
  /**
   * set default configuration of Redis
   * @function
   * @param {ClientOpts} [options] - Options
   * @returns {Promise<RedisClient>} client
   */


  static configure(options = {}) {
    return this.configureWithName('default', options);
  }
  /**
   * get a client by name
   * @param {string} name 
   * @returns {RedisClient}
   */


  static getClient(name) {
    return clients.get(name);
  }
  /**
   * get default client
   * @returns {RedisClient}
   */


  static get client() {
    return this.getClient('default');
  }
  /**
   * get all clients
   * @returns {Map<string,RedisClient>}
   */


  static get clients() {
    return clients;
  }

}

var _default = Redis;
exports.default = _default;