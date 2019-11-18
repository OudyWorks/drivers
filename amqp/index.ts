import amqp from 'amqplib'
import Driver from '@oudy/drivers'

export class AMQPDriver extends Driver<amqp.Connection> {
    /**
     * set a configuration of AMQP
     * @function
     * @param {string} name - name of the configuration
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    configureWithName(
        name: string,
        url: string | amqp.Options.Connect,
        socketOptions?: any
    ): Promise<amqp.Connection> {
        const promise: Promise<amqp.Connection> = new Promise(
            (resolve, reject) => {
                amqp.connect(url, socketOptions).then(
                    connection => {
                        this.clients.set(name, connection)
                        resolve(connection)
                    }
                ).catch(reject)
            }
        )
        this.promises.push(promise)
        return promise
    }
    /**
     * set default configuration of AMQP
     * @function
     * @param {string | amqp.Options.Connect} url
     * @param {any} [options]
     * @returns {Promise<amqp.Connection>} client
     */
    configure(
        url: string | amqp.Options.Connect,
        socketOptions?: any
    ) {
        return this.configureWithName('default', url, socketOptions)
    }
}

export * from 'amqplib'
export default new AMQPDriver()