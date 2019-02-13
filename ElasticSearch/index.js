const Interface = require('@oudy/drivers/interface'),
  {
    Client
  } = elasticsearch = require('elasticsearch')

class ElasticSearch extends Interface.extend(elasticsearch) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [options] = args,

      connection = new Client(options)
    return connection.ping().then(
      () =>
        super.configureFor(name, connection)
    )
  }
}

module.exports = ElasticSearch