export default class Driver<T> {
    /**
     * @type {Map<string, T>}
     */
    clients: Map<string, T> = new Map()
    /**
     * @type Promise<T>[]
     */
    /**
     * get a client by name
     * @param {string} name 
     * @returns {T}
     */
    getClient(name: string): T {
        return this.clients.get(name)
    }
    /**
     * get default client
     * @returns {T}
     */
    get client(): T {
        return this.getClient('default')
    }
    /**
     * resolve all connections
     * @type Promise<T[]>
     */
    get ready(): Promise<T[]> {
        return Promise.all(
            this.promises
        )
    }
    promises: Promise<T>[] = []
}