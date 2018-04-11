import {
    connect
} from 'amqplib'

let connections = {}

export default class AMQP {
    static configure(url, socketOptions = {}, name = 'default') {
        return connect(url, socketOptions).then(
            connection =>
                connections[name] = connection
        )
    }
    static getConnection(name = 'default') {
        return connections[name]
    }
    static get connection() {
        return this.getConnection()
    }
}