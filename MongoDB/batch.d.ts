declare class MongoDBBatch {
    /**
     *
     * @param {string} id
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<object|null>}
     */
    static load(id: string, collection: string, database?: string): Promise<object | null>;
    /**
     *
     * @param {string[]} id
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<(object|null)[]>}
     */
    static loadMany(ids: string[], collection: string, database?: string): Promise<(object | null)[]>;
    /**
     *
     * @param {object} object
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<string>}
     */
    static insert(object: object, collection: string, database?: string): Promise<string>;
    /**
     *
     * @param {string} id
     * @param {object} payload
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<boolean>}
     */
    static update(id: string, payload: object, collection: string, database?: string): Promise<boolean>;
    /**
     *
     * @param {string} id
     * @param {object} payload
     * @param {string} collection
     * @param {string} [database]
     * @returns {Promise<(string|boolean)>}
     */
    static upsert(id: string, payload: object, collection: string, database?: string): Promise<(string | boolean)>;
}
export default MongoDBBatch;
