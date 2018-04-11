import {
    createClient
} from 'redis'

let clients = {}

export default class Redis {
    static configure(options, name = 'default') {
        return new Promise((resolve, reject) => {
            clients[name] = createClient(options)
            clients[name].on('connect', () => {
                resolve(clients[name])
            })
            clients[name].on('error', error => {
                reject(error)
            })
        })
    }
    static get client() {
        return this.getClient()
    }
    static getClient(name = 'default') {
        return clients[name]
    }
}