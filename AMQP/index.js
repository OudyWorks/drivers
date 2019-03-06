const Interface = require('@oudy/drivers/interface'),
  {
    connect
  } = amqplib = require('amqplib')

class AMQP extends Interface.extend(class {}) {
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

Object.assign(AMQP, amqplib)

module.exports = AMQP