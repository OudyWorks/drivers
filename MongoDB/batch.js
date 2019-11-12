"use strict";
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
var index_1 = __importStar(require("./index"));
var dataloader_1 = __importDefault(require("dataloader"));
var batches = new Map();
var MongoDBBatch = /** @class */ (function () {
    function MongoDBBatch() {
    }
    /**
     *
     * @param {string} id
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<object|null>}
     */
    MongoDBBatch.load = function (id, collection, database) {
        if (database === void 0) { database = 'default'; }
        var key = ['load', database, collection].join(':'), batch = batches.get(key);
        if (!batch) {
            batches.set(key, batch = new dataloader_1.default(function (keys) {
                return index_1.default.getClient(database).collection(collection).find({
                    _id: {
                        $in: keys.map(function (id) {
                            return index_1.IDRegex.test(id) ? new index_1.ObjectID(id) : id;
                        })
                    }
                }).toArray().then(function (documents) {
                    return keys.map(function (_id) {
                        return documents.find(function (document) {
                            return document._id.toString() == _id.toString();
                        });
                    });
                });
            }));
        }
        return batch.load(id).then(function (document) {
            batch.clear(id);
            return document;
        }).catch(function (error) {
            batch.clear(id);
            return Promise.reject(error);
        });
    };
    /**
     *
     * @param {string[]} id
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<(object|null)[]>}
     */
    MongoDBBatch.loadMany = function (ids, collection, database) {
        var _this = this;
        if (database === void 0) { database = 'default'; }
        return Promise.all(ids.map(function (id) {
            return _this.load(id, collection, database);
        }));
    };
    /**
     *
     * @param {object} object
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<string>}
     */
    MongoDBBatch.insert = function (object, collection, database) {
        if (database === void 0) { database = 'default'; }
        var key = ['insert', database, collection].join(':'), batch = batches.get(key);
        if (!batch) {
            batches.set(key, batch = new dataloader_1.default(function (documents) {
                var bulk = index_1.default.getClient(database).collection(collection).initializeOrderedBulkOp();
                documents.forEach(function (object) {
                    return bulk.insert(object);
                });
                return bulk.execute().then(function (response) {
                    return response.getInsertedIds().map(
                    // @ts-ignore
                    function (id) { return id._id.toString(); });
                });
            }, {
                cache: false
            }));
        }
        return batch.load(object);
    };
    /**
     *
     * @param {string} id
     * @param {object} payload
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<boolean>}
     */
    MongoDBBatch.update = function (id, payload, collection, database) {
        if (database === void 0) { database = 'default'; }
        var key = ['update', database, collection].join(':'), batch = batches.get(key);
        if (!batch) {
            batches.set(key, batch = new dataloader_1.default(function (payloads) {
                var bulk = index_1.default.getClient(database).collection(collection).initializeOrderedBulkOp();
                payloads.forEach(function (_a) {
                    var id = _a.id, payload = _a.payload;
                    return bulk.find({
                        _id: index_1.IDRegex.test(id) ? new index_1.ObjectID(id) : id
                    }).updateOne(payload);
                });
                return bulk.execute().then(function (response) {
                    return payloads.map(function (a) { return false; });
                });
            }, {
                cache: false
            }));
        }
        return batch.load({ id: id, payload: payload });
    };
    /**
     *
     * @param {string} id
     * @param {object} payload
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<(string|boolean)>}
     */
    MongoDBBatch.upsert = function (id, payload, collection, database) {
        if (database === void 0) { database = 'default'; }
        var key = ['upsert', database, collection].join(':'), batch = batches.get(key);
        if (!batch) {
            batches.set(key, batch = new dataloader_1.default(function (payloads) {
                var bulk = index_1.default.getClient(database).collection(collection).initializeOrderedBulkOp();
                payloads.forEach(function (_a) {
                    var id = _a.id, payload = _a.payload;
                    return bulk.find({
                        _id: index_1.IDRegex.test(id) ? new index_1.ObjectID(id) : id
                    }).upsert().replaceOne(payload);
                });
                return bulk.execute().then(function (response) {
                    // @ts-ignore
                    var ids = response.getUpsertedIds().map(function (upid) { return upid._id.toHexString ? upid._id.toHexString() : upid._id; });
                    return payloads.map(function (_a) {
                        var id = _a.id;
                        return ids.includes(id) && id;
                    });
                });
            }, {
                cache: false
            }));
        }
        return batch.load({ id: id, payload: payload });
    };
    return MongoDBBatch;
}());
exports.default = MongoDBBatch;
