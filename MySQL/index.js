import {
  extend
} from '@oudy/drivers/interface'
import mysql from 'mysql'

class MySQL extends extend(class { }) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [options = {}] = args,
      // connect
      connection = mysql.createConnection(
        Object.assign({
          queryFormat(query, values) {
            return values ? query.replace(/\:(\w+)/g, function (txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key])
              }
              return txt
            }.bind(this)) : query
          }
        }, options)
      )

    return new Promise(
      (resolve, reject) => {
        connection.connect(
          error =>
            error ? reject(error) : resolve(
              super.configureFor(name, connection)
            )
        )
      }
    )
  }
}

export * from 'mysql'

export default MySQL