import {
  extend
} from '@oudy/drivers/interface'
import elasticsearch from 'elasticsearch'

class ElasticSearch extends extend(elasticsearch) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [options] = args,

      connection = new elasticsearch.Client(options)
    return connection.ping().then(
      () =>
        super.configureFor(name, connection)
    )
  }
}

export * from 'elasticsearch'
export default ElasticSearch