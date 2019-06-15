import {
  extend
} from '@oudy/drivers/interface'
import {
  connect
} from 'amqplib'

class AMQP extends extend(class { }) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [url = 'amqp://localhost', options = {}] = args

    return connect(url, options).then(
      connection =>
        super.configureFor(name, connection)
    )
  }
}

export * from 'amqplib'

export default AMQP