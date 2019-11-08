"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const batches = new Map(),
      defaultDataLoader = {
  cache: false,
  maxBatchSize: 20
};

class Batch {
  static hget(key, field, client = 'default') {
    let _key = ['hget', key, client].join(':'),
        batch = batches.get(_key);

    if (!batch) batch = batches.set(_key, new _dataloader.default(keys => {
      return new Promise(resolve => {
        _index.default.getClient(client).hmget(key, keys, (error, values) => {
          resolve(values || [null]);
        });
      });
    }, defaultDataLoader)).get(_key);
    return batch.load(field);
  }

  static hset(key, field, value, client = 'default') {
    let _key = ['hset', key, client].join(':'),
        batch = batches.get(_key);

    if (!batch) batch = batches.set(_key, new _dataloader.default(keys => {
      let values = [];
      keys.forEach(([field, value]) => values.push(field, value));
      return new Promise(resolve => {
        _index.default.getClient(client).hmset(key, values, () => resolve(keys));
      });
    }, defaultDataLoader)).get(_key);
    return batch.load([field, value]);
  }

  static sismember(key, value, client = 'default') {
    let _key = ['sismember', key, client].join(':'),
        batch = batches.get(_key);

    if (!batch) batch = batches.set(_key, new _dataloader.default(keys => new Promise(resolve => {
      _index.default.getClient(client).multi(keys.map(value => ['sismember', key, value])).exec((error, replies) => resolve(replies));
    }), defaultDataLoader)).get(_key);
    return batch.load(value);
  }

}

; // key member [member ...]

['hdel', 'sadd', 'srem', 'lpush', 'rpush'].forEach(command => {
  Batch[command] = function (key, value, client = 'default') {
    let _key = [command, key, client].join(':'),
        batch = batches.get(_key);

    if (!batch) batch = batches.set(_key, new _dataloader.default(keys => new Promise(resolve => {
      _index.default.getClient(client)[command](key, keys, () => resolve(keys));
    }), defaultDataLoader)).get(_key);
    return batch.load(value);
  };
}); // key [count]

['spop', 'srandmember'].forEach(command => {
  Batch[command] = function (key, count = 1, client = 'default') {
    let _key = [command, key, client].join(':'),
        batch = batches.get(_key);

    if (!batch) batch = batches.set(_key, new _dataloader.default(counts => new Promise(resolve => {
      _index.default.getClient(client)[command](key, counts.reduce((a, b) => a + b), (error, values) => {
        if (counts.length == values.length) resolve(values);else {
          let _values = [];
          counts.forEach(count => {
            _values.push(count == 1 ? values.shift() : values.splice(0, count));
          });
          resolve(_values);
        }
      });
    }), defaultDataLoader)).get(_key);
    return batch.load(count);
  };
});
var _default = Batch;
exports.default = _default;