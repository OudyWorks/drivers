import mysql from 'mysql'
import Driver from '@oudy/drivers'

export class MySQLDriver extends Driver<mysql.Connection> {
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | mysql.Options.Connect} url
     * @returns {Promise<mysql.Connection>} client
     */
    configureWithName(
        name: string,
        connectionUri: mysql.ConnectionConfig
    ): Promise<mysql.Connection> {
        const promise: Promise<mysql.Connection> = new Promise(
            (resolve, reject) => {
                const connection = mysql.createConnection(
                    Object.assign({
                        queryFormat(query, values) {
                            return values ? query.replace(/\:(\w+)/g, function (txt, key) {
                                if (values.hasOwnProperty(key)) {
                                    return this.escape(values[key])
                                }
                                return txt
                            }.bind(this)) : query
                        }
                    }, connectionUri)
                )
                connection.on('connect', error => {
                    if (error)
                        return reject(error)
                    this.clients.set(name, connection)
                    resolve(connection)
                })
            }
        )
        this.promises.push(promise)
        return promise
    }
    /**
     * set default configuration of AMQP
     * @function
     * @param {mysql.ConnectionConfig} connectionUri
     * @returns {Promise<mysql.Connection>} client
     */
    configure(
        connectionUri: mysql.ConnectionConfig
    ) {
        return this.configureWithName('default', connectionUri)
    }
}

export * from 'mysql'
export default new MySQLDriver()