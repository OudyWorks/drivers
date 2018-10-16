import Implementation from '../implementation'
import {
  MongoClient,
  ObjectID
} from 'mongodb'

const IDRegex = /^[0-9a-fA-F]{24}$/

class MongoDB extends Implementation {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
    // get name of connection from the first argument
      name = args.shift(),
    // get the database name from last argument
      database = args.pop()
    return MongoClient.connect.apply(MongoClient, args).then(
      connection =>
        super.configureFor(name, connection.db(database))
    )
  }
}

export {
  IDRegex,
  ObjectID
}
export default MongoDB