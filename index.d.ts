export default class Driver<T> {
    /**
     * @type {Map<string, T>}
     */
    clients: Map<string, T>;
    /**
     * @type Promise<T>[]
     */
    /**
     * get a client by name
     * @param {string} name
     * @returns {T}
     */
    getClient(name: string): T;
    /**
     * get default client
     * @returns {T}
     */
    get client(): T;
    /**
     * resolve all connections
     * @type Promise<T[]>
     */
    get ready(): Promise<T[]>;
    promises: Promise<T>[];
}
